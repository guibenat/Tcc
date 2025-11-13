import React, { useState, useEffect } from 'react';
// 1. IMPORTAR O HOOK
import { useSettings } from './SettingsContext'; 
import Swal from 'sweetalert2'; // <-- Importar o SweetAlert

// --- Imagens (Sem alteração) ---
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
  // --- INÍCIO DA MODIFICAÇÃO (Hooks) ---
  const { 
    theme, 
    lives, 
    lcoins, 
    dailyStreak, 
    setLcoins,
    isStreakFreezeActive, setIsStreakFreezeActive, // <-- Pega estado do "Congelar"
    doubleXpExpiresAt, setDoubleXpExpiresAt // <-- Pega estado do "Dobro XP"
  } = useSettings();
  
  const [animationClass, setAnimationClass] = useState('');
  // Estado para o timer do Dobro XP
  const [doubleXpTimeLeft, setDoubleXpTimeLeft] = useState(0);
  // --- FIM DA MODIFICAÇÃO ---

  useEffect(() => {
      setAnimationClass('anim-enter');
  }, []); 

  // --- INÍCIO DA MODIFICAÇÃO (Timer do Dobro XP) ---
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
        setDoubleXpExpiresAt(null); // Limpa o estado quando expira
      } else {
        setDoubleXpTimeLeft(timeLeftMs);
      }
    };

    calculateTimeLeft(); // Calcula imediatamente
    const interval = setInterval(calculateTimeLeft, 1000); // Atualiza a cada segundo
    return () => clearInterval(interval); // Limpa o intervalo
  }, [doubleXpExpiresAt, setDoubleXpExpiresAt]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isDoubleXpActive = doubleXpTimeLeft > 0;
  // --- FIM DA MODIFICAÇÃO ---


  // --- INÍCIO DA MODIFICAÇÃO (Função de Compra) ---
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

    // 3. Ajusta o texto do botão (Dobro XP)
    let confirmButtonText = 'Sim, comprar!';
    if (itemName === "Dobro de XP" && isDoubleXpActive) {
        confirmButtonText = 'Sim, reativar!'; // Muda o texto do botão se já estiver ativo
    }

    // 4. Pop-up de confirmação
    Swal.fire({
        title: 'Confirmar Compra?',
        html: `Você deseja gastar <strong class="text-purple-500">${cost} Lcoins</strong> para comprar "${itemName}"?`,
        icon: 'question',
        iconColor: '#a855f7',
        showCancelButton: true,
        confirmButtonText: confirmButtonText, // <-- Texto dinâmico
        cancelButtonText: 'Cancelar',
        customClass: getSwalCustomClasses(),
        buttonsStyling: false,
        background: getSwalBackground()
    }).then((result) => {
        if (result.isConfirmed) {
            // 5. Debita as Lcoins (O Contexto salvará)
            setLcoins(prevLcoins => prevLcoins - cost);
            
            // 6. ATIVA O ITEM COMPRADO (O Contexto salvará)
            if (itemName === "Congelar Sequência") {
                setIsStreakFreezeActive(true);
            }
            if (itemName === "Dobro de XP") {
                const expirationTime = Date.now() + 3600000; // 1 hora
                setDoubleXpExpiresAt(expirationTime);
            }

            // 7. REMOVIDO: Bloco de atualização manual do localStorage
            // O useEffect no SettingsContext cuidará disso automaticamente.
            // O código antigo aqui continha um bug (usava 'lcoins' estagnado).

            // 8. Sucesso
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
  // --- FIM DA MODIFICAÇÃO ---

  return (
    <aside className={`w-96 p-6 space-y-6 fixed top-0 right-0 h-screen overflow-y-auto hidden lg:block ${animationClass} ${
        theme === 'escuro' 
        ? 'bg-gray-900 border-l border-gray-700' 
        : 'bg-[#F9F8FF] border-l border-slate-200'
    }`}>
      
      {/* --- Card de Status Dinâmico (Sem alteração) --- */}
      <div className={`flex justify-around items-center p-2 rounded-xl ${
        theme === 'escuro' ? 'bg-gray-800' : 'bg-slate-50'
      }`}>
        <UserStat iconSrc={fireIconImg} value={dailyStreak} color="text-orange-500" />
        <UserStat iconSrc={lcoinIconImg} value={lcoins} color="text-amber-500" />
        <UserStat iconSrc={heartIconImg} value={lives} color="text-red-500" />
      </div>
      {/* --- FIM --- */}

      {/* --- INÍCIO DA MODIFICAÇÃO (Buffs Ativos) --- */}
      {isStreakFreezeActive && (
        <div className={`p-4 flex items-center gap-3 w-full rounded-2xl border ${
            theme === 'escuro' 
            ? 'bg-gray-800 border-blue-600' 
            : 'bg-white border-blue-400'
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
            theme === 'escuro' 
            ? 'bg-gray-800 border-yellow-600' 
            : 'bg-white border-yellow-400'
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
      {/* --- FIM DA MODIFICAÇÃO --- */}

      {/* --- INÍCIO DA MODIFICAÇÃO (Cards Clicáveis) --- */}
      {/* Card "Congelar Sequência" */}
      <div 
        // Adiciona lógica de "disabled"
        onClick={() => !isStreakFreezeActive && handleBuyItem(400, "Congelar Sequência")}
        className={`p-5 flex items-center gap-4 w-full rounded-3xl border-2 transition-all transform ${
          isStreakFreezeActive 
          ? 'opacity-60 cursor-not-allowed' // Estilo de desabilitado
          : 'cursor-pointer hover:scale-105' // Estilo normal
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
      {/* --- FIM DA MODIFICAÇÃO --- */}
      
    </aside>
  );
}