import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarLeft from '../components/SidebarLeft';
import RightConfigLires, { SidebarRightMobile } from '../components/RightConfigLires'; // A sidebar de Configurações
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';

export default function SettingsLayout() {
    return (
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins relative min-h-screen flex flex-col">
            <SidebarLeft />
            <RightConfigLires /> {/* Sidebar da Direita Específica para Configurações */}
            <MobileTopBar />
            <MobileBottomBar />

            {/* Container do conteúdo central */}
            <div className="w-full lg:pl-48 xl:pr-80 flex-grow flex flex-col"> {/* Ajustado xl:pr-80 */}
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    {/* Outlet renderiza o componente da rota filha (ex: GerenciamentoConta) */}
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