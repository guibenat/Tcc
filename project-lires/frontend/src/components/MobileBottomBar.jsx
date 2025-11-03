import React, { useState } from 'react';
// <<< ALTERAÇÃO 1: Importar useSettings >>>
import { useSettings } from '../components/SettingsContext'; 

// Dados de menu (sem alteração)
const menuItems = [
    { icon: '../src/assets/aprender.png', label: 'Aprender', id: 'aprender', path: '/home' }, // Adicionado path
    { icon: '../src/assets/praticar.png', label: 'Alfabeto', id: 'alfabeto', path: '/alfabeto' }, // Adicionado path e label corrigido
    { icon: '../src/assets/videos.png', label: 'Vídeos', id: 'videos', path: '/videos' }, // Adicionado path
    { icon: '../src/assets/feed.png', label: 'Feed', id: 'feed', path: '/feed' }, // Adicionado path
    { icon: '../src/assets/loja.png', label: 'Loja', id: 'loja', path: '/loja' }, // Adicionado path
    { icon: '../src/assets/perfil.png', label: 'Perfil', id: 'perfil', path: '/perfil' }, // Adicionado path
    { icon: '../src/assets/ajustes.png', label: 'Ajustes', id: 'ajustes', path: '/configuracoes' }, // Adicionado path
];

// <<< ALTERAÇÃO 2: Importar Link e useLocation >>>
import { Link, useLocation } from 'react-router-dom';


export default function MobileBottomBar() {
    // <<< ALTERAÇÃO 3: Usar useLocation para determinar item ativo >>>
    const location = useLocation();
    // <<< ALTERAÇÃO 4: Obter o tema >>>
    const { theme } = useSettings();

    // Removemos o useState local para activeItem

    return (
        // <<< ALTERAÇÃO 5: Ajustar fundo e borda >>>
        <nav className={`
            lg:hidden fixed bottom-0 left-0 right-0 h-20 z-40
            ${theme === 'escuro' 
              ? 'bg-gray-900 border-t-2 border-gray-700' 
              : 'bg-white border-t-2 border-slate-200'}
        `}>
            <div className="max-w-screen-xl mx-auto h-full flex justify-around items-center px-2">
                {menuItems.map((item) => {
                    // <<< ALTERAÇÃO 6: Determinar se o item está ativo com base na rota >>>
                    const isActive = location.pathname === item.path;

                    return (
                        // <<< ALTERAÇÃO 7: Usar Link em vez de <a> e remover onClick >>>
                        <Link
                            key={item.id}
                            to={item.path || '#'} // Usar o path definido
                            className={`
                                flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors duration-200 w-16
                                ${isActive 
                                  ? (theme === 'escuro' ? 'text-purple-400' : 'text-purple-600') // Cor ativa
                                  : (theme === 'escuro' ? 'text-slate-400 hover:text-purple-400' : 'text-slate-500 hover:text-purple-600') // Cor inativa + hover
                                }`
                            }
                        >
                            <img 
                                src={item.icon} 
                                alt={item.label} 
                                className={`
                                    w-8 h-8 transition-transform duration-200 
                                    ${isActive ? 'scale-110' : ''}
                                    ${theme === 'escuro' && !isActive ? 'opacity-70' : ''} // Leve opacidade no ícone inativo escuro
                                `}
                            />
                            <span className="text-xs font-bold">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}