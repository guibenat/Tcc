import React, { useState, useEffect } from "react";
// --- INÍCIO DA MODIFICAÇÃO (useLocation) ---
import { useSettings } from "../components/SettingsContext"; 
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"; 
// --- FIM DA MODIFICAÇÃO ---

// --- Ícones e Imagens ---
import Perfil from "../assets/Perfil.png"; 
import Bandeira from "../assets/Brasil.jpg";
import Foguinho from '../assets/Foguinho.png';
import LcoinIcon from '../assets/lcoin.png';
import CrownIcon from '../assets/Foguinho.png'; 
import SinaisIcon from '../assets/sinaisAprendidosIcon.png'; 
import Aprendizado from "../assets/Aprendizado.png";
import Social from "../assets/Social.png";
import Consistencia from "../assets/Consistencia.png";
import Exploracao from "../assets/Exploração.png";

// Importar os Modais
import { AchievementStatusModal, animations } from './AchievementStatusModal';
import { ObjectivesModal } from './ObjectivesModal'; 

// --- Ícones SVG embutidos (Sem alteração) ---
const UserCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
    <polyline points="17 11 19 13 23 9"/>
  </svg>
);
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
    <line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/>
  </svg>
);
const MessageSquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const MoreHorizontalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
  </svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const BackButton = ({ theme }) => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1); 

    return (
        <button
            onClick={handleBack}
            className={`absolute top-6 left-4 p-2 rounded-full z-10 ${
                theme === 'escuro' 
                ? 'text-gray-200 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-200'
            } transition-colors`}
            aria-label="Voltar"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
};


// --- Função Avatar (Sem alteração) ---
const colorPalette = [
    'f0d3f7', 'c0aede', 'd1d4f9', 'fde047', 'a78bfa',
    '7c3aed', '4ade80', '2dd4bf', 'fb7185', 'f97316'
].join(',');

const getAvatarUrl = (seed, style) => {
    const finalStyle = style || 'bottts-neutral'; 
    if (!seed) {
        return Perfil; 
    }
    return `https://api.dicebear.com/7.x/${finalStyle}/svg?seed=${seed}&radius=50&backgroundColor=${colorPalette}`;
};


// --- Componente ProfileHeader (Sem alteração) ---
const ProfileHeader = ({ theme, user, onEdit }) => ( 
    <div className={`w-full max-w-4xl rounded-3xl p-6 flex justify-center relative shadow-lg ${
        theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-purple-100'
    }`}>
        <div className="bg-gradient-to-b from-purple-200 to-pink-200 p-1 rounded-full relative">
            <img 
                src={getAvatarUrl(user?.avatarSeed || user?.username, user?.avatarStyle)} 
                alt="Avatar" 
                className="h-32 w-32 object-cover rounded-full border-4 border-white bg-white" 
            />
            {onEdit && (
                <button 
                    onClick={onEdit}
                    className="absolute right-0 bottom-0 bg-yellow-300 p-3 rounded-full shadow-md hover:scale-110 transition-transform border-2 border-white cursor-pointer"
                >
                    <span role="img" aria-label="Editar">✏️</span>
                </button>
            )}
        </div>
    </div>
);

