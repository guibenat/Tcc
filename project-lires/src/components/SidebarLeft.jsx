import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoLiresImg from '../assets/logo-lires.png';

const menuItems = [
  { icon: '../src/assets/aprender.png', label: 'Aprender', id: 'aprender', path: '/home' },
  { icon: '../src/assets/praticar.png', label: 'Alfabeto', id: 'alafabeto', path: '/alfabeto' },
  { icon: '../src/assets/videos.png', label: 'Vídeos', id: 'videos', path: '/videos' },
  { icon: '../src/assets/feed.png', label: 'Feed', id: 'feed', path: '/feed' },
  { icon: '../src/assets/loja.png', label: 'Loja', id: 'loja', path: '/loja' },
  { icon: '../src/assets/perfil.png', label: 'Perfil', id: 'perfil', path: '/perfil' },
  { icon: '../src/assets/ajustes.png', label: 'Ajustes', id: 'ajustes', path: '/ajustes' },
];

export default function SidebarLeft() {
  const location = useLocation(); 

  return (
    <aside className="w-48 bg-white border-r border-slate-200 flex-col p-4 fixed left-0 top-0 h-full hidden lg:flex">
      <div className="px-2 mb-12 mt-4">
        <img src={logoLiresImg} alt="Logo Lires" className="w-24" />
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path || '#'}
              className={`
                flex items-center gap-4 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200
                ${isActive 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-purple-600'
                }
              `}
            >
              <img 
                src={item.icon} 
                alt={`Ícone de ${item.label}`} 
                className={`w-7 h-7 ${isActive ? '' : 'opacity-70'}`}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  );
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
            body { font-family: 'Poppins', sans-serif; }
            * { box-sizing: border-box; }
        `}</style>
}