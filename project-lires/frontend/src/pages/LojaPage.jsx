import React from 'react';
// Importo os componentes de layout
import SidebarLeft from '../components/SidebarLeft';
import LojaSidebar from '../components/LojaSidebar'; 
import LojaContent from '../components/Loja';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// Puxo o hook do meu contexto para ler o tema
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: LojaPage
 * Este é o layout wrapper para a página da Loja.
 * Ele define as sidebars e o fundo, e renderiza o conteúdo central (os pacotes de Lcoins).
 */
export default function LojaPage() {
    // Obtenho o tema do contexto global
    const { theme } = useSettings();

    return (
        // Container principal da tela
        // Aplico o fundo da página (que muda com o tema)
        <div className={`font-poppins relative min-h-screen ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
        }`}>
            
            {/* --- Componentes Fixos --- */}
            <SidebarLeft />
            {/* O sidebar da Loja (status do usuário e buffs ativos) */}
            <LojaSidebar /> 
            
            {/* Barras fixas do mobile */}
            <MobileTopBar />
            <MobileBottomBar />

            {/* Container Central (O canal scrollável da página) */}
            {/* lg:pl-48 -> Deixa espaço para a SidebarLeft.
              lg:pr-96 -> Deixa espaço para a LojaSidebar (que é w-96).
            */}
            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    {/* O conteúdo principal da loja (Cards de Lcoins e Banner) */}
                    <LojaContent />
                </main>
            </div>
        </div>
    );
}