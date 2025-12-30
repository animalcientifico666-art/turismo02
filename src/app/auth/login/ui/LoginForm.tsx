'use client';

import { authenticate } from "@/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";

export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [state]);

  return (
    <div className="
      
    ">
      <form
        action={dispatch}
        className="bg-white rounded-xl shadow-md px-5 py-6"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Iniciar sesión
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ingresa tus credenciales
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {state && state !== 'Success' && (
          <p className="text-sm text-red-600 text-center mb-4">
            {state}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Ingresar
        </button>

        <div className="flex justify-between items-center mt-5 text-sm">
          <Link href="/auth/new-account" className="text-blue-600 hover:underline">
            Crear cuenta
          </Link>

          <Link href="/" className="text-gray-500 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </form>
    </div>
  );
};
