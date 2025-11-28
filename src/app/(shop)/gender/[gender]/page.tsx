'use client';

import React from 'react';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';
import { Gender } from '@prisma/client';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: {
    page?: string;
  };
}

export default function Page({ params }: Props) {
  // ✔️ CORRECCIÓN: unwrap del Promise
  const { gender } = React.use(params);

  const router = useRouter();
  const searchParams = useSearchParams();
  const rawPage = searchParams.get('page');
  const page = Number(rawPage ?? 1);

  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const { products, currentPage, totalPages } =
        await getPaginatedProductsWithImages({
          page,
          gender: gender as Gender,
        });

      if (products.length === 0) {
        router.push('/');
        return;
      }

      setProducts(products);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    }

    fetchProducts();
  }, [page, router, gender]);

  return (
    <>
      <Title
        title="Articulos de "
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
