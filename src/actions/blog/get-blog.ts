'use server';

import prisma  from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
  search?: string; // búsqueda por título o contenido
}

export const getPaginatedPosts = async ({
  page = 1,
  take = 4,
  search = '',
}: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;

  try {
    // 🔹 Obtener posts filtrados por búsqueda
    const posts = await prisma.post.findMany({
      take,
      skip: (page - 1) * take,
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    // 🔹 Contar total de posts filtrados
    const totalCount = await prisma.post.count({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      },
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      posts: posts.map((post) => ({
        ...post,
        image: post.imageUrl || null, // para compatibilidad con la UI
      })),
    };
  } catch (error) {
    console.log('Error:', error);

    return {
      currentPage: 1,
      totalPages: 1,
      posts: [],
    };
  }
};
