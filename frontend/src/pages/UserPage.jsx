import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import UserProfile from '../components/UserProfile';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
import { useSettings } from '../components/SettingsContext';

// Pagina Userpage
export default function UserPage() {
    // Obtenho o tema do contexto global
    const { theme } = useSettings();

    return (
        // Container principal da tela
        <div className={`font-poppins relative min-h-screen ${
            theme === 'escuro' 
            ? 'bg-gray-900' // Fundo escuro
            : 'bg-gradient-to-b from-[#F9EFFF] to-white' // Fundo claro 
        }`}>
            
            {/* omponentes Fixos */}
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    <UserProfile />
                </main>
            </div>
        </div>
    );
}