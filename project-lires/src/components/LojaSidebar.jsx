import React, { useState, useEffect } from 'react';

// --- Imagens ---
import fireIconImg from '../assets/foguinho.png';
import lcoinIconImg from '../assets/lcoin.png';
import heartIconImg from '../assets/coracaoo.png';
import congelarIcon from '../assets/congelar-icon.png'; 
import dobroXpIcon from '../assets/dobro-xp-icon.png';

// Componente de status
const UserStat = ({ iconSrc, value, color }) => (
    <div className="flex items-center gap-3">
        <img src={iconSrc} alt="Ícone de Status" className="w-8 h-8" />
        <span className={`font-bold text-xl ${color}`}>{value}</span>
    </div>
);

// Este é o novo componente para a barra lateral da loja
export default function LojaSidebar() {
  
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
      setAnimationClass('anim-enter');
  }, []); 

  return (
    // Aplicar a classe de animação ao container <aside>
    <aside className={`w-96 p-6 space-y-6 fixed top-0 right-0 h-screen overflow-y-auto bg-[#F9F8FF] border-l border-slate-200 hidden lg:block ${animationClass}`}>
      
      {/* 1. Status do Usuário */}
      <div className="flex justify-around items-center bg-slate-50 p-2 rounded-xl">
        <UserStat iconSrc={fireIconImg} value="1" color="text-orange-500" />
        <UserStat iconSrc={lcoinIconImg} value="50" color="text-amber-500" />
        <UserStat iconSrc={heartIconImg} value="5" color="text-red-500" />
      </div>

      {/* 2. Card "Congelar Sequência" */}
      <div className="bg-white border-2 border-purple-400 rounded-3xl p-5 flex items-center gap-4 w-full">
        
        <img 
          src={congelarIcon} 
          alt="Congelar Sequência" 
          // CORREÇÃO 1: Adicionado object-contain
          className="flex-shrink-0 w-20 h-20 rounded-2xl object-contain" 
        />
        
        <div className="flex-1">
            <h3 className="text-purple-700 font-bold text-xl leading-tight">Congelar Sequência</h3>
            <p className="text-purple-600 text-sm mb-2">Congele sua sequência por 24h mesmo se você não praticar</p>
            
            <div className="flex items-center gap-1.5">
              	<img src={lcoinIconImg} alt="L-Coin" className="w-6 h-6" />
              	<span className="text-blue-600 font-bold text-xl">400</span>
            </div>
        </div>
      </div>

      {/* 3. Card "Dobro de XP" */}
      <div className="bg-white border-2 border-purple-400 rounded-3xl p-5 flex items-center gap-4 w-full">
        
        <img 
          src={dobroXpIcon} 
          alt="Dobro de XP" 
          // CORREÇÃO 1: Adicionado object-contain
          className="flex-shrink-0 w-20 h-20 rounded-2xl object-contain" 
        /> 
        
        <div className="flex-1">
            <h3 className="text-purple-700 font-bold text-xl leading-tight">Dobro de XP</h3>
            <p className="text-purple-600 text-sm mb-2">Ganhe o dobro de XP durante 1 hora</p>
            
            {/* CORREÇÃO 2: Removidos os caracteres 'S' e 'Â' que estavam aqui */}
            <div className="flex items-center gap-1.5">
                <img src={lcoinIconImg} alt="L-Coin" className="w-6 h-6" />
                <span className="text-blue-600 font-bold text-xl">250</span>
            </div>
        </div>
      </div>
      
    </aside>
  );
}