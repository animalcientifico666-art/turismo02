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

  // NUEVO: capturar la búsqueda desde la URL
  const rawSearch = searchParams.get('search') ?? '';

  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(rawSearch); // NUEVO

  useEffect(() => {
    async function fetchProducts() {
      const resp = await getPaginatedProductsWithImages({
        page,
        gender: gender as Gender,
        search: rawSearch, // NUEVO: enviar el texto de búsqueda
      });

      if (resp.products.length === 0 && !rawSearch) {
        router.push('/');
        return;
      }

      setProducts(resp.products);
      setCurrentPage(resp.currentPage);
      setTotalPages(resp.totalPages);
    }

    fetchProducts();
  }, [page, router, gender, rawSearch]); // NUEVO rawSearch

  // NUEVO: función para actualizar búsqueda y URL
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const params = new URLSearchParams();
    params.set('page', '1');
    if (value.trim().length > 0) params.set('search', value);

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <Title title=" " subtitle="Todos los productos" className="mb-2" />

      {/* NUEVO: input de búsqueda */}
      <div className="w-full flex justify-left mt-6 mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar productos por nombre..."
          className="border px-3 py-2 rounded-lg w-80 shadow-sm"
        />
      </div>

      <ProductGrid products={products} />

      

      <Pagination totalPages={totalPages} />
    </>
  );
}
