import React, { useState, useEffect } from 'react'; 
// Puxo o contexto para saber o tema
import { useSettings } from '../components/SettingsContext'; 
// Puxo o Link (para navegar) e o useLocation (para saber qual link está ativo)
import { Link, useLocation } from 'react-router-dom';

// --- Ícones ---
// Importo o 'Perfil.png' como um fallback (plano B)
import Perfil from '../assets/Perfil.png'; 
// Importo todos os ícones da barra de navegação
import aprenderIcon from '../assets/aprender.png';
import praticarIcon from '../assets/praticar.png';
import videosIcon from '../assets/videos.png';
import feedIcon from '../assets/feed.png';
import lojaIcon from '../assets/loja.png';
import perfilIcon from '../assets/perfil.png'; // Mesmo que eu vá usar o avatar, é bom ter
import ajustesIcon from '../assets/ajustes.png';


/**
 * Helper: getAvatarUrl
 * Função que gera a URL do avatar do usuário usando a API do DiceBear.
 * Isso me permite ter avatares únicos baseados no nome de usuário (seed).
 */
// Paleta de cores para o fundo do avatar
const colorPalette = [
    'f0d3f7', 'c0aede', 'd1d4f9', 'fde047', 'a78bfa',
    '7c3aed', '4ade80', '2dd4bf', 'fb7185', 'f97316'
].join(',');

const getAvatarUrl = (seed, style) => {
    const finalStyle = style || 'bottts-neutral'; // O estilo padrão é 'bottts-neutral' (robô)
    
    // Se o usuário não tiver uma seed (ex: não logado), uso o 'Perfil.png' padrão
    if (!seed) {
        return Perfil; 
    }
    // Monto a URL da API
    return `https://api.dicebear.com/7.x/${finalStyle}/svg?seed=${seed}&radius=50&backgroundColor=${colorPalette}`;
};


// "Banco de dados" dos itens do menu.
// Usar as variáveis importadas (ex: aprenderIcon) é mais limpo do que strings de path.
const menuItems = [
    { icon: aprenderIcon, label: 'Aprender', id: 'aprender', path: '/home' }, 
    { icon: praticarIcon, label: 'Alfabeto', id: 'alfabeto', path: '/alfabeto' }, 
    { icon: videosIcon, label: 'Vídeos', id: 'videos', path: '/videos' }, 
    { icon: feedIcon, label: 'Feed', id: 'feed', path: '/feed' }, 
    { icon: lojaIcon, label: 'Loja', id: 'loja', path: '/loja' }, 
    { icon: perfilIcon, label: 'Perfil', id: 'perfil', path: '/perfil' }, // O ícone aqui não é usado se a lógica do avatar funcionar
    { icon: ajustesIcon, label: 'Ajustes', id: 'ajustes', path: '/configuracoes' }, 
];


/**
 * Componente Principal: MobileBottomBar
 * Esta é a barra de navegação que aparece embaixo da tela em dispositivos móveis (lg:hidden).
 */
export default function MobileBottomBar() {
    const location = useLocation(); // Hook para saber a URL atual (ex: "/home")
    const { theme } = useSettings(); // Puxo o tema (escuro/claro)

    // Crio um estado para guardar a URL do avatar. 
    // Começa com o 'Perfil.png' padrão.
    const [avatarUrl, setAvatarUrl] = useState(Perfil); 

    /**
     * useEffect para carregar o avatar dinâmico.
     * Roda toda vez que o usuário muda de página (location.pathname muda).
     * Isso garante que se o usuário trocar o avatar no perfil,
     * o ícone aqui na barra atualize assim que ele navegar para outra página.
     */
    useEffect(() => {
        // 1. Puxo o usuário logado do localStorage
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            // 2. Faço o parse do JSON
            const user = JSON.parse(userString);
            // 3. Chamo meu helper para gerar a URL do avatar
            const newAvatarUrl = getAvatarUrl(
                user?.avatarSeed || user?.username, // Uso a seed, ou o username como fallback
                user?.avatarStyle // Uso o estilo salvo
            );
            // 4. Salvo a URL no estado, o que vai fazer o componente renderizar de novo
            setAvatarUrl(newAvatarUrl);
        } else {
            // Se não tiver usuário (deslogado), garanto que o avatar seja o padrão
            setAvatarUrl(Perfil);
        }
    }, [location.pathname]); // Dependência: Roda de novo se o path mudar

    return (
        // Barra de navegação 'fixed' no 'bottom-0'. 'lg:hidden' esconde ela em telas grandes.
        <nav className={`
            lg:hidden fixed bottom-0 left-0 right-0 h-20 z-40
            ${theme === 'escuro' 
                ? 'bg-gray-900 border-t-2 border-gray-700' 
                : 'bg-white border-t-2 border-slate-200'}
        `}>
            {/* Div que centraliza e espaça os ícones */}
            <div className="max-w-screen-xl mx-auto h-full flex justify-around items-center px-2">
                
                {/* Faço um loop no meu array 'menuItems' */}
                {menuItems.map((item) => {
                    // Verifico se o path do item é o mesmo da URL atual
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.id}
                            to={item.path || '#'} 
                            // Classes de estilo dinâmicas (cor ativa/inativa)
                            className={`
                                flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors duration-200 w-16
                                ${isActive 
                                    ? (theme === 'escuro' ? 'text-purple-400' : 'text-purple-600') // Cor ativa
                                    : (theme === 'escuro' ? 'text-slate-400 hover:text-purple-400' : 'text-slate-500 hover:text-purple-600') // Cor inativa
                                }`
                            }
                        >
                            {/* --- A MÁGICA DO AVATAR --- */}
                            {/* Se o item for o 'perfil', eu uso o avatar do estado... */}
                            {item.id === 'perfil' ? (
                                <img
                                    src={avatarUrl} // <-- URL dinâmica do estado
                                    alt="Avatar"
                                    className={`
                                        w-8 h-8 rounded-full bg-white
                                        ${isActive ? 'scale-110' : ''}
                                    `}
                                />
                            ) : (
                                /* ...senão, eu uso o ícone padrão do 'menuItems' */
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
                            {/* --- FIM DA LÓGICA DO AVATAR --- */}
                            
                            {/* O texto (ex: "Aprender") */}
                            <span className="text-xs font-bold">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}