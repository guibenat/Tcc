import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// Puxo o hook principal do Contexto para pegar os dados do usuário
import { useSettings } from "../components/SettingsContext";

// --- Ícones e Imagens ---
// Corrigi os paths para o padrão (assumindo que este JSX está em /components)
import Perfil from "../assets/Perfil.png";
import Bandeira from "../assets/Brasil.jpg";
import Foguinho from '../assets/Foguinho.png';
import LcoinIcon from '../assets/lcoin.png';
import CrownIcon from '../assets/crown-icon.png';
import HandIcon from '../assets/hand-icon.png';
import Aprendizado from "../assets/Aprendizado.png";
import Social from "../assets/Social.png";
import Consistencia from "../assets/Consistencia.png";
import Exploracao from "../assets/Exploração.png";
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

// Componente Principal
export default function UserContent() {
    
    // Hooks 

    const navigate = useNavigate();
    const {
        theme,
        dailyStreak,
        lcoins,
        lessonProgress,
        timeSpentToday,
        onboardingSelections,
        followers,
        following
    } = useSettings();

    // State Local 
    const [avatarUrl, setAvatarUrl] = useState(Perfil);
    const [username, setUsername] = useState('@username');
    const [joinDate, setJoinDate] = useState('...');
    const [animationClass, setAnimationClass] = useState('');

    // Efeito de Carregamento 
    useEffect(() => {
        setAnimationClass('anim-enter'); 
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            setUsername(user.username || '@username');
            const date = new Date(user.createdAt || Date.now());
            const joinDateString = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
            setJoinDate(`Por aqui desde ${joinDateString}`);
            setAvatarUrl(getAvatarUrl(user.avatarSeed || user.username, user.avatarStyle));
        }
    }, []); 

    // Cálculos Dinâmicos
    const sinaisAprendidos = Object.keys(lessonProgress).length;
    const dailyGoalInMinutes = onboardingSelections?.dailyGoal || 10; 
    const timeToday = Math.floor(timeSpentToday || 0); 
    const goalPercentage = Math.min((timeToday / dailyGoalInMinutes) * 100, 100); 

    // Handlers 
    const handleEditProfile = () => {
        navigate('/configuracoes/gerenciamento-de-conta');
    };

    // Abrir o modal de Conquistas
    const handleShowAchievements = () => {
        console.log("TODO: Abrir modal de Conquistas");
    };

    // Abrir o modal de Objetivos
    const handleShowObjectives = (title) => {
        console.log(`TODO: Abrir modal de Objetivos para: ${title}`);
    };


    // Sub-componentes 

    // Cabeçalho com o Avatar
    const ProfileHeader = () => (
        <div className={`w-full max-w-4xl rounded-3xl p-6 flex justify-center relative shadow-lg ${
            theme === 'escuro' ? 'bg-gray-800 border border-purple-800' : 'bg-white border border-purple-100'
        }`}>
            {/* Borda gradiente */}
            <div className="bg-gradient-to-b from-purple-200 to-pink-200 p-1 rounded-full">
                <img src={avatarUrl} alt="Avatar" className="h-32 w-32 object-cover rounded-full border-4 border-white" />
            </div>
            {/* Botão de Editar */}
            <button 
                onClick={handleEditProfile}
                className="absolute right-6 bottom-6 bg-yellow-300 p-3 rounded-full shadow-md hover:scale-110 transition-transform"
            >
                <span role="img" aria-label="Editar">✏️</span>
            </button>
        </div>
    );

    // Informações do Usuário 
    const UserInfo = () => (
        <div className="w-full max-w-4xl mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <h1 className={`text-3xl font-bold ${theme === 'escuro' ? 'text-purple-300' : 'text-violet-500'}`}>
                    @{username}
                </h1>
                <button onClick={handleEditProfile} className="text-lg opacity-50 hover:opacity-100">
                    <span role="img" aria-label="Editar Nome">✏️</span>
                </button>
                <img src={Bandeira} alt="Brasil" className="w-8 h-auto rounded-md ml-auto" />
            </div>
            <p className={theme === 'escuro' ? 'text-violet-500' : 'text-violet-400'}>
                {joinDate}
            </p>

            {/* Seguidores/Seguindo */}
            <div className="flex gap-4 pt-2">
                <span className={`font-bold ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`}>
                    {followers.length}
                </span>
                <span className={theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}>Seguidores</span>
                <span className={`font-bold ml-4 ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`}>
                    {following.length}
                </span>
                <span className={theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}>Seguindo</span>
            </div>
            <hr className={`mt-4 ${theme === 'escuro' ? 'border-gray-700' : 'border-purple-100'}`} />
        </div>
    );

    // Card de Conquistas
    const Achievements = () => (
        <div className="w-full max-w-4xl mt-4">
            <h2 className={`text-2xl font-bold mb-3 ${theme === 'escuro' ? 'text-purple-300' : 'text-violet-500'}`}>Conquistas</h2>
            <div 
                onClick={handleShowAchievements}
                className="flex items-center gap-4 bg-yellow-300 rounded-2xl p-4 shadow-md cursor-pointer hover:brightness-105"
            >
                <img src={CrownIcon} alt="Ícone de Coroa" className="w-12 h-12" />
                <div>
                    <p className="font-bold text-yellow-800">NOVA CONQUISTA!</p>
                    <span className="text-sm text-yellow-700 cursor-pointer hover:underline">Clique para ver mais</span>
                </div>
            </div>
        </div>
    );

    // Bloco de Estatísticas 
    const Stats = () => (
        <div className="w-full max-w-4xl mt-6">
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'escuro' ? 'text-purple-300' : 'text-violet-500'}`}>Estatísticas</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* Coluna da Esquerda (Streak, Sinais) */}
                <div className="flex flex-col gap-4">
                    {/* Streak (dinâmico) */}
                    <div className="flex items-center gap-4 bg-yellow-400/80 border border-yellow-300 text-yellow-900 rounded-2xl shadow-sm p-4">
                        <img src={Foguinho} alt="Sequência" className="w-10 h-10" />
                        <div>
                            <p className="font-semibold">Sequência</p>
                            <span className="text-2xl font-bold">{dailyStreak}</span>
                        </div>
                    </div>
                    {/* Sinais (dinâmico) */}
                    <div className="flex items-center gap-4 bg-yellow-400/80 border border-yellow-300 text-yellow-900 rounded-2xl shadow-sm p-4">
                        <img src={HandIcon} alt="Sinais" className="w-10 h-10" />
                        <div>
                            <p className="font-semibold">Sinais aprendidos</p>
                            <span className="text-2xl font-bold">{sinaisAprendidos}</span>
                        </div>
                    </div>
                </div>
                {/* Coluna da Direita */}
                <div className="flex flex-col items-center justify-center gap-2 bg-violet-400/80 border border-violet-300 text-white rounded-2xl shadow-sm p-4">
                    <img src={LcoinIcon} alt="Lcoins" className="w-12 h-12" />
                    <span className="text-3xl font-bold">{lcoins}</span>
                    <p className="font-semibold">Lcoins</p>
                </div>
            </div>
        </div>
    );

    // Card da Meta Diária 
    const DailyGoal = () => (
        <div className="w-full max-w-4xl mt-6">
            <h2 className={`text-2xl font-bold mb-3 ${theme === 'escuro' ? 'text-purple-300' : 'text-violet-500'}`}>Metas</h2>
            <p className={theme === 'escuro' ? 'text-violet-500' : 'text-violet-400'}>Sua meta diária</p>
            <div className="flex items-center gap-4 bg-blue-800 text-white rounded-2xl p-4 shadow-lg">
                <img src={avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-blue-400"/>
                <span className="font-semibold">{dailyGoalInMinutes}min por dia</span>
                {/* Barra de progresso */}
                <div className="flex-grow h-4 bg-blue-900/70 rounded-full mx-4">
                    <div 
                        className="h-4 bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full" 
                        style={{ width: `${goalPercentage}%` }} 
                    ></div>
                </div>
                <span className="font-bold text-lg whitespace-nowrap">{timeToday}min ✓</span>
            </div>
        </div>
    );

    // Dados dos Objetivos 
    const objectivesData = [
        { title: "Aprendizado", icon: Aprendizado, progress: "0/10" },
        { title: "Social", icon: Social, progress: "0/10" },
        { title: "Consistência", icon: Consistencia, progress: "0/10" },
        { title: "Exploração", icon: Exploracao, progress: "0/10" },
    ];

    // Card de Objetivos 
    const Objectives = () => (
        <div className="w-full max-w-4xl mt-6">
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'escuro' ? 'text-purple-300' : 'text-violet-500'}`}>Objetivos</h2>
            <div className="space-y-3">
                {objectivesData.map(obj => (
                    <div 
                        key={obj.title} 
                        onClick={() => handleShowObjectives(obj.title)}
                        className={`flex items-center gap-4 rounded-2xl p-3 cursor-pointer transition-all hover:shadow-lg ${
                            theme === 'escuro' 
                            ? 'bg-gray-800 border border-gray-700 hover:border-purple-600'
                            : 'bg-slate-200/70 border border-slate-300 hover:border-purple-300'
                        }`}
                    >
                        <img src={obj.icon} alt={obj.title} className="w-10 h-10" />
                        <span className={`font-bold ${theme === 'escuro' ? 'text-slate-300' : 'text-slate-600'}`}>{obj.title}</span>
                        <span className={`ml-auto font-semibold ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}`}>{obj.progress}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    // Renderização Principal
    return (
        <main className={`flex flex-col items-center p-4 sm:p-6 gap-6 content-box ${animationClass} ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gray-50' 
        }`}>
            {/* Renderizo os sub-componentes */}
            <ProfileHeader />
            <UserInfo />
            <Achievements />
            <Stats />
            <DailyGoal />
            <Objectives />
           
        </main>
    );
}