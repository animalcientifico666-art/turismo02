'use client';

import { useState, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/actions';
import { ContactForm, Pagination, ProductGrid, Title } from '@/components';
import { useRouter } from 'next/navigation';
import {Hero} from '@/components/portada/Hero';
import  {BestSellingTours}  from '@/components/portada/BestSellingTours';
import { AboutSection } from '@/components/portada/AboutSection';
import {Nosotros} from '@/components/portada/Nosotros';
import {WhatsAppButton} from '@/components/portada/WhatsAppButton';



export default function Home() {
  
 const router = useRouter();
  const searchParams = useSearchParams();
  const rawPage = searchParams.get('page'); // captura el ?page=2
  const page = Number(rawPage ?? 1);

  const [products, setProducts] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
     async function fetchProducts() {
     const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

          console.log('aqioooo');
          console.log(currentPage, totalPages);

          if (products.length === 0) {
            router.push('/');
          } else {
                setProducts(products);
                setCurrentPage(currentPage);
                setTotalPages(totalPages);
          }
      }
  fetchProducts();
}, [page, router]);

  return (
    <div>
      <Hero/>
      <BestSellingTours/>
      <AboutSection/>
      <Nosotros/>
      {/*    <Title title="Turismo" subtitle="todos los productos" className="mb-2" />  */} 
      {/*  <ProductGrid products={products} /> */} 
      <Pagination totalPages={totalPages}/>
      <WhatsAppButton/>
    </div>
  );
}
