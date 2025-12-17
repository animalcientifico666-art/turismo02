import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Obtener posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET /api/posts error:", err);
    return NextResponse.json({ error: "Error en servidor" }, { status: 500 });
  }
}

// POST: Crear post con imagen ya subida a Cloudinary (desde el cliente)
export async function POST(req: Request) {
  try {
    // 👇 Recibe JSON directamente (no formData)
    const formData = await req.formData();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json({ error: "Error en servidor" }, { status: 500 });
  }
}
