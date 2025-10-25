import React, { useState, useEffect } from 'react';
// 1. IMPORTAR O HOOK
// Assumindo que LojaSidebar.jsx está em /components, assim como SettingsContext.jsx
import { useSettings } from './SettingsContext'; 

// --- Imagens ---
import fireIconImg from '../assets/foguinho.png';
import lcoinIconImg from '../assets/lcoin.png';
import heartIconImg from '../assets/coracaoo.png';
import congelarIcon from '../assets/congelar-icon.png'; 
import dobroXpIcon from '../assets/dobro-xp-icon.png';

// Componente de status (sem alteração, cores semânticas)
const UserStat = ({ iconSrc, value, color }) => (
    <div className="flex items-center gap-3">
        <img src={iconSrc} alt="Ícone de Status" className="w-8 h-8" />
        <span className={`font-bold text-xl ${color}`}>{value}</span>
    </div>
);

// Este é o novo componente para a barra lateral da loja
export default function LojaSidebar() {
  // 2. LER O TEMA
  const { theme } = useSettings();
  
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
      setAnimationClass('anim-enter');
  }, []); 

  return (
    // 3. ATUALIZAR FUNDO DA SIDEBAR
    <aside className={`w-96 p-6 space-y-6 fixed top-0 right-0 h-screen overflow-y-auto hidden lg:block ${animationClass} ${
        theme === 'escuro' 
        ? 'bg-gray-900 border-l border-gray-700' 
        : 'bg-[#F9F8FF] border-l border-slate-200'
    }`}>
      
      {/* 4. ATUALIZAR CARD DE STATUS */}
      <div className={`flex justify-around items-center p-2 rounded-xl ${
        theme === 'escuro' ? 'bg-gray-800' : 'bg-slate-50'
      }`}>
        <UserStat iconSrc={fireIconImg} value="1" color="text-orange-500" />
        <UserStat iconSrc={lcoinIconImg} value="50" color="text-amber-500" />
        <UserStat iconSrc={heartIconImg} value="5" color="text-red-500" />
      </div>

      {/* 5. ATUALIZAR CARD "CONGELAR SEQUÊNCIA" */}
      <div className={`p-5 flex items-center gap-4 w-full rounded-3xl border-2 ${
        theme === 'escuro' 
        ? 'bg-gray-800 border-purple-800' 
        : 'bg-white border-purple-400'
      }`}>
        
        <img 
          src={congelarIcon} 
          alt="Congelar Sequência" 
          className="flex-shrink-0 w-20 h-20 rounded-2xl object-contain" 
        />
        
        <div className="flex-1">
            <h3 className={`font-bold text-xl leading-tight ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-700'}`}>Congelar Sequência</h3>
            <p className={`text-sm mb-2 ${theme === 'escuro' ? 'text-purple-500' : 'text-purple-600'}`}>Congele sua sequência por 24h mesmo se você não praticar</p>
            
            <div className="flex items-center gap-1.5">
                <img src={lcoinIconImg} alt="L-Coin" className="w-6 h-6" />
                <span className={`font-bold text-xl ${theme === 'escuro' ? 'text-blue-400' : 'text-blue-600'}`}>400</span>
            </div>
        </div>
      </div>

      {/* 6. ATUALIZAR CARD "DOBRO DE XP" */}
      <div className={`p-5 flex items-center gap-4 w-full rounded-3xl border-2 ${
        theme === 'escuro' 
        ? 'bg-gray-800 border-purple-800' 
        : 'bg-white border-purple-400'
      }`}>
        
        <img 
          src={dobroXpIcon} 
          alt="Dobro de XP" 
          className="flex-shrink-0 w-20 h-20 rounded-2xl object-contain" 
        /> 
        
        <div className="flex-1">
            <h3 className={`font-bold text-xl leading-tight ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-700'}`}>Dobro de XP</h3>
            <p className={`text-sm mb-2 ${theme === 'escuro' ? 'text-purple-500' : 'text-purple-600'}`}>Ganhe o dobro de XP durante 1 hora</p>
            
            <div className="flex items-center gap-1.5">
                <img src={lcoinIconImg} alt="L-Coin" className="w-6 h-6" />
                <span className={`font-bold text-xl ${theme === 'escuro' ? 'text-blue-400' : 'text-blue-600'}`}>250</span>
            </div>
        </div>
      </div>
      
    </aside>
  );
}