import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
import { useSettings } from '../components/SettingsContext'; 
import Perfil from '../assets/Perfil.png'; // Fallback

// --- Ícones ---
import Foguinho from '../assets/Foguinho.png';
const Alvo = "https://placehold.co/64x64/3b82f6/ffffff?text=META"; 
const Espadas = "https://placehold.co/64x64/ef4444/ffffff?text=VERSUS";
const Relogio = "https://placehold.co/64x64/f59e0b/ffffff?text=PROG"; 

// 1. Função de Avatar (Sem alteração)
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

// 2. Função para formatar o tempo (Sem alteração)
function formatTimeAgo(timestamp) {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - timestamp) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `há ${Math.floor(interval)} anos atrás`;
    interval = seconds / 2592000;
    if (interval > 1) return `há ${Math.floor(interval)} meses atrás`;
    interval = seconds / 86400;
    if (interval > 1) return `há ${Math.floor(interval)} dias atrás`;
    interval = seconds / 3600;
    if (interval > 1) return `há ${Math.floor(interval)} horas atrás`;
    interval = seconds / 60;
    if (interval > 1) return `há ${Math.floor(interval)} minutos atrás`;
    return `há ${Math.floor(seconds)} segundos atrás`;
}


// --- SUB-COMPONENTES ATUALIZADOS ---

// Componente RenderPostContent (Sem alteração)
const RenderPostContent = ({ post, theme }) => {
    switch (post.type) {
        case 'streak':
            return (
                <div className={`mt-4 p-5 rounded-lg border-2 border-orange-400 bg-gradient-to-br ${theme === 'escuro' ? 'from-orange-900/30 to-gray-800' : 'from-orange-100/30 to-white/10'}`}>
                    <div className="flex items-center gap-4">
                        <img src={Foguinho} alt="Sequência" className="w-16 h-16" />
                        <div>
                            <p className={`text-lg font-semibold ${theme === 'escuro' ? 'text-orange-300' : 'text-orange-600'}`}>Sequência Atingida!</p>
                            <p className={`text-3xl font-bold ${theme === 'escuro' ? 'text-white' : 'text-gray-800'}`}>{post.value} {post.value > 1 ? 'dias' : 'dia'}</p>
                        </div>
                    </div>
                </div>
            );
        case 'meta_complete':
            return (
                <div className={`mt-4 p-5 rounded-lg border-2 border-blue-400 bg-gradient-to-br ${theme === 'escuro' ? 'from-blue-900/30 to-gray-800' : 'from-blue-100/30 to-white/10'}`}>
                    <div className="flex items-center gap-4">
                        <img src={Alvo} alt="Meta" className="w-16 h-16 rounded-lg" />
                        <div>
                            <p className={`text-lg font-semibold ${theme === 'escuro' ? 'text-blue-300' : 'text-blue-600'}`}>Meta Diária Completa!</p>
                            <p className={`text-3xl font-bold ${theme === 'escuro' ? 'text-white' : 'text-gray-800'}`}>{post.value}</p>
                        </div>
                    </div>
                </div>
            );
        case 'meta_progress':
             return (
                <div className={`mt-4 p-5 rounded-lg border-2 border-yellow-400 bg-gradient-to-br ${theme === 'escuro' ? 'from-yellow-900/30 to-gray-800' : 'from-yellow-100/30 to-white/10'}`}>
                    <div className="flex items-center gap-4">
                        <img src={Relogio} alt="Progresso" className="w-16 h-16 rounded-lg" />
                        <div>
                            <p className={`text-lg font-semibold ${theme === 'escuro' ? 'text-yellow-300' : 'text-yellow-600'}`}>Progresso da Meta</p>
                            <p className={`text-3xl font-bold ${theme === 'escuro' ? 'text-white' : 'text-gray-800'}`}>
                                {post.value.spent} / {post.value.goal} min
                            </p>
                        </div>
                    </div>
                </div>
            );
        case 'versus':
             return (
                <div className={`mt-4 p-5 rounded-lg border-2 border-red-400 bg-gradient-to-br ${theme === 'escuro' ? 'from-red-900/30 to-gray-800' : 'from-red-100/30 to-white/10'}`}>
                    <div className="flex items-center gap-4">
                        <img src={Espadas} alt="Versus" className="w-16 h-16 rounded-lg" />
                        <div>
                            <p className={`text-lg font-semibold ${theme === 'escuro' ? 'text-red-300' : 'text-red-600'}`}>Desafio Completo!</p>
                            <p className={`text-2xl font-bold ${theme === 'escuro' ? 'text-white' : 'text-gray-800'}`}>Completou um desafio Versus</p>
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <p className={`mt-4 text-lg ${theme === 'escuro' ? 'text-slate-300' : 'text-slate-700'}`}>
                    {post.text}
                </p>
            );
    }
};

