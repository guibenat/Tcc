import React, { useState, useEffect } from 'react'; // <-- Adicionado useState e useEffect
// <<< ALTERAÇÃO 1: Importar useSettings >>>
import { useSettings } from '../components/SettingsContext'; 
import Perfil from '../assets/Perfil.png'; // <-- Importado como fallback

// <<< ALTERAÇÃO 2: Importar Link e useLocation >>>
import { Link, useLocation } from 'react-router-dom';

// --- INÍCIO DA MODIFICAÇÃO (Função de Avatar) ---
const colorPalette = [
    'f0d3f7', 'c0aede', 'd1d4f9', 'fde047', 'a78bfa',
    '7c3aed', '4ade80', '2dd4bf', 'fb7185', 'f97316'
].join(',');

const getAvatarUrl = (seed, style) => {
    const finalStyle = style || 'bottts-neutral'; // Padrão é robô
    if (!seed) {
        return Perfil; // Retorna o placeholder
    }
    return `https://api.dicebear.com/7.x/${finalStyle}/svg?seed=${seed}&radius=50&backgroundColor=${colorPalette}`;
};
// --- FIM DA MODIFICAÇÃO ---

// Dados de menu (sem alteração)
const menuItems = [
    { icon: '../src/assets/aprender.png', label: 'Aprender', id: 'aprender', path: '/home' }, 
    { icon: '../src/assets/praticar.png', label: 'Alfabeto', id: 'alfabeto', path: '/alfabeto' }, 
    { icon: '../src/assets/videos.png', label: 'Vídeos', id: 'videos', path: '/videos' }, 
    { icon: '../src/assets/feed.png', label: 'Feed', id: 'feed', path: '/feed' }, 
    { icon: '../src/assets/loja.png', label: 'Loja', id: 'loja', path: '/loja' }, 
    { icon: '../src/assets/perfil.png', label: 'Perfil', id: 'perfil', path: '/perfil' }, 
    { icon: '../src/assets/ajustes.png', label: 'Ajustes', id: 'ajustes', path: '/configuracoes' }, 
];


export default function MobileBottomBar() {
    const location = useLocation();
    const { theme } = useSettings();

    // --- INÍCIO DA MODIFICAÇÃO (Carregar Avatar do Usuário) ---
    const [avatarUrl, setAvatarUrl] = useState(Perfil); // Começa com o placeholder

    useEffect(() => {
        // Carrega os dados do usuário logado no localStorage
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            // Gera a URL do avatar com a seed e o estilo salvos
            setAvatarUrl(getAvatarUrl(user?.avatarSeed || user?.username, user?.avatarStyle));
        }
    }, [location.pathname]); // Recarrega o avatar se a localização mudar
    // --- FIM DA MODIFICAÇÃO ---

    return (
        <nav className={`
            lg:hidden fixed bottom-0 left-0 right-0 h-20 z-40
            ${theme === 'escuro' 
                ? 'bg-gray-900 border-t-2 border-gray-700' 
                : 'bg-white border-t-2 border-slate-200'}
        `}>
            <div className="max-w-screen-xl mx-auto h-full flex justify-around items-center px-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.id}
                            to={item.path || '#'} 
                            className={`
                                flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors duration-200 w-16
                                ${isActive 
                                    ? (theme === 'escuro' ? 'text-purple-400' : 'text-purple-600') // Cor ativa
                                    : (theme === 'escuro' ? 'text-slate-400 hover:text-purple-400' : 'text-slate-500 hover:text-purple-600') // Cor inativa + hover
                                }`
                            }
                        >
                            {/* --- INÍCIO DA MODIFICAÇÃO (Renderização do Ícone/Avatar) --- */}
                            {item.id === 'perfil' ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className={`
                                        w-8 h-8 rounded-full bg-white
                                        ${isActive ? 'scale-110' : ''}
                                    `}
                                />
                            ) : (
                                <img 
                                    src={item.icon} 
                                    alt={item.label} 
                                    className={`
                                        w-8 h-8 transition-transform duration-200 
                                        ${isActive ? 'scale-110' : ''}
                                        ${theme === 'escuro' && !isActive ? 'opacity-70' : ''}
                                    `}
                                />
                            )}
                            {/* --- FIM DA MODIFICAÇÃO --- */}
                            
                            <span className="text-xs font-bold">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}