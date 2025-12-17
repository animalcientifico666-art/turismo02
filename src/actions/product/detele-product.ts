"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (productId: string) => {
  try {
    // Eliminar imágenes relacionadas
    await prisma.productImage.deleteMany({
      where: { productId },
    });

    // Eliminar producto
    await prisma.product.delete({
      where: { id: productId },
    });

    // Revalidar la lista
    revalidatePath("/admin/products");

    return { ok: true };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return { ok: false };
  }
};
