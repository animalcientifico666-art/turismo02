import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(_req: Request, { params }: any) {
  // Desempaquetamos params
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    return new Response(JSON.stringify({ error: "ID inválido" }), { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return new Response(JSON.stringify({ error: "Post no encontrado" }), { status: 404 });
  }

  return new Response(JSON.stringify(post));
}

//  DELETE → eliminar post (AQUÍ VA)
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id); // conversión clave

  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'ID inválido' },
      { status: 400 }
    );
  }

  try {
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Post no encontrado' },
      { status: 404 }
    );
  }
}