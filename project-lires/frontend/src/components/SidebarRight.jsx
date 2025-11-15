import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegar com o clique
// Puxo meu hook de Contexto. Corrigi o case para 'SettingsContext'
import { useSettings } from './SettingsContext'; 

// --- Imagens da Sidebar ---
import userAvatarImg from '../assets/perfil.png'; // Fallback
import moneyBagImg from '../assets/bolsinha-dinheiro.png';
import fireIconImg from '../assets/foguinho.png';
import lcoinIconImg from '../assets/lcoin.png';
import heartIconImg from '../assets/coracaoo.png';
import liresMasterLogoImg from '../assets/lires-master-logo.png'; 
import robotMascotImg from '../assets/robot-mascot.png';     
import AdImage from '../assets/anuncio.png'; // Placeholder

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
    if (!seed) {
        return userAvatarImg; // Retorna o placeholder se não tiver seed
    }
    return `https://api.dicebear.com/7.x/${finalStyle}/svg?seed=${seed}&radius=50&backgroundColor=${colorPalette}`;
};

/**
 * Componente: UserStat
 * Mini-display reutilizável para os ícones (fogo, lcoin, coração).
 */
const UserStat = ({ iconSrc, value, color }) => (
    <div className="flex items-center gap-3">
        <img src={iconSrc} alt="Ícone de Status" className="w-8 h-8" />
        <span className={`font-bold text-xl ${color}`}>{value}</span>
    </div>
);

/**
 * Componente Principal: SidebarRight
 * A barra lateral direita (fixa) que mostra status, premium, missões e anúncios.
 * Visível apenas em desktop (lg:block).
 */
