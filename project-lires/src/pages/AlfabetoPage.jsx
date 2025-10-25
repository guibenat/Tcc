import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import AlphabetContent from '../components/Alfabeto'; // Verifique se o caminho está correto
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// 1. IMPORTAR O HOOK
import { useSettings } from '../components/SettingsContext';

export default function AlfabetoPage() {
    // 2. LER O TEMA
    const { theme } = useSettings();

    return (
        // 3. APLICAR O TEMA AO FUNDO
        <div className={`font-poppins relative min-h-screen flex flex-col ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
        }`}>
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    {/* O AlphabetContent agora vai ler o tema internamente */}
                    <AlphabetContent />
                </main>
            </div>
        </div>
    );
}