// --- Componente UserInfo (Sem alteração) ---
const UserInfo = ({ theme, user, followersCount, followingCount, onShowFollowers, onShowFollowing, isMyProfile }) => {
    
    const memberSince = user ? 
        new Date(user.id).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) 
        : '...';

    const buttonClasses = `flex items-center gap-1.5 transition-opacity hover:opacity-70 ${
        theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'
    }`;
    const numberClasses = `font-bold ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`;

    return (
        <div className="w-full max-w-4xl mt-4 flex flex-col items-center gap-1">
            
            <h1 className={`text-4xl font-bold ${
                theme === 'escuro' ? 'text-slate-100' : 'text-gray-800'
            }`}>
                {user ? user.name : 'Carregando...'}
            </h1>

            <div className="flex items-center gap-2">
                <h2 className={`text-2xl font-semibold ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>
                    @{user ? user.username : '...'}
                </h2>
                {isMyProfile && (
                    <Link 
                        to="/configuracoes/gerenciamento-de-conta"
                        className="text-lg opacity-50 hover:opacity-100 transition-opacity"
                        aria-label="Editar Perfil"
                    >
                        <span role="img" aria-hidden="true">✏️</span>
                    </Link>
                )}
            </div>

            <p className={`${theme === 'escuro' ? 'text-violet-500' : 'text-violet-400'}`}>
                Por aqui desde {memberSince}
            </p>
            
            <div className="flex gap-4 pt-2">
                <button onClick={onShowFollowers} className={buttonClasses}>
                    <span className={numberClasses}>{followersCount}</span>
                    <span>Seguidores</span>
                </button>
                <button onClick={onShowFollowing} className={`${buttonClasses} ml-4`}>
                    <span className={numberClasses}>{followingCount}</span>
                    <span>Seguindo</span>
                </button>
            </div>
        </div>
    );
};

// --- Componente ProfileActions (Sem alteração) ---
const ProfileActions = ({ theme, isFollowing, onToggleFollow, user }) => (
    <div className="w-full max-w-4xl px-4 mt-6">
        <div className="flex items-center justify-center gap-3">
            <button
                onClick={() => onToggleFollow(user)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-lg font-semibold transition-colors ${
                    isFollowing
                    ? (theme === 'escuro' ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' : 'bg-purple-100 text-purple-700 hover:bg-purple-200')
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
            >
                {isFollowing ? <UserCheckIcon /> : <UserPlusIcon />}
                {isFollowing ? 'Seguindo' : 'Seguir'}
            </button>
            
            <button
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-lg font-semibold transition-colors ${
                    theme === 'escuro' 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
                <MessageSquareIcon />
                Mensagem
            </button>
            
            <button
                className={`p-3 rounded-xl transition-colors ${
                    theme === 'escuro' 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
                <MoreHorizontalIcon />
            </button>
        </div>
        <hr className={`w-full mt-6 ${theme === 'escuro' ? 'border-gray-700' : 'border-purple-100'}`} />
    </div>
);

// --- Componente MutualFriends (Sem alteração) ---
const MutualFriends = ({ theme, allUsers, loggedInFollowing, targetUserFollowers }) => {
    const mutuals = loggedInFollowing
        .filter(id => targetUserFollowers.includes(id)) 
        .map(id => allUsers.find(u => u.id === id)) 
        .filter(Boolean); 

    if (mutuals.length === 0) {
        return null; 
    }

    return (
        <div className="w-full max-w-4xl mt-6 px-4">
            <h2 className={`text-2xl font-bold mb-3 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>
                Amizades em Comum ({mutuals.length})
            </h2>
            <div className="flex -space-x-4">
                {mutuals.slice(0, 5).map(user => ( 
                    <img
                        key={user.id}
                        src={getAvatarUrl(user?.avatarSeed || user?.username, user?.avatarStyle)} 
                        alt={user.name}
                        title={user.name}
                        className={`h-12 w-12 object-cover rounded-full border-2 bg-white ${theme === 'escuro' ? 'border-gray-800' : 'border-white'}`}
                    />
                ))}
            </div>
            <hr className={`w-full mt-6 ${theme === 'escuro' ? 'border-gray-700' : 'border-purple-100'}`} />
        </div>
    );
};

// --- Componente CurrentModule (Sem alteração) ---
const CurrentModule = ({ theme, moduleName }) => (
    <div className="w-full max-w-4xl mt-6 px-4">
        <h2 className={`text-2xl font-bold mb-3 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>
            Progresso Atual
        </h2>
        <div className={`p-4 rounded-xl flex items-center gap-4 ${theme === 'escuro' ? 'bg-gray-800' : 'bg-blue-100/70'}`}>
            <ShieldIcon />
            <div>
                <p className={`font-semibold ${theme === 'escuro' ? 'text-gray-400' : 'text-blue-600'}`}>Módulo Atual</p>
                <p className={`text-lg font-bold ${theme === 'escuro' ? 'text-white' : 'text-blue-800'}`}>{moduleName}</p>
            </div>
        </div>
    </div>
);


// --- Componente Achievements (Sem alteração) ---
const Achievements = ({ theme, onShowAchievements }) => (
    <div className="w-full max-w-4xl mt-4 px-4">
        <h2 className={`text-2xl font-bold mb-3 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>Conquistas</h2>
        <button 
            onClick={onShowAchievements} 
            className="w-full flex items-center gap-4 bg-yellow-300 rounded-2xl p-4 shadow-md cursor-pointer hover:bg-yellow-400 transition-colors"
        >
            <img src={CrownIcon} alt="Ícone de Coroa" className="w-12 h-12" />
            <div>
                <p className="font-bold text-yellow-800">NOVA CONQUISTA!</p>
                <span className="text-sm text-yellow-700">Clique para ver mais</span>
            </div>
        </button>
    </div>
);

// --- Componente Stats (Sem alteração) ---
const Stats = ({ theme, streak, signs, lcoins, isMyProfile }) => (
    <div className="w-full max-w-4xl mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className={`text-2xl font-bold ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>Estatísticas</h2>
            {isMyProfile && <ResetButton />} 
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
                <div className={`flex items-center gap-4 rounded-2xl shadow-md p-4 ${
                    theme === 'escuro' 
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-gradient-to-r from-yellow-300 to-yellow-400 border border-yellow-500 text-yellow-900'
                }`}>
                    <img src={Foguinho} alt="Sequência" className="w-10 h-10" />
                    <div>
                        <p className="font-semibold">Sequência</p>
                        <span className="text-2xl font-bold">{streak}</span>
                    </div>
                </div>
                <div className={`flex items-center gap-4 rounded-2xl shadow-md p-4 ${
                    theme === 'escuro' 
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-gradient-to-r from-yellow-300 to-yellow-400 border border-yellow-500 text-yellow-900'
                }`}>
                    <img src={SinaisIcon} alt="Sinais Aprendidos" className="w-10 h-10" />
                    <div>
                        <p className="font-semibold">Sinais aprendidos</p>
                        <span className="text-2xl font-bold">{signs}</span>
                    </div>
                </div>
            </div>

            <div className={`flex flex-col items-center justify-center gap-2 rounded-2xl shadow-md p-4 ${
                theme === 'escuro'
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-gradient-to-r from-violet-400 to-violet-500 border border-violet-600 text-white'
            }`}>
                <img src={LcoinIcon} alt="Lcoins" className="w-12 h-12" />
                <span className="text-3xl font-bold">{lcoins}</span>
                <p className="font-semibold">Lcoins</p>
            </div>
        </div>
        <hr className={`w-full mt-6 ${theme === 'escuro' ? 'border-gray-700' : 'border-purple-100'}`} />
    </div>
);

// Componente do Botão de Reset (Sem alteração)
function ResetButton() {
    const {
        setLcoins,
        setDailyStreak,
        setLessonProgress,
        setTimeSpentToday,
        setLastCompletedTimestamp
    } = useSettings();

    const handleReset = () => {
        if (window.confirm("Você tem certeza que quer resetar todo o seu progresso? (Isso é para debug)")) {
            console.log("--- RESETANDO PROGRESSO ---");
            setLcoins(0);
            setDailyStreak(0);
            setLessonProgress({});
            setTimeSpentToday(0);
            setLastCompletedTimestamp(null);
            window.location.reload();
        }
    };

    return (
        <button
            onClick={handleReset}
            className="text-xs bg-red-500 text-white font-bold py-1 px-3 rounded-full hover:bg-red-700 transition-colors"
            title="Reseta Lcoins, Streak e Progresso de Lições"
        >
            Resetar Progresso (Debug)
        </button>
    );
}

// --- Componente DailyGoal (Sem alteração) ---
const DailyGoal = ({ theme, goalTimeStr, timeSpentDisplay, progressPercent, user }) => (
     <div className="w-full max-w-4xl mt-6 px-4">
        <h2 className={`text-2xl font-bold mb-3 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>Metas</h2>
        <p className={`${theme === 'escuro' ? 'text-violet-500' : 'text-violet-400'} mb-3`}>Sua meta diária</p>
        <div className="flex items-center gap-4 bg-blue-800 text-white rounded-2xl p-4 shadow-lg">
            <img 
                src={getAvatarUrl(user?.avatarSeed || user?.username, user?.avatarStyle)} 
                alt="Avatar Pequeno" 
                className="w-12 h-12 rounded-full border-2 border-blue-400 bg-white"
            />
            <span className="font-semibold">{goalTimeStr}</span>
            <div className="flex-grow h-4 bg-blue-900/70 rounded-full mx-4 overflow-hidden">
                <div 
                    className="h-4 bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
            <span className="font-bold text-lg whitespace-nowrap">
                {timeSpentDisplay} {progressPercent >= 100 ? '✓' : ''}
            </span>
        </div>
    </div>
);


// --- Componente Objectives (Sem alteração) ---
const Objectives = ({ theme, onObjectiveClick, objectivesData }) => {
    return (
        <div className="w-full max-w-4xl mt-6 px-4">
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>Objetivos</h2>
            <div className="space-y-3">
                {objectivesData.map(obj => (
                    <button
                        key={obj.title}
                        onClick={() => onObjectiveClick(obj.title)}
                        className={`w-full flex items-center gap-4 rounded-2xl p-3 shadow-sm transition-colors duration-200 ${
                            theme === 'escuro' 
                            ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' 
                            : 'bg-blue-100/70 border border-blue-200 hover:bg-blue-200/80 hover:border-blue-300'
                        }`}
                    >
                        <img src={obj.icon} alt={obj.title} className="w-10 h-10" />
                        <span className={`font-bold ${theme === 'escuro' ? 'text-blue-300' : 'text-blue-800'}`}>{obj.title}</span>
                        <span className={`ml-auto font-semibold ${theme === 'escuro' ? 'text-blue-400' : 'text-blue-600'}`}>
                            {obj.completed}/{obj.total}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};


// --- Componente UserListModal (Sem alteração) ---
const UserListModal = ({ 
    isOpen, onClose, title, users, theme, onToggleFollow, currentUserId,
    allUsers = [], 
    followingList = [] 
}) => {
    if (!isOpen) return null;

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const suggestions = allUsers.filter(
        user => !followingList.includes(user.id) && user.id !== currentUserId
    ).slice(0, 5); 

    const searchResults = searchTerm
        ? allUsers.filter(
            user => user.username.toLowerCase().includes(searchTerm.toLowerCase().replace('@', '')) && user.id !== currentUserId
          )
        : [];

    // --- Componente de Linha de Usuário ---
    const RenderUserRow = ({ user }) => {
        const isCurrentUser = user.id === currentUserId;
        const isFollowing = followingList.includes(user.id);
        
        const handleUserClick = () => {
            navigate(`/usuario/${user.username}`); 
            onClose(); 
        };

        return (
            <div key={user.id} className="flex items-center justify-between p-4">
                <button 
                    onClick={handleUserClick} 
                    className="flex items-center gap-3 group"
                >
                    <img 
                        src={getAvatarUrl(user?.avatarSeed || user?.username, user?.avatarStyle)} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full bg-white"
                    />
                    <div>
                        <p className="font-semibold group-hover:underline">{user.name}</p>
                        <p className={`text-sm ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}`}>
                            @{user.username}
                        </p>
                    </div>
                </button>
                
                {!isCurrentUser && (
                    <button 
                        onClick={() => onToggleFollow(user)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                            isFollowing
                            ? (theme === 'escuro' ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' : 'bg-purple-100 text-purple-700 hover:bg-purple-200')
                            : 'bg-purple-500 text-white hover:bg-purple-600'
                        }`}
                    >
                        {isFollowing ? 'Seguindo' : 'Seguir'}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={onClose} 
        >
            <div 
                className={`w-full max-w-md rounded-2xl shadow-xl flex flex-col ${
                    theme === 'escuro' ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'
                }`}
                onClick={e => e.stopPropagation()} 
            >
                {/* --- Cabeçalho --- */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-purple-500">{title}</h3>
                    <button 
                        onClick={onClose}
                        className={`text-2xl font-bold transition-colors ${
                            theme === 'escuro' ? 'text-gray-500 hover:text-gray-200' : 'text-gray-400 hover:text-gray-800'
                        }`}
                    >
                        &times;
                    </button>
                </div>

                {/* --- Barra de Busca (Apenas no modal "Seguindo") --- */}
                {title === 'Seguindo' && (
                    <div className="p-4 border-b">
                        <input
                            type="text"
                            placeholder="Procurar por @username..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className={`w-full p-2 rounded-lg border ${
                                theme === 'escuro' 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500' 
                                : 'bg-gray-100 border-gray-300 text-black focus:ring-purple-500 focus:border-purple-500'
                            }`}
                        />
                    </div>
                )}

                {/* --- Área de Lista Rolável --- */}
                <div className="max-h-96 overflow-y-auto">
                    
                    {searchTerm && (
                        <>
                            <h4 className={`p-3 text-sm font-semibold sticky top-0 ${theme === 'escuro' ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>Resultados da Busca</h4>
                            {searchResults.length > 0
                                ? searchResults.map(user => <RenderUserRow key={user.id} user={user} />)
                                : <p className={`p-4 text-center ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}`}>Nenhum resultado encontrado.</p>}
                        </>
                    )}

                    {!searchTerm && (
                        <>
                            {users.length > 0
                                ? users.map(user => <RenderUserRow key={user.id} user={user} />)
                                : (
                                    <p className={`p-4 text-center ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {title === 'Seguidores' ? 'Nenhum seguidor para mostrar.' : 'Você ainda não segue ninguém.'}
                                    </p>
                                )
                            }
                            
                            {title === 'Seguindo' && (
                                <>
                                    <h4 className={`p-3 text-sm font-semibold sticky top-0 ${theme === 'escuro' ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>Sugestões</h4>
                                    {suggestions.length > 0
                                        ? suggestions.map(user => <RenderUserRow key={user.id} user={user} />)
                                        : <p className={`p-4 text-center ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}`}>Nenhuma sugestão. (Crie outra conta para testar!)</p>}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Componente Principal (UserProfile) ---
export default function UserProfile() {
 
  const { 
    theme, 
    followers: loggedInFollowers, 
    following: loggedInFollowing, 
    setFollowers, 
    setFollowing,
    dailyStreak,
    lcoins,
    lessonProgress,
    onboardingSelections, 
    timeSpentToday 
  } = useSettings();
  
  const { username } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation(); // <-- Pega a localização
  const [isMyProfile, setIsMyProfile] = useState(true); 

  const [animationClass, setAnimationClass] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); 
  const [loggedInUser, setLoggedInUser] = useState(null); 
  
  const [showAchievements, setShowAchievements] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    users: []
  });
  const [objectivesModalData, setObjectivesModalData] = useState({
    isOpen: false,
    title: '',
    objectives: []
  });

  const signsLearned = Object.values(lessonProgress || {}).reduce((acc, lesson) => {
      return acc + (lesson.completed || 0); 
  }, 0);

  const goalTimeStr = onboardingSelections?.time || '10min/dia';
  const goalMinutes = parseInt(goalTimeStr) || 10;
  const progressPercent = Math.min((timeSpentToday / goalMinutes) * 100, 100);
  const timeSpentDisplay = `${Math.round(timeSpentToday)}min`;

  // useEffect dinâmico (Carrega o perfil correto)
  useEffect(() => {
    setAnimationClass('anim-enter');
    const dbUsers = JSON.parse(localStorage.getItem('LiresUsersDB')) || []; 
    setAllUsers(dbUsers); 
    
    const userString = localStorage.getItem('currentUser');
    if (!userString) {
        navigate('/login'); 
        return;
    }
    const localLoggedInUser = JSON.parse(userString);
    setLoggedInUser(localLoggedInUser);

    if (username && username !== localLoggedInUser.username) {
        setIsMyProfile(false);
        const userToView = dbUsers.find(u => u.username === username);
        
        if (userToView) {
            const mockData = {
                streak: userToView.username === 'caua0001' ? 1 : 12, 
                lcoins: userToView.username === 'caua0001' ? 50 : 150,
                signsLearned: userToView.username === 'caua0001' ? 3 : 25,
                currentModule: "Módulo 1: Começar do Zero"
            };
            setCurrentUser({ ...userToView, ...mockData });
        } else {
            console.error("Usuário não encontrado, voltando para o seu perfil.");
            navigate('/perfil');
        }
    } else {
        setIsMyProfile(true);
        setCurrentUser({
            ...localLoggedInUser,
            streak: dailyStreak,
            lcoins: lcoins,
            signsLearned: signsLearned,
            currentModule: "Módulo 1: Começar do Zero"
        });
    }
  }, [username, navigate, dailyStreak, lcoins, lessonProgress, location]); 
  

  // Funções de Follow/Unfollow (Sem alteração)
  const handleShowFollowers = () => {
    const userFollowers = currentUser?.followers || [];
    const followersData = userFollowers
        .map(id => allUsers.find(u => u.id === id))
        .filter(Boolean) 
        .map(user => ({ ...user, isFollowing: loggedInFollowing.includes(user.id) })); 
    setModalState({ isOpen: true, title: 'Seguidores', users: followersData });
  };
  const handleShowFollowing = () => {
    const userFollowing = currentUser?.following || [];
    const followingData = userFollowing
        .map(id => allUsers.find(u => u.id === id))
        .filter(Boolean)
        .map(user => ({ ...user, isFollowing: loggedInFollowing.includes(user.id) })); 
    setModalState({ isOpen: true, title: 'Seguindo', users: followingData });
  };
  const handleCloseModal = () => {
    setModalState({ isOpen: false, title: '', users: [] });
  };

  const handleToggleFollow = (targetUser) => {
    if (!loggedInUser) return;

    const currentUserId = loggedInUser.id; 
    const targetUserId = targetUser.id;
    
    const amIFollowing = loggedInFollowing.includes(targetUserId); 
    let newFollowingList; 
    
    const updatedAllUsers = allUsers.map(user => {
        if (user.id === currentUserId) {
            if (amIFollowing) {
                newFollowingList = user.following.filter(id => id !== targetUserId);
            } else {
                newFollowingList = [...user.following, targetUserId];
            }
            localStorage.setItem('currentUser', JSON.stringify({ ...user, following: newFollowingList }));
            setLoggedInUser({ ...user, following: newFollowingList }); 
            return { ...user, following: newFollowingList };
        }
        if (user.id === targetUserId) {
            let newFollowersList;
            if (amIFollowing) {
                newFollowersList = user.followers.filter(id => id !== currentUserId);
            } else {
                newFollowersList = [...user.followers, currentUserId];
            }
            return { ...user, followers: newFollowersList };
        }
        return user;
    });

    localStorage.setItem('LiresUsersDB', JSON.stringify(updatedAllUsers)); 
    setAllUsers(updatedAllUsers);
    setFollowing(newFollowingList); 

    setCurrentUser(prevUser => ({
        ...prevUser,
        ...updatedAllUsers.find(u => u.id === prevUser.id)
    }));
    
    if (modalState.title === 'Seguindo') {
        const userFollowing = updatedAllUsers.find(u => u.id === currentUser.id)?.following || [];
        const newFollowingData = userFollowing
            .map(id => updatedAllUsers.find(u => u.id === id))
            .filter(Boolean)
            .map(user => ({ ...user, isFollowing: newFollowingList.includes(user.id) }));
        
        setModalState(prevState => ({
            ...prevState,
            users: newFollowingData
        }));
    }
    else if (modalState.title === 'Seguidores') {
        const userFollowers = updatedAllUsers.find(u => u.id === currentUser.id)?.followers || [];
        if (isMyProfile) {
            setFollowers(userFollowers);
        }

        const followersData = userFollowers
            .map(id => updatedAllUsers.find(u => u.id === id))
            .filter(Boolean) 
            .map(user => ({ ...user, isFollowing: newFollowingList.includes(user.id) }));
        
        setModalState(prevState => ({
            ...prevState,
            users: followersData
        }));
    }
  };

  // --- Lógica dos Objetivos (Sem alteração) ---
  const allObjectives = {
    'Aprendizado': [
        { id: 'aprend_1', description: 'Aprenda 3 sinais', reward: 25, isCompleted: () => signsLearned >= 3 },
        { id: 'aprend_2', description: 'Aprenda 10 sinais', reward: 50, isCompleted: () => signsLearned >= 10 },
        { id: 'aprend_3', description: 'Complete a lição "Começar do Zero"', reward: 50, isCompleted: () => (lessonProgress['comecar-do-zero']?.completed || 0) >= 3 },
    ],
    'Social': [
        { id: 'social_1', description: 'Siga 1 pessoa', reward: 25, isCompleted: () => loggedInFollowing.length >= 1 },
        { id: 'social_2', description: 'Siga 5 pessoas', reward: 50, isCompleted: () => loggedInFollowing.length >= 5 },
        { id: 'social_3', description: 'Tenha 1 seguidor', reward: 50, isCompleted: () => loggedInFollowers.length >= 1 },
    ],
    'Consistencia': [
        { id: 'consist_1', description: 'Mantenha uma sequência de 1 dia', reward: 25, isCompleted: () => dailyStreak >= 1 },
        { id: 'consist_2', description: 'Mantenha uma sequência de 3 dias', reward: 50, isCompleted: () => dailyStreak >= 3 },
        { id: 'consist_3', description: 'Mantenha uma sequência de 7 dias', reward: 100, isCompleted: () => dailyStreak >= 7 },
    ],
    'Exploracao': [
        { id: 'explor_1', description: 'Complete a configuração inicial', reward: 25, isCompleted: () => !!onboardingSelections?.time },
        { id: 'explor_2', description: 'Acesse o Alfabeto', reward: 25, isCompleted: () => false }, 
        { id: 'explor_3', description: 'Assista um vídeo', reward: 25, isCompleted: () => false }, 
    ],
  };
  const objectivesData = [
    { title: "Aprendizado", icon: Aprendizado },
    { title: "Social", icon: Social },
    { title: "Consistencia", icon: Consistencia },
    { title: "Exploracao", icon: Exploracao },
  ].map(category => {
    const tasks = allObjectives[category.title];
    const completedTasks = tasks.filter(task => task.isCompleted()).length;
    return {
        ...category,
        completed: completedTasks,
        total: tasks.length,
    };
  });
  const handleObjectiveClick = (title) => {
    const tasks = allObjectives[title].map(task => ({
        ...task,
        completed: task.isCompleted(),
    }));
    setObjectivesModalData({
        isOpen: true,
        title: `Objetivos de ${title}`,
        objectives: tasks,
    });
  };
  const handleCloseObjectivesModal = () => {
    setObjectivesModalData({ isOpen: false, title: '', objectives: [] });
  };
  
  // --- Fim da Lógica dos Objetivos ---

  // Se o usuário ainda não foi carregado, mostra um loader
  if (!currentUser || !loggedInUser) {
    return <div className="w-full h-screen flex items-center justify-center">Carregando perfil...</div>
  }

  return (
    <>
        <main className={`relative flex flex-col items-center p-0 sm:p-0 gap-6 w-full max-w-4xl mx-auto content-box ${animationClass}`}> 
            
            {!isMyProfile && <BackButton theme={theme} />}

            <ProfileHeader 
                theme={theme} 
                user={currentUser} 
                onEdit={isMyProfile ? () => navigate('/configuracoes/gerenciamento-de-conta') : null}
            />
            <UserInfo 
                theme={theme} 
                user={currentUser} 
                followersCount={currentUser?.followers?.length || 0}
                followingCount={currentUser?.following?.length || 0}
                onShowFollowers={handleShowFollowers}
                onShowFollowing={handleShowFollowing}
                isMyProfile={isMyProfile}
            />
            
            {isMyProfile ? (
                // --- SE FOR O MEU PERFIL ---
                <>
                    <Achievements 
                        theme={theme} 
                        onShowAchievements={() => setShowAchievements(true)}
                    />
                    
                    <Stats 
                        theme={theme}
                        streak={dailyStreak}
                        signs={signsLearned}
                        lcoins={lcoins}
                        isMyProfile={isMyProfile}
                    />

                    <DailyGoal 
                        theme={theme}
                        goalTimeStr={goalTimeStr}
                        timeSpentDisplay={timeSpentDisplay}
                        progressPercent={progressPercent}
                        user={currentUser} 
                    />

                    <Objectives 
                        theme={theme} 
                        objectivesData={objectivesData}
                        onObjectiveClick={handleObjectiveClick}
                    />
                </>
            ) : (
                // --- SE FOR O PERFIL DE OUTRA PESSOA ---
                <>
                    <ProfileActions
                        theme={theme}
                        isFollowing={loggedInFollowing.includes(currentUser.id)}
                        onToggleFollow={handleToggleFollow}
                        user={currentUser}
                    />

                    <MutualFriends
                        theme={theme}
                        allUsers={allUsers}
                        loggedInFollowing={loggedInFollowing}
                        targetUserFollowers={currentUser.followers}
                    />
                    
                    <Stats 
                        theme={theme}
                        streak={currentUser.streak}
                        signs={currentUser.signsLearned}
                        lcoins={currentUser.lcoins}
                        isMyProfile={isMyProfile}
                    />

                    <CurrentModule
                        theme={theme}
                        moduleName={currentUser.currentModule}
                    />
                </>
            )}

        </main>

        {/* Modal de Lista de Usuários (Followers/Following) */}
        <UserListModal
            isOpen={modalState.isOpen}
            onClose={handleCloseModal}
            title={modalState.title}
            users={modalState.users}
            theme={theme}
            onToggleFollow={handleToggleFollow}
            currentUserId={loggedInUser ? loggedInUser.id : null}
            allUsers={allUsers} 
            followingList={loggedInFollowing} 
        />

        {/* Modal de Conquistas (Cadeados) */}
        {showAchievements && (
            <div className="fixed inset-0 z-50">
                <style>{animations}</style>
                <AchievementStatusModal
                    onClose={() => setShowAchievements(false)}
                />
            </div>
        )}

        {/* Modal de Objetivos (Tarefas) */}
        <ObjectivesModal
            isOpen={objectivesModalData.isOpen}
            onClose={handleCloseObjectivesModal}
            title={objectivesModalData.title}
            objectives={objectivesModalData.objectives}
            theme={theme}
        />
    </>
  );
}