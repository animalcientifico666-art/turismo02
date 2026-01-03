'use client';

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/interfaces";
import { ProductImage } from "@/components/product/product-image/ProductImage";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="
      group
      bg-white
      rounded-xl
      overflow-hidden
      border
      border-gray-200
      hover:shadow-lg
      transition-all
      duration-300
    ">
      {/* Imagen */}
      <Link href={`/product/${product.slug}`} className="block relative">
        <ProductImage
          src={displayImage}
          alt={product.title}
          width={400}
          height={400}
          className="
            w-full
            h-[260px]
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
          onMouseEnter={() =>
            setDisplayImage(product.images[1] ?? product.images[0])
          }
          onMouseLeave={() =>
            setDisplayImage(product.images[0])
          }
        />
      </Link>

      {/* Info */}
      <div className="p-3 space-y-1">
        <Link
          href={`/product/${product.slug}`}
          className="
            block
            text-sm
            font-medium
            text-gray-800
            truncate
            hover:text-blue-600
          "
        >
          {product.title}
        </Link>

        <span className="text-base font-semibold text-gray-900">
          ${product.price}
        </span>
      </div>
    </div>
  );
};
