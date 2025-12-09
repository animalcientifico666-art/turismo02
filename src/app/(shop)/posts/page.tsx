// src/app/(public)/posts/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Pagination } from "@/components";

export default async function PostsPage() {
  const pageSize = 9; // posts por página
  const page = 1; // página actual (puedes obtenerla de query más adelante)

  // Traer solo los posts de la página actual
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, content: true, imageUrl: true, createdAt: true },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  // Traer el total de posts para calcular totalPages
  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts / pageSize); // <-- aquí defines totalPages

  const getExcerpt = (text: string, length = 120) => {
    if (!text) return "";
    const cleanText = text.replace(/<[^>]+>/g, ""); 
    if (cleanText.length <= length) return cleanText;
    return cleanText.substring(0, length) + "...";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
        Our Blog
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Exploring Experiences through Words
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-green-900 hover:underline">
                {post.title}
              </h2>
              <div className="text-sm text-gray-500 mb-4">
                {new Date(post.createdAt).toLocaleDateString("es-ES")}
              </div>

              <p className="text-gray-700 mb-4">
                {getExcerpt(post.content, 120)}
              </p>

              <Link
                href={`/posts/${post.id}`}
                className="inline-block text-green-800 font-medium hover:text-green-600"
              >
                Leer más »
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Aquí ya no habrá error */}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
