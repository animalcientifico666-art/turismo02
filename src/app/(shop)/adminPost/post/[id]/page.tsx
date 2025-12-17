import  prisma  from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: Params) {
  const { id } = params;

  // Buscar el post por id
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Editar Post</h1>

      <form
        action={`/api/posts/${post.id}/update`}
        method="POST"
      >
        <div>
          <label className="block font-medium mb-1">Título</label>
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contenido</label>
          <textarea
            name="content"
            defaultValue={post.content}
            rows={10}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Imagen URL</label>
          <input
            type="text"
            name="imageUrl"
            defaultValue={post.imageUrl || ""}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button type="submit" className="btn-primary">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
