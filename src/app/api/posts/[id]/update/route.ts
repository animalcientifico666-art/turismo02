import prisma  from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Obtener los datos del formulario
  const data = await req.formData();
  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const imageUrl = data.get("imageUrl") as string;

  // Actualizar el post en la DB
  await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content, imageUrl },
  });

  // 🔹 Construir URL absoluta usando la request actual
  const redirectUrl = new URL("/adminPost/posts", req.url);

  // 🔹 Redirigir a la lista de posts
  return NextResponse.redirect(redirectUrl, 303);
}
