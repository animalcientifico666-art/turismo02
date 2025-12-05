'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(0).optional(), // permitimos optional aquí (validamos luego)
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',').map(s => s.trim()).filter(Boolean)),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

type ActionResponse =
  | { ok: true; product: Product }
  | { ok: false; message: string; error?: any };

export const createUpdateProduct = async (formData: FormData): Promise<ActionResponse> => {
  try {
    // Convertir FormData a objeto simple (valores aún son strings o File/Blob)
    const data = Object.fromEntries(formData);

    // Si viene id vacío, eliminar para que Zod lo deje undefined
    if ('id' in data && data.id === '') {
      delete (data as any).id;
    }

    // Limpieza del slug: si viene vacío, generarlo más adelante a partir del title
    // Validamos con zod (sizes será string => array en transform)
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
      console.log('ZOD ERROR:', productParsed.error.format ? productParsed.error.format() : productParsed.error);
      return { ok: false, message: 'Validación de datos inválida', error: productParsed.error };
    }

    const parsed = productParsed.data;

    // Generar slug si no viene o está vacío
    let finalSlug = parsed.slug && String(parsed.slug).trim().length > 0
      ? String(parsed.slug).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
      : parsed.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

    // Asegurar que slug tenga al menos 3 caracteres (si lo necesitas, ajusta)
    if (finalSlug.length < 3) {
      // intenta agregar un sufijo con timestamp para hacerlo único/minimo
      finalSlug = `${finalSlug}-${Date.now().toString(36)}`.slice(0, 60);
    }

    const { id, ...rest } = { ...parsed, slug: finalSlug };

    // Normalizar tags
    const tagsArray = rest.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);

    // Procesar imágenes: tomar raw values de FormData y filtrar solo Files válidos
    const rawImages = formData.getAll('images'); // puede ser [] o [""] o [File,...]
   
    console.log("Archivos recibidos:", rawImages);

    const validFiles: File[] = rawImages
  .filter(f => f instanceof File && f.size > 0) as File[];
console.log('Archivos válidos:', validFiles.length);

    // Ejecutar transacción prisma
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;

      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
            slug: finalSlug,
          },
        });
        console.log('Product updated:', product.id);
      } else {
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
            slug: finalSlug,
          },
        });
        console.log('Product created:', product.id);
      }

      // Si hay archivos válidos, subirlos y guardarlos
      if (validFiles.length > 0) {
        const uploaded = await uploadImages(validFiles);
        if (!uploaded) {
          throw new Error('Error al subir imágenes a Cloudinary');
        }

        // Filtrar nulls y asegurarnos de URLs válidas
        const uploadedUrls = (uploaded as Array<string | null>).filter(Boolean) as string[];

        if (uploadedUrls.length > 0) {
          await tx.productImage.createMany({
            data: uploadedUrls.map((url) => ({
              url,
              productId: product.id,
            })),
          });
          console.log('Product images saved:', uploadedUrls);
        }
      }

      return { product };
    });

    // Revalidate paths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${finalSlug}`);
    revalidatePath(`/products/${finalSlug}`);

    return { ok: true, product: prismaTx.product };
  } catch (error) {
    console.error('createUpdateProduct ERROR:', error);
    // Si es un error conocido (p. ej. Zod, Cloudinary, Prisma) puede venir en error.message
    return { ok: false, message: (error as any)?.message ?? 'Error desconocido al crear/actualizar', error };
  }
};

const uploadImages = async (images: File[]): Promise<Array<string | null> | null> => {
  if (!images || images.length === 0) return [];

  try {
    const uploadPromises = images.map(async (file) => {
      try {
        // leer buffer
        const buffer = await file.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        // usar el mime type real del archivo
        const mime = file.type || 'image/png';
        const dataUri = `data:${mime};base64,${base64Image}`;

        const res = await cloudinary.uploader.upload(dataUri, {
          folder: 'products', // opcional: carpeta en cloudinary
        });

        return res.secure_url as string;
      } catch (err) {
        console.error('uploadImages -> error subiendo archivo:', (err as any)?.message ?? err);
        return null;
      }
    });

    const uploaded = await Promise.all(uploadPromises);
    return uploaded;
  } catch (err) {
    console.error('uploadImages ERROR:', err);
    return null;
  }
};
