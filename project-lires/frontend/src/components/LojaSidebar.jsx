import React, { useState, useEffect } from 'react';
// Puxo meu hook do Contexto para acessar o estado global
import { useSettings } from '../components/SettingsContext'; 
import Swal from 'sweetalert2'; // Para os pop-ups de confirmação

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

/**
 * Componente: LojaSidebar
 * A barra lateral que mostra o status do usuário e permite a compra de power-ups.
 */
export default function LojaSidebar() {
  // Puxo tudo o que preciso do meu SettingsContext.
  const { 
    theme, 
    lives, 
    lcoins, 
    dailyStreak, 
    setLcoins,
    isStreakFreezeActive, setIsStreakFreezeActive, // Estado do "Congelar"
    doubleXpExpiresAt, setDoubleXpExpiresAt // Estado do "Dobro XP"
  } = useSettings();
 
  const [animationClass, setAnimationClass] = useState('');
  // Estado para o timer do Dobro XP (para o cronômetro local)
  const [doubleXpTimeLeft, setDoubleXpTimeLeft] = useState(0);

  // Animação de entrada
  useEffect(() => {
      setAnimationClass('anim-enter');
  }, []); 

  // --- Lógica: Timer do Dobro XP ---
  useEffect(() => {
    if (!doubleXpExpiresAt) {
      setDoubleXpTimeLeft(0);
      return;
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const timeLeftMs = doubleXpExpiresAt - now;

      if (timeLeftMs <= 0) {
        setDoubleXpTimeLeft(0);
        setDoubleXpExpiresAt(null); // Limpa o estado global quando expira
      } else {
        setDoubleXpTimeLeft(timeLeftMs);
      }
    };

    calculateTimeLeft(); // Calcula imediatamente
    const interval = setInterval(calculateTimeLeft, 1000); // Atualiza a cada segundo
    return () => clearInterval(interval); // Limpa o intervalo no unmount
  }, [doubleXpExpiresAt, setDoubleXpExpiresAt]);

  // Helper para formatar milissegundos em MM:SS
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isDoubleXpActive = doubleXpTimeLeft > 0;
  // --- Fim da Lógica do Timer ---

  // --- Lógica: Compra de Itens ---
  const getSwalCustomClasses = () => ({
    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
    title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
    confirmButton: 'bg-purple-500 hover:bg-purple-600 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
    cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
  });
  const getSwalBackground = () => (theme === 'escuro' ? '#1f2937' : '#fff');

  const handleBuyItem = (cost, itemName) => {
    // 1. Verifica se tem Lcoins suficientes
    if (lcoins < cost) {
        Swal.fire({
            title: 'Lcoins Insuficientes!',
            text: `Você precisa de ${cost} Lcoins para comprar "${itemName}", mas você só tem ${lcoins}.`,
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: getSwalCustomClasses(),
            buttonsStyling: false,
            background: getSwalBackground()
        });
        return;
    }

    // 2. Verifica se já possui o item (Congelar)
    if (itemName === "Congelar Sequência" && isStreakFreezeActive) {
        Swal.fire({
            title: 'Item já Ativo!',
            text: 'Você já possui um "Congelar Sequência". Ele será usado automaticamente se você perder um dia.',
            icon: 'info',
            confirmButtonText: 'Entendi',
            customClass: getSwalCustomClasses(),
            buttonsStyling: false,
            background: getSwalBackground()
        });
        return;
    }

    // 3. Pop-up de confirmação (com texto dinâmico para "Reativar")
    let confirmButtonText = 'Sim, comprar!';
    if (itemName === "Dobro de XP" && isDoubleXpActive) {
        confirmButtonText = 'Sim, reativar!'; 
    }

    Swal.fire({
        title: 'Confirmar Compra?',
        html: `Você deseja gastar <strong class="text-purple-500">${cost} Lcoins</strong> para comprar "${itemName}"?`,
        icon: 'question',
        iconColor: '#a855f7',
        showCancelButton: true,
        confirmButtonText: confirmButtonText, 
        cancelButtonText: 'Cancelar',
        customClass: getSwalCustomClasses(),
        buttonsStyling: false,
        background: getSwalBackground()
    }).then((result) => {
        if (result.isConfirmed) {
            // 4. Debita as Lcoins e Ativa o item (atualizando o Contexto)
            setLcoins(prevLcoins => prevLcoins - cost);
            
            if (itemName === "Congelar Sequência") {
                setIsStreakFreezeActive(true);
            }
            if (itemName === "Dobro de XP") {
                const expirationTime = Date.now() + 3600000; // 1 hora
                setDoubleXpExpiresAt(expirationTime);
            }

            // 5. Sucesso
            Swal.fire({
                title: 'Compra Efetuada!',
                text: `Você comprou "${itemName}" por ${cost} Lcoins.`,
                icon: 'success',
                confirmButtonText: 'Legal!',
                customClass: getSwalCustomClasses(),
                buttonsStyling: false,
                background: getSwalBackground()
            });
        }
    });
  };
  // --- Fim da Lógica de Compra ---


  return (
    <aside className={`w-96 p-6 space-y-6 fixed top-0 right-0 h-screen overflow-y-auto hidden lg:block ${animationClass} ${
        theme === 'escuro' 
        ? 'bg-gray-900 border-l border-gray-700' 
        : 'bg-[#F9F8FF] border-l border-slate-200'
    }`}>
      
      {/* 1. Card de Status Dinâmico (Streak, Lcoins, Vidas) */}
      <div className={`flex justify-around items-center p-2 rounded-xl ${
        theme === 'escuro' ? 'bg-gray-800' : 'bg-slate-50'
      }`}>
        <UserStat iconSrc={fireIconImg} value={dailyStreak} color="text-orange-500" />
        <UserStat iconSrc={lcoinIconImg} value={lcoins} color="text-amber-500" />
        <UserStat iconSrc={heartIconImg} value={lives} color="text-red-500" />
      </div>

      {/* 2. Buffs Ativos (Condicional) */}
      {isStreakFreezeActive && (
        <div className={`p-4 flex items-center gap-3 w-full rounded-2xl border ${
            theme === 'escuro' ? 'bg-gray-800 border-blue-600' : 'bg-white border-blue-400'
        }`}>
          <img src={congelarIcon} alt="Congelar" className="w-10 h-10" />
          <div>
            <h4 className={`font-bold ${theme === 'escuro' ? 'text-blue-300' : 'text-blue-700'}`}>Congelar Sequência Ativo</h4>
            <p className={`text-sm ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>Sua sequência está protegida!</p>
          </div>
        </div>
      )}
      {isDoubleXpActive && (
        <div className={`p-4 flex items-center gap-3 w-full rounded-2xl border ${
            theme === 'escuro' ? 'bg-gray-800 border-yellow-600' : 'bg-white border-yellow-400'
        }`}>
          <img src={dobroXpIcon} alt="Dobro XP" className="w-10 h-10" />
          <div>
            <h4 className={`font-bold ${theme === 'escuro' ? 'text-yellow-300' : 'text-yellow-700'}`}>Dobro de XP Ativo</h4>
            <p className={`text-sm font-semibold ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>
              Tempo restante: {formatTime(doubleXpTimeLeft)}
            </p>
          </div>
        </div>
      )}

      {/* 3. Cards de Compra */}
      {/* Card "Congelar Sequência" */}
      <div 
        // O clique é condicional: só chama a compra se o item NÃO estiver ativo
        onClick={() => !isStreakFreezeActive && handleBuyItem(400, "Congelar Sequência")}
        className={`p-5 flex items-center gap-4 w-full rounded-3xl border-2 transition-all transform ${
          isStreakFreezeActive 
          ? 'opacity-60 cursor-not-allowed' 
          : 'cursor-pointer hover:scale-105'
        } ${
        theme === 'escuro' 
        ? 'bg-gray-800 border-purple-800 hover:border-purple-600' 
        : 'bg-white border-purple-400 hover:border-purple-600'
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

      {/* Card "Dobro de XP" */}
      <div 
        // Permite o clique sempre, a função de compra decide se deve reativar
        onClick={() => handleBuyItem(250, "Dobro de XP")}
        className={`p-5 flex items-center gap-4 w-full rounded-3xl border-2 cursor-pointer transition-transform transform hover:scale-105 ${
        theme === 'escuro' 
        ? 'bg-gray-800 border-purple-800 hover:border-purple-600' 
        : 'bg-white border-purple-400 hover:border-purple-600'
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