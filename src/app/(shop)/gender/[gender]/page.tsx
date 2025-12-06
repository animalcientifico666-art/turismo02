'use client';

import React, { useEffect, useState } from 'react';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';
import { useSearchParams, useRouter } from 'next/navigation';

interface Props {
  params: {
    gender: string;
  };
}

export default function Page({ params }: Props) {
  const { gender } = params;

  const router = useRouter();
  const searchParams = useSearchParams();

  const rawPage = searchParams.get('page');
  const page = Number(rawPage ?? 1);

  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const resp = await getPaginatedProductsWithImages({
        page,
        gender: gender as Gender,
      });

      if (resp.products.length === 0) {
        router.push('/');
        return;
      }

      setProducts(resp.products);
      setCurrentPage(resp.currentPage);
      setTotalPages(resp.totalPages);
    }

    fetchProducts();
  }, [page, router, gender]);

  return (
    <>
      <Title title=" " subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
