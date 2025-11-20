import React from 'react';
// Importo os componentes de layout
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import UserProfile from '../components/UserProfile';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// Puxo o hook do meu contexto para ler o tema
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: UserPage
 * Este é o layout wrapper para a página de Perfil de Usuário.
 * Ele define as barras de navegação fixas e o fundo para o conteúdo do perfil.
 */
export default function UserPage() {
    // Obtenho o tema do contexto global
    const { theme } = useSettings();

    return (
        // Container principal da tela: Aplica o fundo da página condicionalmente
        <div className={`font-poppins relative min-h-screen ${
            theme === 'escuro' 
            ? 'bg-gray-900' // Fundo escuro
            : 'bg-gradient-to-b from-[#F9EFFF] to-white' // Fundo claro (gradiente)
        }`}>
            
            {/* --- Componentes Fixos --- */}
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            {/* Container Central (O canal scrollável da página) */}
            {/* lg:pl-48 -> Deixa espaço para a SidebarLeft.
              lg:pr-96 -> Deixa espaço para a SidebarRight.
            */}
            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                {/* O 'main' tem padding para desviar das barras fixas (mobile) */}
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    {/* O componente principal que renderiza o perfil */}
                    <UserProfile />
                </main>
            </div>
        </div>
    );
}