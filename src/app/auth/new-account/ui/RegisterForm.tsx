'use client'

import { login, registerUser } from "@/actions";
import { data } from "framer-motion/client";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import{SubmitHandler, useForm} from 'react-hook-form';

type FormInputs={
    name: string;
    email:string;
    password: string;
}

export const RegisterForm=()=>{

    const router= useRouter();

    const[errorMessage, setErrorMessage]=useState('');

    const{register, handleSubmit}=useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs>=async(data)=>{
        setErrorMessage('');
        const{name,email,password}=data;
        const resp=await registerUser(name,email,password);

        if(!resp.ok){
            setErrorMessage(resp.message);
            return;
        }

        await login(email.toLowerCase(),password);
        window.location.replace('/');
        console.log({resp});
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

                <label htmlFor="email">Nombre completo</label>
                <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="text" 
                {...register('name',{required:true})}
                />


                <label htmlFor="email">Correo electrónico</label>
                <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email" 
                {...register('email',{required: true, pattern: /^\S+@\S+$/i })}
                />


                <label htmlFor="email">Contraseña</label>
                <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password" 
                {...register('password',{required:true})}
                />

               <span className="text-red-500">{errorMessage}</span>

                <button
                
                className="btn-primary">
                Crear cuenta
                </button>


                {/* divisor l ine */ }
                <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link
                href="/auth/login" 
                className="btn-secondary text-center">
                Ingresar
                </Link>

            </form>
        </div>
    )
}