'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
  search?: string;   // 🔹 NUEVO
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 8,
  gender,
  search = '',       // 🔹 NUEVO
}: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,

      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },

      where: {
        gender: gender,
        title: {
          contains: search,
          mode: 'insensitive'
        }
      }
    });

    // 🔹 Total de productos SOLO con la búsqueda aplicada
    const totalCount = await prisma.product.count({
      where: {
        gender: gender,
        title: {
          contains: search,
          mode: 'insensitive'
        }
      }
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product: any) => ({
        ...product,
        images: (product.ProductImage || []).map((image: any) => image.url)
      }))
    };

  } catch (error) {
    console.log('Error:', error);

    return {
      currentPage: 1,
      totalPages: 1,
      products: []
    };
  }
};
