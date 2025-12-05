import prisma from "@/lib/prisma";

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
