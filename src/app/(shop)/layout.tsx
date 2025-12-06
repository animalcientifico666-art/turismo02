import { Footer, Sidebar, TopMenu } from '@/components';


import '../globals.css';
import React, { Suspense } from "react";

export default function Sholayout({ children }: {
    children: React.ReactNode;
}) { 
    return (
        <main className="min-h-screen">
            <TopMenu />
            <Sidebar />

            <div className="px-0 sm:px-10">
                <Suspense fallback={<div>Cargando...</div>}>
                    {children}
                </Suspense>
            </div>

            <Footer />
        </main>
    );
}
