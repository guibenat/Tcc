import React, { useState } from 'react';
import logoLiresImg from '../assets/logo-lires.png';

const menuItems = [
  { icon: '../src/assets/aprender.png', label: 'Aprender', id: 'aprender' },
  { icon: '../src/assets/praticar.png', label: 'Praticar', id: 'praticar' },
  { icon: '../src/assets/videos.png', label: 'Vídeos', id: 'videos' },
  { icon: '../src/assets/feed.png', label: 'Feed', id: 'feed' },
  { icon: '../src/assets/loja.png', label: 'Loja', id: 'loja' },
  { icon: '../src/assets/perfil.png', label: 'Perfil', id: 'perfil' },
  { icon: '../src/assets/ajustes.png', label: 'Ajustes', id: 'ajustes' }
];

export default function SidebarLeft() {
  const [activeItem, setActiveItem] = useState('aprender');

  return (
    <aside className="w-48 bg-white border-r border-slate-200 flex flex-col p-4 fixed left-0 top-0 h-full">
      <div className="px-2 mb-12 mt-4">
        <img src={logoLiresImg} alt="Logo Lires" className="w-24" />
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveItem(item.id);
            }}
            className={`
              flex items-center gap-4 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200
              ${activeItem === item.id 
                ? 'bg-purple-100 text-purple-700' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-purple-600'
              }
            `}
          >
            <img 
              src={item.icon} 
              alt={`Ícone de ${item.label}`} 
              // ALTERADO: Aumentado o tamanho dos ícones de w-6 h-6 para w-7 h-7
              className={`w-7 h-7 ${activeItem === item.id ? '' : 'opacity-70'}`}
            />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}