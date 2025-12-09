// src/app/posts/[id]/page.tsx
import prisma from "@/lib/prisma";

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  const id = Number(params.id);

  if (isNaN(id)) return <p>ID inválido</p>;

  const post = await prisma.post.findUnique({
    where: { id }, // Usamos id, no slug
    include: {
      comments: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!post) return <p>Post no encontrado</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>{post.title}</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>

      {post.imageUrl && (
        <div style={{ margin: "12px 0" }}>
          <img src={post.imageUrl} alt={post.title} style={{ maxWidth: "100%" }} />
        </div>
      )}

      <h2>Comentarios</h2>
      {post.comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {post.comments.map((c) => (
            <li key={c.id} style={{ marginBottom: 8, borderBottom: "1px solid #eee", paddingBottom: 4 }}>
              
              <div style={{ fontSize: 12, color: "#666" }}>
                {new Date(c.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
