import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
// ALTERADO: Importando o seu novo componente
import UserProfile from '../components/UserProfile'; 

export default function UserPage() {
    return (
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins relative min-h-screen">
            <SidebarLeft />
            <SidebarRight />

            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 py-8">
                    {/* ALTERADO: Renderizando o seu novo componente */}
                    <UserProfile />
                </main>
            </div>
        </div>
    );
}