'use client'

import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline, IoMenu, IoClose } from "react-icons/io5"
import { useCartStore, useUIStore } from "@/store"
import { useEffect, useState } from "react"
import { FaUsers, FaIdCard, FaBoxOpen, FaBlog, FaHome } from "react-icons/fa"

export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu)
  const totalItemsInCart = useCartStore(state => state.getTotalItems())

  const [loaded, setLoaded] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className="relative px-5 py-4 w-full select-none">

      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 blur-3xl opacity-40 -z-10" />

      <div className="flex justify-between items-center
        backdrop-blur-xl bg-white/30 border border-white/40
        shadow-2xl rounded-2xl px-6 py-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <span className={`${titleFont.className} font-bold text-xl`}>
            miIcomo
          </span>
          <span className="ml-1 font-semibold">TURISMO</span>
        </Link>

        {/* MENÚ CENTRAL - DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          <MenuItem href="/" icon={<FaHome />} label="Inicio" />
          <MenuItem href="/gender/men" icon={<FaBoxOpen />} label="Productos" />
          <MenuItem href="/about" icon={<FaIdCard />} label="Quiénes somos" />
          <MenuItem href="/contact" icon={<FaUsers />} label="Contacto" />
          <MenuItem href="/posts" icon={<FaBlog />} label="Blog" />

        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-2">

          {/* Botón hamburguesa SOLO para menú principal */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200"
          >
            {mobileNavOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>

          <Link href="/search" className="hover:scale-110 transition">
            <IoSearchOutline className="w-6 h-6" />
          </Link>

          <Link
            href={loaded && totalItemsInCart === 0 ? "/empty" : "/cart"}
            className="relative hover:scale-110 transition"
          >
            {loaded && totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-700 text-white
                text-xs px-1 rounded-full font-bold">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-6 h-6" />
          </Link>

          {/* TU BOTÓN MENU ORIGINAL (NO SE TOCA) */}
          <button
            onClick={openSideMenu}
            className="ml-2 px-4 py-2 rounded-md font-semibold
              hover:bg-gray-200 active:scale-95 transition"
          >
            Menu
          </button>

        </div>
      </div>

      {/* MENÚ PRINCIPAL MOBILE */}
      {mobileNavOpen && (
        <div className="md:hidden mt-4
          backdrop-blur-xl bg-white/40 border border-white/40
          shadow-xl rounded-xl p-4 space-y-3">

          <MobileItem href="/" label="Inicio" />
          <MobileItem href="/gender/men" label="Productos" />
          <MobileItem href="/about" label="Quiénes somos" />
          <MobileItem href="/contact" label="Contacto" />
          <MobileItem href="/posts" label="Blog" />

        </div>
      )}
    </nav>
  )
}

/* COMPONENTES AUXILIARES */

const MenuItem = ({ href, icon, label }: any) => (
  <Link
    href={href}
    className="flex flex-col items-center px-4 py-2 rounded-xl
      hover:bg-blue-100 hover:text-blue-700 transition relative group"
  >
    <span className="text-2xl mb-1">{icon}</span>
    <span className="text-sm">{label}</span>
    <span className="absolute left-1/2 -bottom-1 -translate-x-1/2
      w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all" />
  </Link>
)

const MobileItem = ({ href, label }: any) => (
  <Link
    href={href}
    className="block px-4 py-2 rounded-lg font-medium
      hover:bg-blue-100 hover:text-blue-700 transition"
  >
    {label}
  </Link>
)
