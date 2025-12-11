"use client";

import Link from 'next/link';
import { Title } from '@/components';
import { ProductInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

import { getWhatsappMessage } from "@/utils/getWhatsappMessage";

export default function CartPage() {

  const handleWhatsappCheckout = () => {
    const phone = "51902250029"; // TU NÚMERO AQUÍ
    const message = getWhatsappMessage();
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title='Carrito' />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {/* Items */}
            <ProductInCart />
          </div>

          {/* Checkout + resumen */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <button
                className="
                  flex 
                  justify-center 
                  items-center
                  w-full
                  px-4 
                  py-3
                  bg-[#25D366]        /* Verde WhatsApp */
                  text-white
                  font-semibold
                  rounded-xl          /* Bordes redondeados */
                  shadow-lg           /* Sombra suave */
                  hover:bg-[#1EBE5B]  /* Verde más oscuro al pasar el mouse */
                  hover:shadow-xl     /* Sombra más fuerte */
                  transition-all 
                  duration-300 
                  ease-out
                "
                onClick={handleWhatsappCheckout}
              >
                Checkout por WhatsApp
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
