import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import LojaContent from '../components/Loja'; // Importa o conteúdo que vamos ajustar no próximo passo

export default function LojaPage() {
    return (
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins relative min-h-screen">
            <SidebarLeft />
            <SidebarRight />

            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 py-8">
                    <LojaContent />
                </main>
            </div>
        </div>
    );
}