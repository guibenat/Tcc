import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// --- Contexto e Assets ---
import { useSettings } from '../components/SettingsContext'; 
// Logos
import logoLiresClaraImg from '../assets/logo-lires.png'; 
import logoLiresEscuraImg from '../assets/logo-lires-branca.png'; 
// Imagem Padrão do Perfil
import Perfil from '../assets/Perfil.png'; 
// Ícones do Menu
import aprenderIcon from '../assets/aprender.png';
import praticarIcon from '../assets/praticar.png';
import videosIcon from '../assets/videos.png';
import feedIcon from '../assets/feed.png';
import lojaIcon from '../assets/loja.png';
import perfilIcon from '../assets/perfil.png'; // Usado como fallback no array
import ajustesIcon from '../assets/ajustes.png';

/**
 * Helper: getAvatarUrl
 * Função que gera a URL do avatar do usuário usando a API do DiceBear.
 */
const colorPalette = [
    'f0d3f7', 'c0aede', 'd1d4f9', 'fde047', 'a78bfa',
    '7c3aed', '4ade80', '2dd4bf', 'fb7185', 'f97316'
].join(',');

const getAvatarUrl = (seed, style) => {
    const finalStyle = style || 'bottts-neutral'; // Padrão é robô
    // Se não tiver seed (usuário deslogado), retorna o 'Perfil.png' padrão
    if (!seed) {
        return Perfil; 
    }
    return `https://api.dicebear.com/7.x/${finalStyle}/svg?seed=${seed}&radius=50&backgroundColor=${colorPalette}`;
};

// "Banco de dados" dos itens do menu (com os ícones importados)
const menuItems = [
  { icon: aprenderIcon, label: 'Aprender', id: 'aprender', path: '/home' },
  { icon: praticarIcon, label: 'Alfabeto', id: 'alfabeto', path: '/alfabeto' },
  { icon: videosIcon, label: 'Vídeos', id: 'videos', path: '/videos' },
  { icon: feedIcon, label: 'Feed', id: 'feed', path: '/feed' },
  { icon: lojaIcon, label: 'Loja', id: 'loja', path: '/loja' },
  { icon: perfilIcon, label: 'Perfil', id: 'perfil', path: '/perfil' },
  { icon: ajustesIcon, label: 'Ajustes', id: 'ajustes', path: '#' }, // '#' pois ele abre um pop-up, não navega
];

/**
 * Componente: SettingsPopup
 * É o pop-up que abre ao clicar em "Ajustes".
 * Ele reage ao tema.
 */
