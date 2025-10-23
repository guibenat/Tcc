import React, { useState, useEffect } from "react"; // 1. Importar useState e useEffect

// --- Ícones e Imagens ---
import Perfil from "../assets/Perfil.png";
import Bandeira from "../assets/Brasil.jpg";
import Foguinho from '../assets/Foguinho.png';
import LcoinIcon from '../assets/lcoin.png';
import CrownIcon from '../assets/Foguinho.png'; // Usando placeholder
import HandIcon from '../assets/lcoin.png';   // Usando placeholder
import Aprendizado from "../assets/Aprendizado.png";
import Social from "../assets/Social.png";
import Consistencia from "../assets/Consistencia.png";
import Exploracao from "../assets/Exploração.png";


// --- Sub-componentes Reestilizados ---
const ProfileHeader = () => (
    <div className="w-full max-w-4xl bg-white rounded-3xl p-6 flex justify-center relative shadow-lg border border-purple-100">
        <div className="bg-gradient-to-b from-purple-200 to-pink-200 p-1 rounded-full relative">
            <img src={Perfil} alt="Avatar" className="h-32 w-32 object-cover rounded-full border-4 border-white" />
            <button className="absolute right-0 bottom-0 bg-yellow-300 p-3 rounded-full shadow-md hover:scale-110 transition-transform border-2 border-white">
                <span role="img" aria-label="Editar">✏️</span>
            </button>
        </div>
    </div>
);

const UserInfo = () => (
    <div className="w-full max-w-4xl mt-4 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-violet-500">@cauasilva_2006</h1>
            <button className="text-lg opacity-50 hover:opacity-100">
                <span role="img" aria-label="Editar Nome">✏️</span>
            </button>
        </div>
        <p className="text-violet-400">Por aqui desde junho de 2025</p>
        <div className="flex gap-4 pt-2">
            <span className="font-bold text-purple-600">10</span>
            <span className="text-gray-500">Seguidores</span>
            <span className="font-bold text-purple-600 ml-4">10</span>
            <span className="text-gray-500">Seguindo</span>
        </div>
        <hr className="w-full mt-4 border-purple-100" />
    </div>
);

const Achievements = () => (
    <div className="w-full max-w-4xl mt-4">
        <h2 className="text-2xl font-bold text-violet-500 mb-3">Conquistas</h2>
        <div className="flex items-center gap-4 bg-yellow-300 rounded-2xl p-4 shadow-md cursor-pointer hover:bg-yellow-400 transition-colors">
            <img src={CrownIcon} alt="Ícone de Coroa" className="w-12 h-12" />
            <div>
                <p className="font-bold text-yellow-800">NOVA CONQUISTA!</p>
                <span className="text-sm text-yellow-700">Clique para ver mais</span>
            </div>
        </div>
    </div>
);

const Stats = () => (
    <div className="w-full max-w-4xl mt-6">
        <h2 className="text-2xl font-bold text-violet-500 mb-4">Estatísticas</h2>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-300 to-yellow-400 border border-yellow-500 text-yellow-900 rounded-2xl shadow-md p-4">
                    <img src={Foguinho} alt="Sequência" className="w-10 h-10" />
                    <div>
                        <p className="font-semibold">Sequência</p>
                        <span className="text-2xl font-bold">1</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-300 to-yellow-400 border border-yellow-500 text-yellow-900 rounded-2xl shadow-md p-4">
                    <img src={HandIcon} alt="Sinais" className="w-10 h-10" />
                    <div>
                        <p className="font-semibold">Sinais aprendidos</p>
                        <span className="text-2xl font-bold">10</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-violet-400 to-violet-500 border border-violet-600 text-white rounded-2xl shadow-md p-4">
                <img src={LcoinIcon} alt="Lcoins" className="w-12 h-12" />
                <span className="text-3xl font-bold">50</span>
                <p className="font-semibold">Lcoins</p>
            </div>
        </div>
    </div>
);

const DailyGoal = () => (
     <div className="w-full max-w-4xl mt-6">
        <h2 className="text-2xl font-bold text-violet-500 mb-3">Metas</h2>
        <p className="text-violet-400 mb-3">Sua meta diária</p>
        <div className="flex items-center gap-4 bg-blue-800 text-white rounded-2xl p-4 shadow-lg">
            <img src={Perfil} alt="Avatar Pequeno" className="w-12 h-12 rounded-full border-2 border-blue-400"/>
            <span className="font-semibold">10min por dia</span>
            <div className="flex-grow h-4 bg-blue-900/70 rounded-full mx-4 overflow-hidden">
                <div className="h-4 bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <span className="font-bold text-lg whitespace-nowrap">5min ✓</span>
        </div>
    </div>
);

const objectivesData = [
    { title: "Aprendizado", icon: Aprendizado, progress: "0/10" },
    { title: "Social", icon: Social, progress: "0/10" },
    { title: "Consistência", icon: Consistencia, progress: "0/10" },
    { title: "Exploração", icon: Exploracao, progress: "0/10" },
];

const Objectives = () => {
    const handleObjectiveClick = (objectiveTitle) => {
        console.log(`Clicou no objetivo: ${objectiveTitle}. Abrir modal de conquistas...`);
        // Lógica para abrir modal virá aqui
    };

    return (
        <div className="w-full max-w-4xl mt-6">
            <h2 className="text-2xl font-bold text-violet-500 mb-4">Objetivos</h2>
            <div className="space-y-3">
                {objectivesData.map(obj => (
                    <button
                        key={obj.title}
                        onClick={() => handleObjectiveClick(obj.title)}
                        className="w-full flex items-center gap-4 bg-blue-100/70 border border-blue-200 rounded-2xl p-3 shadow-sm hover:bg-blue-200/80 hover:border-blue-300 transition-colors duration-200"
                    >
                        <img src={obj.icon} alt={obj.title} className="w-10 h-10" />
                        <span className="font-bold text-blue-800">{obj.title}</span>
                        <span className="ml-auto font-semibold text-blue-600">{obj.progress}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- Componente Principal ---
export default function UserProfile() {
  
  // 2. Adicionar estado para a classe de animação
  const [animationClass, setAnimationClass] = useState('');

  // 3. Adicionar useEffect para aplicar a classe na montagem
  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []); // Array vazio garante que rode apenas uma vez

  return (
    // 4. Aplicar a classe de animação e 'content-box' ao container principal
    <main className={`flex flex-col items-center p-0 sm:p-0 gap-6 w-full max-w-4xl mx-auto content-box ${animationClass}`}> 
        <ProfileHeader />
        <UserInfo />
        <Achievements />
        <Stats />
        <DailyGoal />
        <Objectives />
    </main>
  );
}