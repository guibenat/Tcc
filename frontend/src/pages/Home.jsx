import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MainContent from '../components/MainContent';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// Puxo o hook do meu contexto para ler o tema
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: Home
 * Este é o "molde" (layout wrapper) para a página inicial (trilha de lições).
 * Ele define as barras de navegação fixas e o fundo, e renderiza o conteúdo central.
 */
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
            {/* --- Componentes Fixos (Sidebars) --- */}
            <SidebarLeft />
            <SidebarRight />
            
            {/* --- Barras Fixas (Mobile) --- */}
            <MobileTopBar />
            <MobileBottomBar />

            {/* Container Central (O "canal" que pode rolar) */}
            {/* lg:pl-48 -> Deixa espaço para a SidebarLeft.
              lg:pr-96 -> Deixa espaço para a SidebarRight (w-96).
            */}
            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                <main className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    {/* O conteúdo principal da página (a trilha de lições) */}
                    <MainContent /> 
                </main>
            </div>
        </div>
    );
}