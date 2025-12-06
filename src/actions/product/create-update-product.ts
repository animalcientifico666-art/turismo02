'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');


// =======================
// VALIDACIÓN ZOD
// =======================
const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
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
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});


// =======================
//  FUNCIÓN PRINCIPAL
// =======================
export const createUpdateProduct = async (formData: FormData) => {

  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      let product: Product;
      const tagsArray = rest.tags.split(',').map((tag) => tag.trim().toLowerCase());

      // =========================
      // CREAR O ACTUALIZAR PRODUCTO
      // =========================
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
          },
        });
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
          },
        });
      }

      // =========================
      // SUBIR IMÁGENES A CLOUDINARY
      // =========================
      const files = formData.getAll('images') as File[];

      if (files && files.length > 0) {
        const images = await uploadImages(files);

        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map((url) => ({
              url,
              productId: product.id,
            })),
          });
        } else {
          console.warn('⚠ Ninguna imagen se subió correctamente a Cloudinary');
        }
      }

      return { product };
    });

    // REVALIDAR RUTAS
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };

  } catch (error: any) {
    console.error('🔥 ERROR REAL SERVER ACTION:', error);
    return {
      ok: false,
      message: error?.message || JSON.stringify(error) || 'Error desconocido',
    };
  }

};



// ==============================
// FUNCIÓN ROBUSTA PARA CLOUDINARY
// ==============================
const uploadImages = async (images: File[]): Promise<string[]> => {

  const uploadPromises = images.map(async (image) => {
    try {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64Image}`,
        { folder: 'products' }
      );

      return result.secure_url;

    } catch (error) {
      console.error('❌ Error subiendo imagen Cloudinary:', error);
      return null; // marcar error individual
    }
  });

  const uploaded = await Promise.all(uploadPromises);

  // ❗ EL PUNTO CLAVE: eliminar NULOS
  return uploaded.filter((url) => url !== null) as string[];
};
