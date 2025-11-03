import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarLeft from '../components/SidebarLeft';
import RightConfigLires, { SidebarRightMobile } from '../components/RightConfigLires';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
import { useSettings } from '../components/SettingsContext'; // <<<--- IMPORTAR O HOOK

export default function SettingsLayout() {
  const { theme } = useSettings(); // <<<--- LER O TEMA DO CONTEXTO

    return (
        // <<<--- APLICA CLASSES DE TEMA ESCURO AQUI ---
        <div className={`
          font-poppins relative min-h-screen flex flex-col
          ${theme === 'escuro' 
            ? 'bg-gray-900 text-slate-200' // Fundo escuro
            : 'bg-gradient-to-b from-[#F9EFFF] to-white text-slate-800'} // Fundo claro
        `}>
            <SidebarLeft />
            <RightConfigLires /> 
            <MobileTopBar />
            <MobileBottomBar />

            {/* Container do conteúdo central */}
            <div className="w-full lg:pl-48 xl:pr-80 flex-grow flex flex-col">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    {/* O Outlet vai renderizar 'Preferencias.jsx', que também reage ao tema */}
                    <Outlet />
                </main>
                {/* Renderiza a sidebar mobile abaixo */}
                <div className="px-4 lg:px-8 pb-24">
                    <SidebarRightMobile />
                </div>
            </div>
        </div>
    );
}