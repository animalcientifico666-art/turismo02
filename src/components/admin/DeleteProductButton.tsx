"use client";

import { deleteProduct } from "@/actions/product/detele-product";
import { useTransition } from "react";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  productId: string;
}

export const DeleteProductButton = ({ productId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    const confirmed = confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmed) return;

    startTransition(async () => {
      await deleteProduct(productId);
    });
  };

  return (
    <button
      onClick={onDelete}
      disabled={isPending}
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
      title="Eliminar producto"
    >
      <IoTrashOutline size={20} />
    </button>
  );
};
