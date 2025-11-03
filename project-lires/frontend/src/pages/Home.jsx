import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MainContent from '../components/MainContent';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// Importar useSettings
import { useSettings } from '../components/SettingsContext';

export default function Home() {
    // Obter o tema
    const { theme } = useSettings();

    return (
        // Aplicar classe de fundo condicional
        <div className={`
            font-poppins min-h-screen flex flex-col relative
            ${theme === 'escuro' 
              ? 'bg-gray-900 text-slate-200' 
              : 'bg-gradient-to-b from-[#F9EFFF] to-white text-slate-800'}
        `}>
            {/* Componentes internos já foram atualizados ou precisam ser atualizados */}
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                <main className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    {/* MainContent também precisa ler o tema internamente */}
                    <MainContent /> 
                </main>
            </div>
        </div>
    );
}