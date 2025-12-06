import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MainContent from '../components/MainContent';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
import { useSettings } from '../components/SettingsContext';

// Componente principal da página Home
export default function Home() {
    // Obtenho o tema do contexto global
    const { theme } = useSettings();

    return (
        // Container principal da tela (full-height, flex column)
        // Aplico o fundo da página (que muda com o tema)
        <div className={`
            font-poppins min-h-screen flex flex-col relative
            ${theme === 'escuro' 
              ? 'bg-gray-900 text-slate-200' // Fundo escuro
              : 'bg-gradient-to-b from-[#F9EFFF] to-white text-slate-800'} // Fundo claro (gradiente)
        `}>
            {/* Componentes Fixos (Sidebars) */}
            <SidebarLeft />
            <SidebarRight />
            
            {/* Barras Fixas (Mobile) */}
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                <main className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    <MainContent /> 
                </main>
            </div>
        </div>
    );
}