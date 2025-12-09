// src/app/(admin)/posts/new/page.tsx
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const file = formData.get("image") as File | null;

    if (!title || !content) {
      // validar mínimamente
      return;
    }

    let imageUrl: string | null = null;
    if (file && file.size > 0) {
      const upload = await uploadImageToCloudinary(file);
      imageUrl = upload.secure_url;
    }

    // Crear post usando solo id, sin slug
    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    // Redirigir a la página de detalle por id
    redirect(`/posts/${post.id}`);
  }

  return (
    <div>
      <h1>Crear Post</h1>
      <form action={createPost} encType="multipart/form-data">
        <div style={{ marginBottom: 8 }}>
          <label>Título</label>
          <input name="title" required />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Contenido</label>
          <textarea name="content" required rows={8} />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Imagen (opcional)</label>
          <input type="file" name="image" accept="image/*" />
        </div>

        <div>
          <button type="submit">Crear Post</button>
        </div>
      </form>
    </div>
  );
}