const PostCard = ({ post, theme, navigate }) => (
  <div className={`rounded-2xl p-6 ${
    theme === 'escuro' 
    ? 'bg-gray-800 border border-gray-700' 
    : 'bg-white/70 border border-slate-200'
  }`}>
    <div className="flex items-center mb-4">
      <Link to={`/usuario/${post.user.username}`} className="flex items-center group">
        <img 
            src={getAvatarUrl(post.user.avatarSeed || post.user.username, post.user.avatarStyle)} 
            alt="Avatar" 
            className="w-10 h-10 rounded-full mr-4 bg-white" 
        />
        <div>
          <p className={`font-bold group-hover:underline ${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`}>{post.user.name}</p>
          <p className={`text-sm ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}`}>
            @{post.user.username} • {formatTimeAgo(post.timestamp)}
          </p>
        </div>
      </Link>
    </div>
    <RenderPostContent post={post} theme={theme} />
  </div>
);

// --- INÍCIO DA MODIFICAÇÃO (PostCreator) ---
const PostCreator = ({ theme, currentUser, onShowPreview }) => {
    
    return (
        <div className={`rounded-2xl p-4 flex flex-col gap-4 ${
          theme === 'escuro' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white/70 border border-slate-200'
        }`}>
            {/* Bloco 1: Avatar e Texto */}
            <div className="flex items-center gap-4">
                <img 
                    src={getAvatarUrl(currentUser?.avatarSeed || currentUser?.username, currentUser?.avatarStyle)} 
                    alt="Seu avatar" 
                    className="w-10 h-10 rounded-full bg-white" 
                />
                <p className={`font-semibold ${theme === 'escuro' ? 'text-violet-400' : 'text-violet-500'}`}>
                    Compartilhe seu progresso!
                </p>
            </div>
            {/* Bloco 2: Botões */}
            {/* --- CORREÇÃO AQUI --- */}
            {/* Removido 'justify-center' e mantido o 'ml-14' para alinhar com o texto */}
            <div className="flex justify-start items-center ml-0 md:ml-14">
            {/* --- FIM DA CORREÇÃO --- */}
                <div className="flex gap-2">
                    <button onClick={() => onShowPreview('streak')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Sequência</button>
                    <button onClick={() => onShowPreview('meta')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Meta</button>
                    <button onClick={() => onShowPreview('versus')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Versus</button>
                </div>
            </div>
        </div>
    );
};
// --- FIM DA MODIFICAÇÃO ---


// FeedTabs (Sem alteração)
const FeedTabs = ({ activeTab, onTabChange, theme }) => {
    const baseClasses = "px-8 py-3 rounded-full font-bold transition-all duration-300 ease-in-out";
    const activeClasses = "bg-pink-500 text-white shadow-lg shadow-pink-500/40 transform -translate-y-0.5";
    const inactiveClasses = theme === 'escuro' 
        ? 'bg-gray-700 text-pink-400 hover:bg-gray-600' 
        : 'bg-pink-100 text-pink-400 hover:bg-pink-200';
        
    return (
        <div className="flex justify-center mb-8 mt-2">
            <div className="flex gap-4">
                <button onClick={() => onTabChange('geral')} className={`${baseClasses} ${activeTab === 'geral' ? activeClasses : inactiveClasses}`}>Geral</button>
                <button onClick={() => onTabChange('amigos')} className={`${baseClasses} ${activeTab === 'amigos' ? activeClasses : inactiveClasses}`}>Amigos</button>
            </div>
        </div>
    );
};

// --- Modal de Confirmação (Sem alteração) ---
const PostConfirmationModal = ({ isOpen, onClose, onConfirm, postData, theme }) => {
    if (!isOpen || !postData) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 font-poppins"
            onClick={onClose}
        >
            <div 
                className={`w-full max-w-md rounded-2xl shadow-xl flex flex-col ${
                    theme === 'escuro' ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'
                }`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-purple-500">Postar no Feed?</h3>
                    <button 
                        onClick={onClose}
                        className={`text-2xl font-bold transition-colors ${
                            theme === 'escuro' ? 'text-gray-500 hover:text-gray-200' : 'text-gray-400 hover:text-gray-800'
                        }`}
                    >
                        &times;
                    </button>
                </div>

                <div className="p-4">
                    <p className={`text-sm mb-2 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>
                        É assim que seu post vai aparecer:
                    </p>
                    <RenderPostContent post={postData} theme={theme} />
                </div>
                
                <div className="flex justify-end gap-3 p-4 border-t">
                    <button
                        onClick={onClose}
                        className={`px-6 py-2 rounded-full font-semibold ${
                            theme === 'escuro' 
                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-purple-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-600 transition-colors"
                    >
                        Postar
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DA PÁGINA DE FEED ---
export default function FeedPage() {
    const { 
        theme, 
        following: loggedInFollowing, 
        dailyStreak, 
        onboardingSelections,
        timeSpentToday 
    } = useSettings(); 
    
    const dailyGoal = onboardingSelections?.time || '10 min/dia';
    const goalMinutes = parseInt(dailyGoal) || 10;
    
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('geral');
    const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter');
    const [exitAnimationClass, setExitAnimationClass] = useState('');

    const [allPosts, setAllPosts] = useState([]); 
    const [allUsers, setAllUsers] = useState(new Map()); 
    const [currentUser, setCurrentUser] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

    const [modalData, setModalData] = useState({ isOpen: false, postData: null });

    // 1. Carrega todos os dados ao iniciar (Sem alteração)
    useEffect(() => {
        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            navigate('/login'); 
            return;
        }
        const loggedInUser = JSON.parse(userString);
        setCurrentUser(loggedInUser);

        const dbUsers = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
        const usersMap = new Map(dbUsers.map(user => [user.id, user]));
        setAllUsers(usersMap);

        let postsFromDB = JSON.parse(localStorage.getItem('liresPostsDB'));
        
        if (!postsFromDB || postsFromDB.length === 0) {
            const firstUserId = dbUsers.length > 0 ? dbUsers[0].id : loggedInUser.id; 
            postsFromDB = [
                { id: 2, userId: firstUserId, timestamp: Date.now() - 7200000, type: 'meta_complete', value: '10 min/dia' },
                { id: 1, userId: firstUserId, timestamp: Date.now() - 3600000, type: 'streak', value: 1 }, 
            ];
            localStorage.setItem('liresPostsDB', JSON.stringify(postsFromDB));
        }

        setAllPosts(postsFromDB);
        setIsLoading(false);

    }, [navigate]);

    // 2. Função para criar um novo post (Sem alteração)
    const handlePostCreated = (newPost) => {
        setAllPosts(prevPosts => [newPost, ...prevPosts]);
        const currentPosts = JSON.parse(localStorage.getItem('liresPostsDB')) || [];
        localStorage.setItem('liresPostsDB', JSON.stringify([newPost, ...currentPosts]));
    };
    
    // 3. Lógica das Abas (Sem alteração)
    const handleTabChange = (newTab) => {
        if (newTab === activeTab) return; 
        setEnterAnimationClass('');
        setExitAnimationClass('anim-exit'); 
        setTimeout(() => {
            setActiveTab(newTab); 
            setExitAnimationClass('');
            setEnterAnimationClass('anim-enter');
        }, 800); 
    };

    // 4. Lógica do Modal (Sem alteração)
    const handleShowPreview = (type) => {
        if (!currentUser) return;

        let postData = {
            id: Date.now(),
            userId: currentUser.id,
            timestamp: Date.now(),
            type: type,
            user: { 
                name: currentUser.name, 
                username: currentUser.username, 
                avatarSeed: currentUser.avatarSeed, 
                avatarStyle: currentUser.avatarStyle 
            }
        };

        if (type === 'streak') {
            postData.type = 'streak';
            postData.value = dailyStreak;
        } else if (type === 'meta') {
            if (timeSpentToday >= goalMinutes) {
                postData.type = 'meta_complete';
                postData.value = dailyGoal; 
            } else {
                postData.type = 'meta_progress';
                postData.value = { 
                    spent: Math.round(timeSpentToday), 
                    goal: goalMinutes 
                };
            }
        } else if (type === 'versus') {
            postData.type = 'versus';
            postData.value = null;
        }

        setModalData({ isOpen: true, postData: postData });
    };
    const handleConfirmPost = () => {
        if (modalData.postData) {
            handlePostCreated(modalData.postData); 
        }
        handleCloseModal(); 
    };
    const handleCloseModal = () => {
        setModalData({ isOpen: false, postData: null });
    };

    // 5. Combina posts com dados dos usuários e filtra (Sem alteração)
    const combinedPosts = allPosts.map(post => {
        const user = allUsers.get(post.userId);
        return {
            ...post,
            user: user || { id: 'unknown', name: 'Usuário Removido', username: 'desconhecido', avatarSeed: 'unknown' }
        };
    });

    const filteredPosts = combinedPosts.filter(post => {
        if (activeTab === 'geral') {
            return true; 
        }
        if (activeTab === 'amigos') {
            return loggedInFollowing.includes(post.userId) || post.userId === currentUser?.id;
        }
        return false;
    });

    return (
        <Fragment>
            <div className={`font-poppins relative min-h-screen flex flex-col ${
                theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
            }`}>
                <style>{`
                    .btn-gradient-purple {
                        background-image: linear-gradient(90deg, #c084fc, #a855f7);
                        box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
                    }
                `}</style>
                
                <SidebarLeft />
                <SidebarRight />
                <MobileTopBar />
                <MobileBottomBar />

                <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                    <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow flex flex-col">
                        <FeedTabs activeTab={activeTab} onTabChange={handleTabChange} theme={theme} />
                        
                        <div className="flex-grow flex flex-col">
                            <PostCreator 
                                theme={theme} 
                                currentUser={currentUser} 
                                onShowPreview={handleShowPreview}
                                dailyStreak={dailyStreak}
                                dailyGoal={dailyGoal}
                                timeSpentToday={timeSpentToday}
                                goalMinutes={goalMinutes}
                            />
                            
                            <hr className={`my-6 ${theme === 'escuro' ? 'border-gray-700' : 'border-teal-200'}`} />
                            
                            <div className={`content-box flex-grow flex flex-col ${enterAnimationClass} ${exitAnimationClass}`}>
                                {isLoading ? (
                                    <p className={`text-center ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Carregando feed...
                                    </p>
                                ) : filteredPosts.length > 0 ? (
                                    <div className="space-y-6">
                                        {filteredPosts.map(post => (
                                            <PostCard 
                                                key={post.id} 
                                                post={post} 
                                                theme={theme} 
                                                navigate={navigate}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex-grow flex items-center justify-center">
                                        <p className={`text-center ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {activeTab === 'amigos' 
                                                ? "O feed dos seus amigos está vazio. Siga alguém!" 
                                                : "Nenhum post para mostrar ainda."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <PostConfirmationModal
                isOpen={modalData.isOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmPost}
                postData={modalData.postData}
                theme={theme}
            />
        </Fragment>
    );
}