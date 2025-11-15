import React from 'react';

// --- Componentes de Layout ---
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';

// --- Conteúdo Principal e Contexto ---
// Importo o componente que renderiza o alfabeto e o hook de tema
import AlphabetContent from '../components/Alfabeto'; 
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: AlfabetoPage
 * Este é o "molde" (layout wrapper) para a página de visualização do Alfabeto.
 * Ele define as barras de navegação fixas e o fundo, e renderiza o conteúdo central.
 */
export default function AlfabetoPage() {
    // Puxo o tema do contexto global para aplicar no fundo
    const { theme } = useSettings();

    return (
        // Container principal: Aplica o fundo da página (que muda com o tema)
        <div className={`font-poppins relative min-h-screen flex flex-col ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
        }`}>
            {/* --- Sidebars Fixas (Desktop) --- */}
            <SidebarLeft />
            <SidebarRight />
            
            {/* --- Barras Móveis (Mobile) --- */}
            <MobileTopBar />
            <MobileBottomBar />

            {/* Container central que flutua entre as Sidebars fixas */}
            {/* lg:pl-48 -> Deixa espaço para a SidebarLeft.
              lg:pr-96 -> Deixa espaço para a SidebarRight (w-96).
            */}
            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    {/* O conteúdo principal da página */}
                    <AlphabetContent />
                </main>
            </div>
        </div>
    );
}