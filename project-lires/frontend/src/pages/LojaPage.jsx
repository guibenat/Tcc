import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import LojaSidebar from '../components/LojaSidebar'; 
import LojaContent from '../components/Loja';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// 1. IMPORTAR O HOOK
import { useSettings } from '../components/SettingsContext';

export default function LojaPage() {
    // 2. LER O TEMA
    const { theme } = useSettings();

    return (
        // 3. APLICAR O TEMA AO FUNDO
        <div className={`font-poppins relative min-h-screen ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
        }`}>
            <SidebarLeft />
            <LojaSidebar /> 
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    {/* LojaContent agora herdará o fundo escuro do pai */}
                    <LojaContent />
                </main>
            </div>
        </div>
    );
}