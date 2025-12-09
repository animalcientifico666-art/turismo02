// src/app/(public)/posts/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, imageUrl: true, createdAt: true },
    take: 100,
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/posts/${p.id}`}
            className="block border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200"
          >
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-1">{p.title}</h2>
              <p className="text-gray-500 text-sm mb-2">
                {new Date(p.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700">Haz clic para leer más...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
