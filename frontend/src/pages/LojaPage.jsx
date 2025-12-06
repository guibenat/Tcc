import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import LojaSidebar from '../components/LojaSidebar'; 
import LojaContent from '../components/Loja';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
import { useSettings } from '../components/SettingsContext';

// componente principal da página Loja
export default function LojaPage() {
    const { theme } = useSettings();

    return (
        // Container principal da tela
        // Aplico o fundo da página (que muda com o tema)
        <div className={`font-poppins relative min-h-screen ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
        }`}>
            
            {/* Componentes Fixos */}
            <SidebarLeft />
            {/* O sidebar da Loja */}
            <LojaSidebar /> 
            
            {/* Barras fixas do mobile */}
            <MobileTopBar />
            <MobileBottomBar />
            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    {/* O conteúdo principal da loja */}
                    <LojaContent />
                </main>
            </div>
        </div>
    );
}