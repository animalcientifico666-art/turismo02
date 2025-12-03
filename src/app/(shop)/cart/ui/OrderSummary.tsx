'use client'

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react"

export const OrderSummary = () => {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // 1) Obtener la función del store SIN llamar dentro del selector
  const getSummaryInformation = useCartStore(state => state.getSummaryInformation);

  // 2) Llamar a la función normalmente
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null; // O un loader
  }

  return (
    <div className="grid grid-cols-2">

      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>


      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>

    </div>
  );
}
