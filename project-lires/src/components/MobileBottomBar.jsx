import React, { useState } from 'react';

// Dados de menu para a barra inferior
const menuItems = [
  { icon: '../src/assets/aprender.png', label: 'Aprender', id: 'aprender' },
  { icon: '../src/assets/praticar.png', label: 'Praticar', id: 'praticar' },
  { icon: '../src/assets/videos.png', label: 'Vídeos', id: 'videos' },
  { icon: '../src/assets/loja.png', label: 'Loja', id: 'loja' },
  { icon: '../src/assets/perfil.png', label: 'Perfil', id: 'perfil' },
  // ADICIONADO: O item 'Ajustes' foi incluído na lista.
  { icon: '../src/assets/ajustes.png', label: 'Ajustes', id: 'ajustes' },
];

export default function MobileBottomBar() {
    const [activeItem, setActiveItem] = useState('aprender');

    return (
        // Este componente só aparece em telas menores que 'lg' (lg:hidden)
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-slate-200 z-40">
            <div className="max-w-screen-xl mx-auto h-full flex justify-around items-center px-2">
                {menuItems.map((item) => (
                    <a
                        key={item.id}
                        href="#"
                        onClick={() => setActiveItem(item.id)}
                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors duration-200 w-16
                            ${activeItem === item.id ? 'text-purple-600' : 'text-slate-500'}`
                        }
                    >
                        <img 
                            src={item.icon} 
                            alt={item.label} 
                            className={`w-8 h-8 transition-transform duration-200 ${activeItem === item.id ? 'scale-110' : ''}`}
                        />
                        <span className="text-xs font-bold">{item.label}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
}