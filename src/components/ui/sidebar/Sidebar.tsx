'use client'

import { useUIStore } from "@/store"
import Link from "next/link"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import {
  IoCloseOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShirtOutline,
  IoPeopleOutline
} from "react-icons/io5"
import { FaBlog } from "react-icons/fa"
import clsx from "clsx"

export const Sidebar = () => {

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
  const closeMenu = useUIStore(state => state.closeSideMenu)

  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const isAdmin = session?.user?.role === "admin"

  const [activo, setActivo] = useState(false)

  return (
    <>
      {/* Overlay */}
      {isSideMenuOpen && (
        <>
          <div className="fixed inset-0 z-10 bg-black/30" />
          <div className="fixed inset-0 z-10 backdrop-blur-sm" />
        </>
      )}

      {/* Sidebar */}
      <nav
        className={clsx(
          "fixed top-0 right-0 z-20 h-screen bg-blue-500 shadow-2xl transform transition-all duration-300 p-5",
          "w-full sm:w-[380px] md:w-[420px] lg:w-[500px]",
          {
            "translate-x-full": !isSideMenuOpen
          }
        )}
      >
        {/* Close */}
        <IoCloseOutline
          className="absolute top-4 right-4 cursor-pointer text-3xl sm:text-5xl"
          onClick={closeMenu}
        />

        {/* Search */}
        <div className="relative mt-14">
          {!activo && (
            <IoSearchOutline className="absolute top-3 left-3 text-lg sm:text-xl" />
          )}

          <input
            type="text"
            placeholder="Buscar"
            onFocus={() => setActivo(true)}
            onBlur={() => setActivo(false)}
            className="
              w-full bg-gray-50 rounded
              pl-10 pr-4 py-2
              border-b-2 border-gray-200
              text-base sm:text-xl
              focus:outline-none focus:border-blue-500
            "
          />
        </div>

        {/* Authenticated */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline className="text-2xl sm:text-3xl" />
              <span className="ml-3 text-lg sm:text-xl">Perfil</span>
            </Link>

            <button
              onClick={() => signOut({ redirect: false })}
              className="flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all w-full text-left"
            >
              <IoLogOutOutline className="text-2xl sm:text-3xl" />
              <span className="ml-3 text-lg sm:text-xl">Salir</span>
            </button>
          </>
        )}

        {/* Not authenticated */}
        {!isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={closeMenu}
            className="flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline className="text-2xl sm:text-3xl" />
            <span className="ml-3 text-lg sm:text-xl">Ingresar</span>
          </Link>
        )}

        {/* Admin */}
        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-8" />

            <Link
              href="/admin/products"
              onClick={closeMenu}
              className="flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline className="text-2xl sm:text-3xl" />
              <span className="ml-3 text-lg sm:text-xl">Productos</span>
            </Link>

            <Link
              href="/adminPost/posts"
              onClick={closeMenu}
              className="flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <FaBlog className="text-xl sm:text-2xl" />
              <span className="ml-3 text-lg sm:text-xl">Blog</span>
            </Link>

            <Link
              href="/admin/users"
              onClick={closeMenu}
              className="flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline className="text-2xl sm:text-3xl" />
              <span className="ml-3 text-lg sm:text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </>
  )
}
