import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import UserProfile from '../components/UserProfile'; // Importa o conteúdo do perfil

export default function UserPage() {
    return (
        // AQUI está o fundo gradiente da página inteira
        // De um lilás MUITO claro (#F9EFFF) para branco (to-white)
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins relative min-h-screen">
            <SidebarLeft />
            <SidebarRight />

            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 py-8">
                    <UserProfile /> {/* Renderiza o conteúdo do perfil */}
                </main>
            </div>
        </div>
    );
}