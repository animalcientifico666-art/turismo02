'use client'
import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { useCartStore, useUIStore } from "@/store"
import { useEffect, useState } from "react"

export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu);

  const totalItemsInCart=useCartStore(state=>state.getTotalItems());

  const [loaded, setLoaded]=useState(false);

  useEffect(()=>{
    setLoaded(true);
  });

  return (
    <nav className="relative flex px-5 justify-between items-center w-full py-4 select-none">

      {/* Fondo mágico (halo de colores) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 blur-3xl opacity-40 -z-10" />

      {/* Contenido */}
      <div className="flex justify-between items-center w-full 
                      backdrop-blur-xl bg-white/30 border border-white/40 
                      shadow-2xl rounded-2xl px-6 py-4">

        {/* LOGO */}
        <div>
          <Link href="/">
            <span className={`${titleFont.className} antialiased font-bold text-xl`}>
              TESLA
            </span>
            <span className="ml-1 font-semibold">TURISMO</span>
          </Link>
        </div>

        {/* CENTER MENU */}
        <div className="hidden sm:flex items-center gap-6">

          <Link
            href="/gender/men"
            className="
              px-4 py-2 rounded-xl font-medium text-gray-800
              hover:text-blue-700 hover:bg-blue-100
              transition-all relative group
            "
          >
            <span className="text-lg">⛰️</span>
            <span className="block text-sm">Aventura Hombres</span>

            {/* Línea animada */}
            <span className="
              absolute left-1/2 -bottom-1 -translate-x-1/2 
              w-0 h-[2px] bg-blue-600 rounded-full
              group-hover:w-full transition-all duration-300
            " />
          </Link>

          <Link
            href="/gender/women"
            className="
              px-4 py-2 rounded-xl font-medium text-gray-800
              hover:text-pink-700 hover:bg-pink-100
              transition-all relative group
            "
          >
            <span className="text-lg">🌸</span>
            <span className="block text-sm">Turismo Mujeres</span>

            <span className="
              absolute left-1/2 -bottom-1 -translate-x-1/2 
              w-0 h-[2px] bg-pink-600 rounded-full
              group-hover:w-full transition-all duration-300
            " />
          </Link>


          <Link
            href="/contact"
            className="
              px-4 py-2 rounded-xl font-medium text-gray-800
              hover:text-pink-700 hover:bg-pink-100
              transition-all relative group
            "
          >
            <span className="text-lg">🌸</span>
            <span className="block text-sm">Contacto</span>

            <span className="
              absolute left-1/2 -bottom-1 -translate-x-1/2 
              w-0 h-[2px] bg-pink-600 rounded-full
              group-hover:w-full transition-all duration-300
            " />
          </Link>


          <Link
            href="/gender/kid"
            className="
              px-4 py-2 rounded-xl font-medium text-gray-800
              hover:text-green-700 hover:bg-green-100
              transition-all relative group
            "
          >
            <span className="text-lg">👨‍👩‍👧</span>
            <span className="block text-sm">Familiar</span>

            <span className="
              absolute left-1/2 -bottom-1 -translate-x-1/2 
              w-0 h-[2px] bg-green-600 rounded-full
              group-hover:w-full transition-all duration-300
            " />
          </Link>

          <Link
            href="/galeria"
            className="
              px-4 py-2 rounded-xl font-medium text-gray-800
              hover:text-purple-700 hover:bg-purple-100
              transition-all relative group
            "
          >
            <span className="text-lg">📸</span>
            <span className="block text-sm">Galería</span>

            <span className="
              absolute left-1/2 -bottom-1 -translate-x-1/2 
              w-0 h-[2px] bg-purple-600 rounded-full
              group-hover:w-full transition-all duration-300
            " />
          </Link>

        </div>

        {/* SEARCH, CART, MENU */}
        <div className="flex items-center">

          <Link href="/search" className="mx-2 hover:scale-110 transition-transform">
            <IoSearchOutline className="w-6 h-6" />
          </Link>

          <Link href={
            ((totalItemsInCart===0)&& loaded)
            ? '/empty'
            : "/cart"
            } className="mr-2 hover:scale-110 transition-transform">
            <div className="relative">

              { (loaded && totalItemsInCart>0) &&(
                <span className="
                absolute text-xs rounded-full px-1 font-bold 
                -top-2 -right-2 bg-blue-700 text-white
              ">
                {totalItemsInCart}  
              </span>

              )
              
              
              
              }

              
              <IoCartOutline className="w-6 h-6" />



            </div>
          </Link>

          <button
            onClick={() => openSideMenu()}
            className="
              m-2 p-2 rounded-md font-semibold 
              hover:bg-gray-200 active:scale-95 
              transition-all
            "
          >
            Menu
          </button>

        </div>

      </div>
    </nav>
  );
};
