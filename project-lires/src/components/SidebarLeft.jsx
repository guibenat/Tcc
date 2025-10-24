import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoLiresImg from '../assets/logo-lires.png';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useSettings } from '../components/SettingsContext'; // <<<--- IMPORTAR O HOOK

// --- Dados do Menu ---
const menuItems = [
  { icon: '../src/assets/aprender.png', label: 'Aprender', id: 'aprender', path: '/home' },
  { icon: '../src/assets/praticar.png', label: 'Alfabeto', id: 'alfabeto', path: '/alfabeto' },
  { icon: '../src/assets/videos.png', label: 'Vídeos', id: 'videos', path: '/videos' },
  { icon: '../src/assets/feed.png', label: 'Feed', id: 'feed', path: '/feed' },
  { icon: '../src/assets/loja.png', label: 'Loja', id: 'loja', path: '/loja' },
  { icon: '../src/assets/perfil.png', label: 'Perfil', id: 'perfil', path: '/perfil' },
  { icon: '../src/assets/ajustes.png', label: 'Ajustes', id: 'ajustes', path: '#' },
];

// --- Componente para o Popup de Ajustes (ALTERADO) ---
// Adicionamos 'theme' como prop para reagir
const SettingsPopup = ({ onClose, onLogout, theme }) => (
  <div className={`
    absolute left-full top-0 z-20 w-52 rounded-2xl shadow-lg border px-4 py-3 flex items-start gap-3
    ${theme === 'escuro' 
      ? 'bg-gray-800 border-gray-700 shadow-purple-900/30' 
      : 'bg-white border-purple-200 shadow-purple-200/30'}
  `}>
    <button
      onClick={onClose}
      className={`pt-1 ${theme === 'escuro' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
      aria-label="Fechar"
    >
      ✕
    </button>
    <nav className="flex flex-col">
      <Link 
        to="/configuracoes" 
        onClick={onClose} 
        className={`block font-bold ${theme === 'escuro' ? 'text-slate-200 hover:text-purple-400' : 'text-slate-800 hover:text-purple-600'}`}
      >
        Configurações
      </Link>
      <a href="#" className={`block font-bold ${theme === 'escuro' ? 'text-slate-200 hover:text-purple-400' : 'text-slate-800 hover:text-purple-600'}`}>Ajuda</a>
      <button
        onClick={onLogout}
        className={`block font-bold text-left ${theme === 'escuro' ? 'text-slate-200 hover:text-purple-400' : 'text-slate-800 hover:text-purple-600'}`}
      >
        Sair
      </button>
    </nav>
  </div>
);


// --- Componente Principal da Sidebar ---
export default function SidebarLeft() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = useSettings(); // <<<--- LER O TEMA DO CONTEXTO

  const handleItemClick = (e, item) => {
    if (item.id === 'ajustes') {
      e.preventDefault();
      setIsSettingsOpen(!isSettingsOpen);
    } else {
      setIsSettingsOpen(false);
    }
  };

  const handleLogout = () => {
    setIsSettingsOpen(false); // Fecha o popup
    Swal.fire({
      title: 'Deseja realmente sair?',
      text: "Você será redirecionado para a tela inicial.",
      icon: 'info',
      iconColor: '#59b1ff',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair!',
      cancelButtonText: 'Cancelar',
      customClass: {
        // Adiciona classes para o tema escuro no SweetAlert
        popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
        title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
        confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
        cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
      },
      buttonsStyling: false,
      // Adiciona cor de fundo para o modo escuro
      background: theme === 'escuro' ? '#1f2937' : '#fff' 
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Saindo...");
        navigate('/');
      }
    });
  };

  return (
    // <<<--- APLICA CLASSES DE TEMA ESCURO AQUI ---
    <aside className={`
      w-48 flex-col p-4 fixed left-0 top-0 h-full hidden lg:flex z-10
      ${theme === 'escuro' ? 'bg-gray-900 border-r border-gray-700' : 'bg-white border-r border-slate-200'}
    `}>
      <style>{`
          .btn-gradient-glow {
              background-image: linear-gradient(90deg, #b081ff, #59b1ff);
              box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
          }
      `}</style>

      <div className="px-2 mb-12 mt-4">
        {/* Inverte a logo no modo escuro para melhor visibilidade */}
        <img 
          src={logoLiresImg} 
          alt="Logo Lires" 
          className={`w-24 ${theme === 'escuro' ? 'invert filter brightness-200' : ''}`} // Ajuste para logo
        />
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path && item.id !== 'ajustes';

          return (
            <div key={item.id} className="relative">
              <Link
                to={item.path || '#'}
                onClick={(e) => handleItemClick(e, item)}
                className={`
                  flex items-center gap-4 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 w-full
                  ${isActive
                    ? 'bg-purple-100 text-purple-700' // O 'ativo' já contrasta bem
                    : (theme === 'escuro'
                        ? 'text-slate-400 hover:bg-gray-700 hover:text-purple-400' // <<<--- MODO ESCURO INATIVO
                        : 'text-slate-500 hover:bg-slate-100 hover:text-purple-600' // Modo Claro Inativo
                      )
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

              {item.id === 'ajustes' && isSettingsOpen && (
                <SettingsPopup
                  onClose={() => setIsSettingsOpen(false)}
                  onLogout={handleLogout}
                  theme={theme} // Passa o tema para o popup
                />
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  );
}