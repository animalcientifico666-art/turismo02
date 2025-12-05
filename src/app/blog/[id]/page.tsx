// src/app/blog/[id]/page.tsx
import { use } from "react";

async function fetchPost(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/posts/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Error fetching post: ${res.status}`);
  }

  return res.json();
}

export default async function PostPage({ params }: any) {
  // Desempaquetamos params porque en Next 16 puede ser Promise
  const resolvedParams = await params; 
  const id = resolvedParams.id;

  if (!id) {
    return <div>ID inválido</div>;
  }

  let post;
  try {
    post = await fetchPost(id);
  } catch (err) {
    console.error(err);
    return <div>Error cargando el post</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

      {post.imageUrl && <img src={post.imageUrl} className="rounded-md mb-4" />}

      <p>{post.content}</p>
    </main>
  );
}
