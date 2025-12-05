import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Configuración de Cloudinary usando CLOUDINARY_URL
cloudinary.config({
  secure: true,
});

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

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const title = form.get("title") as string;
    const content = form.get("content") as string;
    const image = form.get("image") as File | null;

    let imageUrl: string | null = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const mime = image.type ?? "image/jpeg";
      const dataUri = `data:${mime};base64,${base64}`;

      const upload = await cloudinary.uploader.upload(dataUri, {
        folder: "posts",
      });

      imageUrl = upload.secure_url;
      console.log("Cloudinary URL:", imageUrl);
    }

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
