import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MainContent from '../components/MainContent';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';

export default function Home() {
    return (
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins min-h-screen flex flex-col">
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                {/* ALTERADO: Adicionado 'max-w-screen-xl' e 'mx-auto' 
                  para centralizar o conteúdo e limitar sua largura máxima.
                */}
                <main className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    <MainContent />
                </main>
            </div>
        </div>
    );
}