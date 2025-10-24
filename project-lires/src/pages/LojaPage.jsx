import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
// import SidebarRight from '../components/SidebarRight'; // Removido
import LojaSidebar from '../components/LojaSidebar'; // Adicionado
import LojaContent from '../components/Loja'; // Verifique se o caminho está correto
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';

export default function LojaPage() {
    return (
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins relative min-h-screen">
            <SidebarLeft />
            {/* <SidebarRight /> */} {/* Trocado */}
            <LojaSidebar /> {/* Pelo novo componente */}
            <MobileTopBar />
            <MobileBottomBar />

            {/* O lg:pr-96 continua correto, pois o LojaSidebar tem w-96 */}
            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    <LojaContent />
                </main>
            </div>
        </div>
    );
}