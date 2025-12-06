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
price: z.coerce.number().min(0).transform((v) => Number(v.toFixed(2))),
inStock: z.coerce.number().min(0).transform((v) => Number(v.toFixed(0))),
categoryId: z.string().uuid(),
sizes: z.coerce.string().transform((v) => v.split(',')),
tags: z.string(),
gender: z.nativeEnum(Gender),
});

// =======================
// CREAR / ACTUALIZAR PRODUCTO
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
const tagsArray = rest.tags.split(',').map((t) => t.trim().toLowerCase());


  if (id) {
    product = await tx.product.update({
      where: { id },
      data: {
        ...rest,
        sizes: { set: rest.sizes as Size[] },
        tags: { set: tagsArray },
      },
    });
  } else {
    product = await tx.product.create({
      data: {
        ...rest,
        sizes: { set: rest.sizes as Size[] },
        tags: { set: tagsArray },
      },
    });
  }

  // ======================
  // MANEJO DE IMÁGENES
  // ======================
  const files = formData.getAll('images') as File[];

  if (files && files.length > 0) {
    const imageUrls = await uploadImages(files);

    if (imageUrls.length === 0) {
      throw new Error('No se pudo cargar ninguna imagen');
    }

    await tx.productImage.createMany({
      data: imageUrls.map((url) => ({
        url,
        productId: product.id,
      })),
    });
  }

  return { product };
});

revalidatePath('/admin/products');
revalidatePath(`/admin/product/${product.slug}`);
revalidatePath(`/products/${product.slug}`);

return { ok: true, product: prismaTx.product };


} catch (error: any) {
console.error('🔥 ERROR REAL SERVER ACTION:', error);
return {
ok: false,
message: error?.message || JSON.stringify(error),
};
}
};

// ==============================================
// FUNCIÓN MEJORADA PARA SUBIR IMÁGENES (PRODUCCIÓN)
// ==============================================
const uploadImages = async (images: File[]): Promise<string[]> => {
const uploadPromises = images.map(async (image) => {
try {
const buffer = Buffer.from(await image.arrayBuffer());


  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'products' }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      })
      .end(buffer);
  });

  return result.secure_url;
} catch (error) {
  console.error('❌ Error subiendo imagen:', error);
  return null;
}


});

const uploaded = await Promise.all(uploadPromises);
return uploaded.filter((u) => u !== null) as string[];
};