const SettingsPopup = ({ onClose, onLogout, theme }) => (
  <div className={`
    absolute left-full top-0 z-20 w-52 rounded-2xl shadow-lg border px-4 py-3 flex items-start gap-3
    ${theme === 'escuro' 
      ? 'bg-gray-800 border-gray-700 shadow-purple-900/30' 
      : 'bg-white border-purple-200 shadow-purple-200/30'}
  `}>
    {/* Botão de Fechar (X) */}
    <button
      onClick={onClose}
      className={`pt-1 ${theme === 'escuro' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
      aria-label="Fechar"
    >
      ✕
    </button>
    {/* Links de navegação */}
    <nav className="flex flex-col">
      <Link 
        to="/configuracoes" 
        onClick={onClose} // Fecha o pop-up ao navegar
        className={`block font-bold ${theme === 'escuro' ? 'text-slate-200 hover:text-purple-400' : 'text-slate-800 hover:text-purple-600'}`}
      >
        Configurações
      </Link>
      <a href="#" className={`block font-bold ${theme === 'escuro' ? 'text-slate-200 hover:text-purple-400' : 'text-slate-800 hover:text-purple-600'}`}>Ajuda</a>
      <button
        onClick={onLogout} // Chama a função de logout (que tem o pop-up de confirmação)
        className={`block font-bold text-left ${theme === 'escuro' ? 'text-slate-200 hover:text-purple-400' : 'text-slate-800 hover:text-purple-600'}`}
      >
        Sair
      </button>
    </nav>
  </div>
);


/**
 * Componente Principal: SidebarLeft
 * Esta é a barra de navegação lateral fixa, visível apenas em desktop (lg:flex).
 */
export default function SidebarLeft() {
  const location = useLocation(); // Para saber qual link está ativo
  const navigate = useNavigate(); // Para o logout
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Controla o pop-up
  const { theme } = useSettings(); // Puxa o tema

  // Estado para o avatar dinâmico
  const [avatarUrl, setAvatarUrl] = useState(Perfil); 

  /**
   * useEffect para carregar o avatar do usuário.
   * Roda toda vez que a 'location' (URL) muda.
   */
  useEffect(() => {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user = JSON.parse(userString);
      // Gera a URL do avatar com a seed e o estilo salvos
      setAvatarUrl(getAvatarUrl(user?.avatarSeed || user?.username, user?.avatarStyle));
    } else {
      // Se deslogou, volta pro avatar padrão
      setAvatarUrl(Perfil);
    }
  }, [location]); // Dependência: 'location' (muda em login/logout)

  /**
   * Lida com o clique nos itens do menu.
   * Se for "Ajustes", ele abre/fecha o pop-up.
   * Se for qualquer outro, ele fecha o pop-up (caso esteja aberto).
   */
  const handleItemClick = (e, item) => {
    if (item.id === 'ajustes') {
      e.preventDefault(); // Impede o <Link> de navegar para '#'
      setIsSettingsOpen(!isSettingsOpen);
    } else {
      setIsSettingsOpen(false);
    }
  };

  /**
   * Lida com o logout.
   * 1. Fecha o pop-up de Ajustes.
   * 2. Mostra o pop-up de confirmação (Swal).
   * 3. Se confirmar, limpa o 'currentUser' e recarrega a página no '/'.
   */
  const handleLogout = () => {
    setIsSettingsOpen(false); 
    Swal.fire({
      title: 'Deseja realmente sair?',
      text: "Você será redirecionado para a tela inicial.",
      icon: 'info',
      iconColor: '#59b1ff',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair!',
      cancelButtonText: 'Cancelar',
      customClass: { // Estiliza o Swal para o tema
        popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
        title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
        confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
        cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
      },
      buttonsStyling: false,
      background: theme === 'escuro' ? '#1f2937' : '#fff' 
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Saindo e limpando sessão...");
        // Limpa o usuário logado
        localStorage.removeItem('currentUser');
        // Dou um refresh completo na página para '/'.
        // Isso garante que o SettingsContext e tudo mais seja resetado.
        window.location.href = '/'; 
      }
    });
  };

  return (
    // Container da Sidebar
    <aside className={`
      w-48 flex-col p-4 fixed left-0 top-0 h-full hidden lg:flex z-10
      ${theme === 'escuro' ? 'bg-gray-900 border-r border-gray-700' : 'bg-white border-r border-slate-200'}
    `}>
      {/* CSS para o botão gradiente do Swal */}
      <style>{`
          .btn-gradient-glow {
            background-image: linear-gradient(90deg, #b081ff, #59b1ff);
            box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
          }
      `}</style>

      {/* Logo (muda com o tema) */}
      <div className="px-2 mb-12 mt-4">
        <img 
          src={theme === 'escuro' ? logoLiresEscuraImg : logoLiresClaraImg} 
          alt="Logo Lires" 
          className="w-24" 
        />
      </div>

      {/* Navegação principal */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          // 'isActive' checa se o path da URL é o mesmo do item.
          // Ignoro o 'ajustes' para ele nunca ficar "ativo".
          const isActive = location.pathname === item.path && item.id !== 'ajustes';

          return (
            <div key={item.id} className="relative"> {/* 'relative' para o pop-up */}
              <Link
                to={item.path || '#'}
                onClick={(e) => handleItemClick(e, item)}
                // Classes dinâmicas de "ativo" e "inativo" baseadas no tema
                className={`
                  flex items-center gap-4 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 w-full
                  ${isActive
                    ? 'bg-purple-100 text-purple-700' // Estilo Ativo (Claro) - O modo escuro vai sobrescrever
                    : (theme === 'escuro'
                        ? 'text-slate-400 hover:bg-gray-700 hover:text-purple-400' // Inativo (Escuro)
                        : 'text-slate-500 hover:bg-slate-100 hover:text-purple-600' // Inativo (Claro)
                      )
                  }
                  ${theme === 'escuro' && isActive ? '!bg-purple-800 !text-purple-300' : ''} // Sobrescreve o Ativo (Escuro)
                `}
              >
                {/* --- Lógica do Avatar Dinâmico --- */}
                {item.id === 'perfil' ? (
                  // Se for 'perfil', usa o 'avatarUrl' do estado
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className={`w-7 h-7 rounded-full bg-white ${isActive ? '' : 'opacity-90'}`}
                  />
                ) : (
                  // Senão, usa o 'item.icon' padrão
                  <img
                    src={item.icon}
                    alt={`Ícone de ${item.label}`}
                    className={`w-7 h-7 ${isActive ? '' : 'opacity-70'}`}
                  />
                )}
                {/* --- Fim da Lógica do Avatar --- */}

                <span>{item.label}</span>
              </Link>

              {/* Renderiza o pop-up de Ajustes se (id === 'ajustes' E isSettingsOpen === true) */}
              {item.id === 'ajustes' && isSettingsOpen && (
                <SettingsPopup
                  onClose={() => setIsSettingsOpen(false)}
                  onLogout={handleLogout}
                  theme={theme}
                />
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  );
}