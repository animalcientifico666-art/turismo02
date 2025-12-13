'use client';

// Evita que Next.js cachee esta página en producción
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Title } from "@/components";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
}

// Función para generar un resumen del contenido
const getExcerpt = (content: string, length = 100) => {
  if (content.length <= length) return content;
  return content.slice(0, length) + "...";
};

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  // 🔹 cargar posts
  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts ?? data);
    };

    loadPosts();
  }, []);

  // 🔥 eliminar post
  const handleDelete = async (id: number) => {
    const ok = confirm("¿Seguro que deseas eliminar este post?");
    if (!ok) return;

    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Error al eliminar el post");
      return;
    }

    // quitar del estado (sin recargar página)
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <>
      <Title title="Blog" />

      <div className="flex justify-end mb-5">
        <Link href="/adminPost/post/new" className="btn-primary">
          Nuevo post
        </Link>
      </div>

      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Imagen</th>
              <th className="px-6 py-4 text-left">Título</th>
              <th className="px-6 py-4 text-left">Fecha</th>
              <th className="px-6 py-4 text-left">Resumen</th>
              <th className="px-6 py-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="bg-white border-b hover:bg-gray-100"
              >
                <td className="px-6 py-4">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">{post.title}</td>

                <td className="px-6 py-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  {getExcerpt(post.content, 80)}
                </td>

                <td className="px-6 py-4 space-x-3">
                  <Link
  href={`/adminPost/post/${post.id}`}
  className="
    inline-flex items-center gap-1
    text-blue-600 text-sm font-medium
    hover:text-blue-700
    hover:underline
    transition-colors
  "
>
  ✏️ Editar
</Link>


                  <button
  onClick={() => handleDelete(post.id)}
  className="
    inline-flex items-center gap-1
    text-red-600 text-sm font-medium
    hover:text-red-700
    hover:underline
    transition-colors
  "
>
  🗑️ Eliminar
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
