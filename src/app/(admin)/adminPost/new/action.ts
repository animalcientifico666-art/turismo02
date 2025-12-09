// src/app/(admin)/posts/new/actions.ts
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function createPostServer({ title, content, file }: { title: string, content: string, file?: File }) {
  let imageUrl: string | null = null;
  if (file && file.size > 0) {
    const upload = await uploadImageToCloudinary(file);
    imageUrl = upload.secure_url;
  }

  return prisma.post.create({ data: { title, content, imageUrl } });
}