export default function SidebarRight() {
  // Puxo todos os dados dinâmicos do usuário e o tema do Contexto
  const { theme, lives, lcoins, dailyStreak, timeSpentToday } = useSettings();
  const navigate = useNavigate(); // Hook para o botão de Assinatura

  // Estado para o avatar (começa com o placeholder)
  const [avatarUrl, setAvatarUrl] = useState(userAvatarImg); 

  // Efeito para carregar o avatar do usuário logado (só roda 1 vez no mount)
  useEffect(() => {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
        const user = JSON.parse(userString);
        // Gera a URL do avatar com a seed e o estilo salvos
        setAvatarUrl(getAvatarUrl(user?.avatarSeed || user?.username, user?.avatarStyle));
    }
  }, []); // [] = Roda só no 'mount'

  // --- Lógica de XP (Meta Diária) ---
  // A meta diária é baseada no tempo gasto (que estou tratando como XP)
  // TODO: Mudar essa variável 'timeSpentToday' para 'dailyXp' no Contexto depois
  const DAILY_XP_GOAL = 250; // Meta de 250 XP/min por dia
  
  // Pego o 'timeSpentToday' (que está em minutos no Contexto) e trato como XP
  const currentXp = Math.floor(timeSpentToday || 0); 
  // Calculo a porcentagem da barra, com um teto (Math.min) de 100%
  const xpPercentage = Math.min((currentXp / DAILY_XP_GOAL) * 100, 100);

  return (
    // Container principal da Sidebar (fixo, à direita, só em 'lg')
    <aside className={`
      w-96 p-6 space-y-6 fixed top-0 right-0 h-screen overflow-y-auto hidden lg:block
      ${theme === 'escuro' 
        ? 'bg-gray-900 border-l border-gray-700' 
        : 'bg-[#F9F8FF] border-l border-slate-200'}
    `}>
      
      {/* 1. Bloco de User Stats (Vidas, Lcoins, Streak) */}
      <div className={`
        flex justify-around items-center p-2 rounded-xl
        ${theme === 'escuro' ? 'bg-gray-800' : 'bg-slate-50'}
      `}>
        <UserStat iconSrc={fireIconImg} value={dailyStreak} color="text-orange-500" />
        <UserStat iconSrc={lcoinIconImg} value={lcoins} color="text-amber-500" />
        <UserStat iconSrc={heartIconImg} value={lives} color="text-red-500" />
      </div>

      {/* 2. Card Lires Master (Premium) */}
      <div className="p-1 rounded-[24px] bg-gradient-to-br from-teal-200 to-blue-300">
        <div className="bg-gradient-to-br from-blue-800 via-indigo-900 to-black text-white rounded-[20px] relative overflow-hidden p-5">
          <div className="flex justify-between items-center">
            <div className="relative z-10">
              <img src={liresMasterLogoImg} alt="Líres Master" className="w-32 mb-3" />
              <p className="font-bold text-lg text-white mb-1">Seja MASTER agora!</p>
              <p className="text-xs text-blue-200 mb-4 leading-snug">
                Sem anuncios, vida ilimitada e<br/>skins gratis!
              </p>
              {/* Botão que navega para a página de assinatura */}
              <button 
                onClick={() => navigate('/configuracoes/assinatura')}
                className="bg-gradient-to-r from-[#D7A3EB] to-[#9E57C3] text-white font-bold py-2 px-6 rounded-full w-fit shadow-lg hover:brightness-110 transition-all"
              >
                Assine agora
              </button>
            </div>
            {/* Imagem do mascote (posicionada absoluta) */}
            <div className="absolute right-[-25px] bottom-[-15px] w-40 h-40 z-0">
              <img src={robotMascotImg} alt="Robô Mascote" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Card de Missões (Meta Diária de XP) */}
      <div className={`
        p-5 rounded-2xl space-y-4
        ${theme === 'escuro' 
          ? 'bg-gray-800 border border-purple-800' 
          : 'bg-purple-50 border border-purple-200'}
      `}>
        <div className="flex flex-col">
          <h3 className={`font-bold text-lg ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-800'}`}>
            Missões
          </h3>
          <span className={`text-sm ${theme === 'escuro' ? 'text-purple-500' : 'text-purple-600'}`}>
            Complete para ganhar recompensas
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div>
            {/* Avatar dinâmico do usuário */}
            <img 
              src={avatarUrl} 
              alt="Avatar do Usuário" 
              className="w-12 h-12 rounded-full border-2 border-purple-200 bg-white" 
            />
          </div>
          {/* Barra de Progresso de XP */}
          <div className="flex-1 relative">
            {/* Fundo da barra */}
            <div className={`
              rounded-full h-6 w-full
              ${theme === 'escuro' ? 'bg-gray-600' : 'bg-slate-200'}
            `}>
              {/* Preenchimento (com 'width' dinâmico) */}
              <div 
                className="bg-gradient-to-r from-purple-400 to-indigo-500 h-6 rounded-full" 
                style={{ width: `${xpPercentage}%` }} // A largura é controlada pelo %
              ></div>
            </div>
            {/* Texto (XP / Meta) por cima da barra */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xs">{currentXp} / {DAILY_XP_GOAL} XP</span>
            </div>
          </div>
          {/* Recompensa */}
          <div className="flex flex-col items-center">
            <span className="font-bold text-amber-600 text-sm">+50</span>
            <img src={moneyBagImg} alt="Recompensa em Lcoins" className="w-12 h-12" />
          </div>
        </div>
      </div>
      
      {/* 4. Card de Anúncio (Placeholder) */}
      <div className={`
        p-4 rounded-2xl border text-center flex-shrink-0
        ${theme === 'escuro' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-slate-200'}
      `}>
        <div className="bg-slate-800 rounded-lg h-32 flex items-center justify-center">
          <img src={AdImage} alt="Anúncio" className="h-full w-full object-cover rounded-lg"/>
        </div>
      </div>
      
      {/* 5. Footer com links */}
      <footer className={`
        text-xs text-center space-x-2 pt-4 flex-shrink-0
        ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}
      `}>
        <a href="#" className="hover:underline">Sobre</a>
        <a href="#" className="hover:underline">Loja</a>
        <a href="#" className="hover:underline">Investidores</a>
        <a href="#" className="hover:underline">Privacidade</a>
        <a href="#" className="hover:underline">Termos de uso</a>
      </footer>
    </aside>
  );
}