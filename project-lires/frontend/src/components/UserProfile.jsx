import React, { useState, useEffect } from "react";
import { useSettings } from "./SettingsContext"; 
import { Link } from "react-router-dom"; 

// --- Ícones e Imagens ---
import Perfil from "../assets/Perfil.png";
import Bandeira from "../assets/Brasil.jpg";
import Foguinho from '../assets/Foguinho.png';
import LcoinIcon from '../assets/lcoin.png';
import CrownIcon from '../assets/Foguinho.png'; // Usando placeholder
import SinaisIcon from '../assets/sinaisAprendidosIcon.png'; 
import Aprendizado from "../assets/Aprendizado.png";
import Social from "../assets/Social.png";
import Consistencia from "../assets/Consistencia.png";
import Exploracao from "../assets/Exploração.png";


// --- Componente ProfileHeader (Sem alterações) ---
const ProfileHeader = ({ theme }) => (
    <div className={`w-full max-w-4xl rounded-3xl p-6 flex justify-center relative shadow-lg ${
        theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-purple-100'
    }`}>
        <div className="bg-gradient-to-b from-purple-200 to-pink-200 p-1 rounded-full relative">
            <img src={Perfil} alt="Avatar" className="h-32 w-32 object-cover rounded-full border-4 border-white" />
            <button className="absolute right-0 bottom-0 bg-yellow-300 p-3 rounded-full shadow-md hover:scale-110 transition-transform border-2 border-white">
                <span role="img" aria-label="Editar">✏️</span>
            </button>
        </div>
    </div>
);

// --- Componente UserInfo (Sem alterações) ---
const UserInfo = ({ theme, user, followersCount, followingCount, onShowFollowers, onShowFollowing }) => {
    
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
                <Link 
                    to="/configuracoes/gerenciamento-de-conta"
                    className="text-lg opacity-50 hover:opacity-100 transition-opacity"
                    aria-label="Editar Perfil"
                >
                    <span role="img" aria-hidden="true">✏️</span>
                </Link>
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
            <hr className={`w-full mt-4 ${theme === 'escuro' ? 'border-gray-700' : 'border-purple-100'}`} />
        </div>
    );
};

