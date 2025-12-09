// src/app/posts/[id]/page.tsx
import prisma from "@/lib/prisma";

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  const id = Number(params.id);

  if (isNaN(id)) return <p className="text-center mt-8">ID inválido</p>;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { comments: { orderBy: { createdAt: "desc" } } },
  });

  if (!post) return <p className="text-center mt-8">Post no encontrado</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Título y subtítulo */}
      <h1 className="text-4xl font-bold text-center text-green-800 mb-2">{post.title}</h1>
      <p className="text-center text-gray-500 mb-6">Embracing a Purifying Journey</p>

      {/* Fecha */}
      <div className="text-center text-sm text-gray-400 mb-8">
        {new Date(post.createdAt).toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      {/* Imagen destacada */}
      {post.imageUrl && (
        <div className="flex justify-center mb-8">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-w-md h-auto object-cover rounded shadow-lg"
          />
        </div>
      )}

      {/* Contenido del post */}
      <div
        className="prose prose-green max-w-full mx-auto mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Comentarios */}
      <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
      {post.comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        <ul className="space-y-4">
          {post.comments.map((c) => (
            <li
              key={c.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="text-gray-800">{c.content}</div>
              <div className="text-xs text-gray-500 mt-2">
                {new Date(c.createdAt).toLocaleString("es-ES")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