// --- Componente Achievements (Sem alterações) ---
const Achievements = ({ theme }) => (
    <div className="w-full max-w-4xl mt-4">
        <h2 className={`text-2xl font-bold mb-3 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>Conquistas</h2>
        <div className="flex items-center gap-4 bg-yellow-300 rounded-2xl p-4 shadow-md cursor-pointer hover:bg-yellow-400 transition-colors">
            <img src={CrownIcon} alt="Ícone de Coroa" className="w-12 h-12" />
            <div>
                <p className="font-bold text-yellow-800">NOVA CONQUISTA!</p>
                <span className="text-sm text-yellow-700">Clique para ver mais</span>
            </div>
        </div>
    </div>
);

// --- Componente Stats (Sem alterações) ---
const Stats = ({ theme, streak, signs, lcoins }) => (
    <div className="w-full max-w-4xl mt-6">
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>Estatísticas</h2>
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
    </div>
);


// --- INÍCIO DA MODIFICAÇÃO (Componente DailyGoal) ---
// Agora recebe props dinâmicas
const DailyGoal = ({ theme, goalTimeStr, timeSpentDisplay, progressPercent }) => (
     <div className="w-full max-w-4xl mt-6">
        <h2 className={`text-2xl font-bold mb-3 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>Metas</h2>
        <p className={`${theme === 'escuro' ? 'text-violet-500' : 'text-violet-400'} mb-3`}>Sua meta diária</p>
        <div className="flex items-center gap-4 bg-blue-800 text-white rounded-2xl p-4 shadow-lg">
            <img src={Perfil} alt="Avatar Pequeno" className="w-12 h-12 rounded-full border-2 border-blue-400"/>
            {/* Meta (ex: 10min por dia) */}
            <span className="font-semibold">{goalTimeStr}</span>
            <div className="flex-grow h-4 bg-blue-900/70 rounded-full mx-4 overflow-hidden">
                {/* Barra de Progresso (ex: 50%) */}
                <div 
                    className="h-4 bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
            {/* Tempo gasto (ex: 5min) */}
            <span className="font-bold text-lg whitespace-nowrap">
                {timeSpentDisplay} {progressPercent >= 100 ? '✓' : ''}
            </span>
        </div>
    </div>
);
// --- FIM DA MODIFICAÇÃO ---


// --- Componente Objectives (Sem alterações) ---
const objectivesData = [
    { title: "Aprendizado", icon: Aprendizado, progress: "0/10" },
    { title: "Social", icon: Social, progress: "0/10" },
    { title: "Consistencia", icon: Consistencia, progress: "0/10" },
    { title: "Exploracao", icon: Exploracao, progress: "0/10" },
];

const Objectives = ({ theme }) => {
    const handleObjectiveClick = (objectiveTitle) => {
        console.log(`Clicou no objetivo: ${objectiveTitle}. Abrir modal de conquistas...`);
    };

    return (
        <div className="w-full max-w-4xl mt-6">
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-500'}`}>Objetivos</h2>
            <div className="space-y-3">
                {objectivesData.map(obj => (
                    <button
                        key={obj.title}
                        onClick={() => handleObjectiveClick(obj.title)}
                        className={`w-full flex items-center gap-4 rounded-2xl p-3 shadow-sm transition-colors duration-200 ${
                            theme === 'escuro' 
                            ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' 
                            : 'bg-blue-100/70 border border-blue-200 hover:bg-blue-200/80 hover:border-blue-300'
                        }`}
                    >
                        <img src={obj.icon} alt={obj.title} className="w-10 h-10" />
                        <span className={`font-bold ${theme === 'escuro' ? 'text-blue-300' : 'text-blue-800'}`}>{obj.title}</span>
                        <span className={`ml-auto font-semibold ${theme === 'escuro' ? 'text-blue-400' : 'text-blue-600'}`}>{obj.progress}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- Componente Modal (Sem alterações) ---
const UserListModal = ({ isOpen, onClose, title, users, theme, onToggleFollow, currentUserId }) => {
    if (!isOpen) return null;

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

                <div className="max-h-96 overflow-y-auto divide-y">
                    {users.map(user => {
                        const isCurrentUser = user.id === currentUserId;
                        
                        return (
                            <div key={user.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={Perfil} 
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full bg-purple-100"
                                    />
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className={`text-sm ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            @{user.username}
                                        </p>
                                    </div>
                                </div>
                                
                                {!isCurrentUser && (
                                    <button 
                                        onClick={() => onToggleFollow(user)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                                            user.isFollowing
                                            ? (theme === 'escuro' ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' : 'bg-purple-100 text-purple-700 hover:bg-purple-200')
                                            : 'bg-purple-500 text-white hover:bg-purple-600'
                                        }`}
                                    >
                                        {user.isFollowing ? 'Seguindo' : 'Seguir'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    {users.length === 0 && (
                        <p className={`p-6 text-center ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Nenhum usuário para mostrar.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Componente Principal (Atualizado) ---
export default function UserProfile() {
 
  // 1. Obter dados do usuário logado (Contexto)
  const { 
    theme, 
    followers,
    following,
    setFollowers, 
    setFollowing,
    dailyStreak,
    lcoins,
    lessonProgress,
    // --- INÍCIO DA MODIFICAÇÃO (Dados da Meta) ---
    onboardingSelections, // <-- Pega a meta (ex: "10min/dia")
    timeSpentToday        // <-- Pega o tempo gasto hoje
    // --- FIM DA MODIFICAÇÃO ---
  } = useSettings();
  
  const [animationClass, setAnimationClass] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    users: []
  });

  // Cálculo de Sinais Aprendidos (sem alteração)
  const signsLearned = Object.values(lessonProgress || {}).reduce((acc, lesson) => {
      return acc + (lesson.completed || 0); 
  }, 0);

  // --- INÍCIO DA MODIFICAÇÃO (Cálculo da Meta Diária) ---
  // Pega a string (ex: "10min/dia") ou define um padrão
  const goalTimeStr = onboardingSelections?.time || '10min/dia';
  // Extrai o número (ex: 10)
  const goalMinutes = parseInt(goalTimeStr) || 10;
  // Calcula a porcentagem da barra (limitado a 100%)
  const progressPercent = Math.min((timeSpentToday / goalMinutes) * 100, 100);
  // Formata o texto de minutos gastos (arredondado)
  const timeSpentDisplay = `${Math.round(timeSpentToday)}min`;
  // --- FIM DA MODIFICAÇÃO ---

  useEffect(() => {
    setAnimationClass('anim-enter');
    
    const dbUsers = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
    setAllUsers(dbUsers);

    const userString = localStorage.getItem('currentUser');
    if (userString) {
        setCurrentUser(JSON.parse(userString));
    }
  }, []); 

  // Funções de Seguir/Modal (sem alteração)
  const handleShowFollowers = () => {
    const followersData = followers
        .map(id => allUsers.find(u => u.id === id))
        .filter(Boolean) 
        .map(user => ({
            ...user,
            isFollowing: following.includes(user.id) 
        }));

    setModalState({
        isOpen: true,
        title: 'Seguidores',
        users: followersData
    });
  };

  const handleShowFollowing = () => {
    const followingData = following
        .map(id => allUsers.find(u => u.id === id))
        .filter(Boolean)
        .map(user => ({
            ...user,
            isFollowing: true 
        }));
    
    setModalState({
        isOpen: true,
        title: 'Seguindo',
        users: followingData
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, title: '', users: [] });
  };

  const handleToggleFollow = (targetUser) => {
    if (!currentUser) return;
    const currentUserId = currentUser.id;
    const targetUserId = targetUser.id;
    const amIFollowing = following.includes(targetUserId);
    let newFollowingList; 
    
    const updatedAllUsers = allUsers.map(user => {
        if (user.id === currentUserId) {
            if (amIFollowing) {
                newFollowingList = user.following.filter(id => id !== targetUserId);
                return { ...user, following: newFollowingList };
            } else {
                newFollowingList = [...user.following, targetUserId];
                return { ...user, following: newFollowingList };
            }
        }
        if (user.id === targetUserId) {
            if (amIFollowing) {
                const newFollowers = user.followers.filter(id => id !== currentUserId);
                return { ...user, followers: newFollowers };
            } else {
                const newFollowers = [...user.followers, currentUserId];
                return { ...user, followers: newFollowers };
            }
        }
        return user;
    });

    localStorage.setItem('liresUsersDB', JSON.stringify(updatedAllUsers));
    setAllUsers(updatedAllUsers); 
    setFollowing(newFollowingList); 

    setModalState(prevState => ({
        ...prevState,
        users: prevState.users.map(u => 
            u.id === targetUserId ? { ...u, isFollowing: !amIFollowing } : u
        )
    }));

    if (targetUserId === currentUserId) {
         if(amIFollowing) {
             setFollowers(followers.filter(id => id !== currentUserId));
         } else {
             setFollowers([...followers, currentUserId]);
         }
    }
  };

  return (
    <>
        <main className={`flex flex-col items-center p-0 sm:p-0 gap-6 w-full max-w-4xl mx-auto content-box ${animationClass}`}> 
            <ProfileHeader theme={theme} />
            <UserInfo 
                theme={theme} 
                user={currentUser} 
                followersCount={followers.length}
                followingCount={following.length}
                onShowFollowers={handleShowFollowers}
                onShowFollowing={handleShowFollowing}
            />
            <Achievements theme={theme} />
            
            <Stats 
                theme={theme}
                streak={dailyStreak}
                signs={signsLearned}
                lcoins={lcoins}
            />

            {/* --- INÍCIO DA MODIFICAÇÃO (Passando props para DailyGoal) --- */}
            <DailyGoal 
                theme={theme}
                goalTimeStr={goalTimeStr}
                timeSpentDisplay={timeSpentDisplay}
                progressPercent={progressPercent}
            />
            {/* --- FIM DA MODIFICAÇÃO --- */}

            <Objectives theme={theme} />
        </main>

        <UserListModal
            isOpen={modalState.isOpen}
            onClose={handleCloseModal}
            title={modalState.title}
            users={modalState.users}
            theme={theme}
            onToggleFollow={handleToggleFollow}
            currentUserId={currentUser ? currentUser.id : null}
        />
    </>
  );
}