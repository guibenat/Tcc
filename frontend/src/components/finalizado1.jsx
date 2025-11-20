import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../components/SettingsContext'; 

// --- Imports dos Assets ---
import liresLogoImage from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png'; 
import robotCongratsImage from '../assets/robo-congrats.png'; 
import flameImage from '../assets/flame.png'; 
import lcoinImage from '../assets/lcoin.png';
import lockedAchievementImage from '../assets/locked-Achievement.png';
import unlockedAchievementImage from '../assets/unlocked-Achievement.png';
import achievementBadgeImage from '../assets/achievement-Badge.png';
import robotIconImage from '../assets/robot-Icon.png';

// Importo o mapa de conquistas para saber qual lição desbloqueia qual conquista
import { achievementsMap } from '../lessons/achievementsMap'; 

// Todas as animações @keyframes usadas nesta tela
const animations = `
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
  @keyframes ignite { 0%, 20% { filter: grayscale(1); transform: scale(0.8) translateX(0); opacity: 0.5; } 30% { transform: scale(0.82) translateX(-2px); } 40% { transform: scale(0.85) translateX(2px); } 50% { transform: scale(0.88) translateX(-1px); } 60% { transform: scale(0.9) translateX(1px); } 70% { transform: scale(0.95) translateX(0); filter: grayscale(0.5); opacity: 0.8; } 100% { filter: grayscale(0); transform: scale(1) translateX(0); opacity: 1; } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-3px) rotate(-2deg); } 75% { transform: translateX(3px) rotate(2deg); } }
  @keyframes glow-pop-in { 0% { opacity: 0; transform: scale(0.5); box-shadow: 0 0 0px rgba(255, 215, 0, 0); } 70% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 40px 20px rgba(255, 215, 0, 0.7); } 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0.4); } }
  @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
  @keyframes coin-drop-glow { 0% { transform: translateY(-200px) scale(0.5); opacity: 0; } 50% { transform: translateY(0) scale(1.1); opacity: 1; } 70% { transform: translateY(-15px) scale(0.95); } 80% { transform: translateY(0) scale(1.05); } 100% { transform: translateY(0) scale(1); } }
`;


/**
 * Componente: CountUp
 * Anima um número de 0 até o valor 'end' durante 'duration'.
 * Só começa quando 'start' for verdadeiro.
 */
const CountUp = ({ end, duration, start }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // Não faz nada se 'start' for falso
        if (!start) return; 
        let startVal = 0; 
        const endValue = parseInt(end, 10); 
        // Se o fim for 0, só seta 0 e pronto
        if (endValue === 0) { setCount(0); return; } 
        // Lógica de animação frame-a-frame (baseado em 60fps)
        const totalFrames = Math.round(duration / (1000 / 60)); 
        const increment = endValue / totalFrames; 
        const counter = setInterval(() => { 
            startVal += increment; 
            if (startVal > endValue) { 
                setCount(endValue); 
                clearInterval(counter); 
            } else { 
                setCount(Math.ceil(startVal)); 
            } 
        }, 16); // 16ms = ~60fps
        return () => clearInterval(counter);
    }, [end, duration, start]);
    return <span>{count}</span>;
};

/**
 * Tela 1: Parabéns (Resumo da Lição)
 * Mostra erros, exercícios feitos e XP ganho.
 */
function CongratulationsScreen({ onContinue, errorCount, totalExercises, xpGained }) {
    const { theme } = useSettings();
    // Controla quando a animação do CountUp deve começar
    const [startCounting, setStartCounting] = useState(false);
    
    // Timer para atrasar o início das animações (efeito de entrada)
    useEffect(() => { 
        const timer = setTimeout(() => setStartCounting(true), 600); 
        return () => clearTimeout(timer); 
    }, []);
    
    // Helper pra aplicar animação de fade-in-up com delay
    const animationStyle = (delay) => ({ 
        animation: `fadeInUp 0.5s ease-out ${delay}s forwards`, 
        opacity: 0, 
    });
    
    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 ${
            theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            {/* Header com Logo */}
            <div className="w-full flex justify-start">
                <img 
                    src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                    alt="Lires Logo" 
                    className="h-24" 
                />
            </div>
            
            {/* Conteúdo Central */}
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ ...animationStyle(0.2), backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Parabéns!
                </h1>
                <p className={`text-xl sm:text-2xl mb-8 ${
                    theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'
                }`} style={animationStyle(0.4)}>
                    Você concluiu a atividade!
                </p>
                
                {/* Contadores de Erros, Exercícios e XP */}
                <div className="flex flex-col gap-2 mb-8 text-lg text-center" style={animationStyle(0.6)}>
                    <p className={`font-bold tracking-wider ${
                        theme === 'escuro' ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                        <CountUp end={errorCount} duration={1000} start={startCounting} /> ERROS
                    </p>
                    <p className="font-bold text-blue-600 tracking-wider">
                        <CountUp end={totalExercises} duration={1000} start={startCounting} /> EXERCÍCIOS FEITOS
                    </p>
                    <p className="font-bold text-yellow-500 tracking-wider">
                        +<CountUp end={xpGained} duration={1000} start={startCounting} /> XP
                    </p>
                </div>

                {/* Robô flutuando */}
                <img src={robotCongratsImage} alt="Robô Festejando" className="w-40 h-40 sm:w-48 sm:h-48" style={{ ...animationStyle(0.8), animationName: 'float, fadeInUp', animationDuration: '3s, 0.5s', animationTimingFunction: 'ease-in-out, ease-out', animationIterationCount: 'infinite, 1', animationDelay: '0s, 0.8s', animationFillMode: 'forwards' }} />
            </div>
            
            {/* Botão de Continuar */}
            <div className="w-full flex justify-end">
                <button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                    Continuar
                </button>
            </div>
        </div>
    );
}

/**
 * Tela 2: Sequência Ativa
 * Mostra a animação da chama (flame) se for a primeira lição do dia.
 */
function SequenciaAtivaScreen({ onContinue }) {
    const { theme, dailyStreak } = useSettings();
    const [isAnimating, setIsAnimating] = useState(false);
    const sequenceCount = dailyStreak; // Pega a sequência atual do contexto

    // Ativa a animação da chama (ignite)
    useEffect(() => { 
        const timer = setTimeout(() => { setIsAnimating(true); }, 100); 
        return () => clearTimeout(timer); 
    }, []);
    
    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 ${
            theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            {/* Header */}
            <div className="w-full flex justify-start">
                <img 
                    src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                    alt="Lires Logo" 
                    className="h-24" 
                />
            </div>
            
            {/* Conteúdo Central */}
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="relative mb-4">
                    {/* A chama */}
                    <img src={flameImage} alt="Chama" className="h-32 w-32" 
                         style={isAnimating ? { animation: 'ignite 1.5s ease-in-out forwards' } : { filter: 'grayscale(1)', transform: 'scale(0.8)', opacity: 0.5 }} />
                    {/* O contador da sequência (só aparece quando a animação da chama termina) */}
                    {isAnimating && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg" 
                             style={{ backgroundImage: 'linear-gradient(to top, #ef4444, #f87171)', animation: 'popIn 0.4s ease-out 1.3s forwards', opacity: 0 }}>
                            {sequenceCount}
                        </div>
                    )}
                </div>
                <p className="text-xl font-semibold mb-8" style={{ animation: isAnimating ? 'fadeInUp 0.5s ease-out 1.5s forwards' : 'none', opacity: 0, backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Continue praticando todos os dias para<br />manter sua sequência ativa
                </p>
            </div>
            
            {/* Botão de Continuar */}
            <div className="w-full flex justify-end">
                <button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                    Continuar
                </button>
            </div>
        </div>
    );
}

/**
 * Tela 3: Recompensa de Conquista
 * Tela dinâmica que mostra o progresso das conquistas.
 * Recebe o 'unlockedLessonId' para saber qual conquista foi desbloqueada.
 */
function AchievementRewardScreen({ onContinue, unlockedLessonId }) {
    const { theme } = useSettings();
    const [progress, setProgress] = useState(0); // Animação da barra de progresso
    const [isShaking, setIsShaking] = useState(false); // Animação do cadeado
    const [isUnlocked, setIsUnlocked] = useState(false); // Controla a UI (textos, etc)
    const [showModal, setShowModal] = useState(false); // O pop-up do emblema
    const [textKey, setTextKey] = useState(1); // Usado para reanimar o texto
    
    // --- Lógica Dinâmica ---
    const achievements = achievementsMap;
    // Encontra o ÍNDICE da conquista que acabamos de desbloquear
    const unlockedIndex = achievements.findIndex(ach => ach.id === unlockedLessonId);
    // Pega os dados da conquista (título, descrição)
    const unlockedAchievement = achievements[unlockedIndex] ?? achievements[0]; // Fallback
    const totalAchievements = achievements.length;

    // Orquestrador da animação da tela
    useEffect(() => {
        // Se a lição não desbloqueia uma conquista (índice -1), não faz nada.
        if (unlockedIndex < 0) {
            console.error("Conquista não encontrada para o ID:", unlockedLessonId);
            return;
        }

        // Calcula o progresso (ex: de 2/7 para 3/7)
        const currentProgressPercent = ((unlockedIndex + 1) / totalAchievements) * 100;
        const prevProgressPercent = (unlockedIndex / totalAchievements) * 100;

        // Começa a barra no progresso anterior
        setProgress(prevProgressPercent);
        
        // Seta os timers para a sequência de animação
        const progressTimer = setTimeout(() => { setProgress(currentProgressPercent); }, 1000); // 1. Anima a barra
        const shakeTimer = setTimeout(() => { setIsShaking(true); }, 3000); // 2. Começa a tremer o cadeado
        const unlockTimer = setTimeout(() => { setIsShaking(false); setIsUnlocked(true); }, 4500); // 3. Para de tremer e atualiza a UI
        const modalShowTimer = setTimeout(() => { setShowModal(true); }, 4800); // 4. Mostra o pop-up do emblema
        const modalHideTimer = setTimeout(() => { setShowModal(false); setTextKey(2); }, 7300); // 5. Esconde o pop-up e troca o texto
        
        return () => { 
            clearTimeout(progressTimer); 
            clearTimeout(shakeTimer); 
            clearTimeout(unlockTimer); 
            clearTimeout(modalShowTimer); 
            clearTimeout(modalHideTimer); 
        };
    }, [unlockedIndex, totalAchievements, unlockedLessonId]);

    // Se o ID da lição não corresponde a nenhuma conquista, pulamos esta tela.
    if (unlockedIndex < 0) {
        useEffect(() => {
            onContinue(); // Chama o 'Continuar' imediatamente
        }, [onContinue]);
        return null; // Não renderiza nada
    }

    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 relative overflow-hidden ${
            theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            
            {/* Pop-up do Emblema (aparece e desaparece) */}
            {showModal && (
                <div style={{ animation: 'glow-pop-in 0.7s forwards, fade-out 0.5s 2.2s forwards' }} className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <p className="text-4xl font-bold mb-2" style={{color: '#8A2BE2'}}>{unlockedAchievement.title}</p>
                    <p className="text-3xl font-bold mb-4" style={{color: '#FFFF00'}}>{unlockedAchievement.description}</p>
                    <img src={achievementBadgeImage} alt="Conquista Desbloqueada" className="w-72 h-72" />
                </div>
            )}
            
            {/* Header */}
            <div className="w-full flex justify-start">
                <img 
                    src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                    alt="Lires Logo" 
                    className="h-24" 
                />
            </div>
            
            {/* Conteúdo Central */}
            <div className="flex-grow flex flex-col items-center justify-center text-center w-full max-w-5xl">
                {/* Texto de incentivo (só aparece depois da animação) */}
                {isUnlocked ? (
                    <div key={textKey} style={{animation: 'fadeInUp 0.5s forwards'}}>
                        <p className="text-2xl font-semibold mb-4" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Continue as atividades para desbloquear mais conquistas
                        </p>
                        <img src={robotIconImage} alt="Ícone Robô" className="h-16 mb-8 mx-auto" />
                    </div>
                ) : (
                    // Placeholder para manter o layout estável antes do texto aparecer
                    <div className="h-28"></div> 
                )}
                
                {/* Barra de Progresso das Conquistas */}
                <div className="w-full relative mt-12">
                    {/* Fundo da barra */}
                    <div className={`w-full h-4 rounded-full relative ${
                        theme === 'escuro' ? 'bg-gray-700' : 'bg-purple-200'
                    }`}>
                        {/* Preenchimento (animado) */}
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${progress}%`, transition: 'width 2s ease-out' }}></div>
                    </div>
                    
                    {/* Ícones de Cadeado/Conquista na barra */}
                    <div className="absolute -bottom-8 w-full flex justify-between px-2">
                        {achievements.map((ach, index) => (
                            <div key={index} className="relative w-16 h-16 flex items-center justify-center">
                                {/* Se o índice for MENOR OU IGUAL ao índice desbloqueado, mostra o emblema aberto */}
                                {index <= unlockedIndex ? (
                                    <img src={unlockedAchievementImage} alt="Conquista Desbloqueada" className="h-16 w-16"/>
                                ) : (
                                    // Senão, mostra o cadeado
                                    <img 
                                        src={lockedAchievementImage} 
                                        alt="Cadeado" 
                                        className="h-16 w-16" 
                                        // Aplica a animação 'shake' SÓ no próximo cadeado
                                        style={{ animation: index === (unlockedIndex + 1) && isShaking ? 'shake 1.5s' : 'none' }} 
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Botão de Continuar */}
            <div className="w-full flex justify-end">
                <button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                    Continuar
                </button>
            </div>
        </div>
    );
}

/**
 * Tela 4: Recompensa de LCoins
 * Dá 50 LCoins na primeira vez que a lição é completada.
 */
function LcoinsScreen({ onContinue, isFirstTime }) {
    const { theme, setLcoins } = useSettings(); 
    const [startAnimations, setStartAnimations] = useState(false);
    const rewardAmount = 50; 

    useEffect(() => {
        // Ativa a animação da moeda
        const timer = setTimeout(() => setStartAnimations(true), 100);
        
        // Adiciona as LCoins (só na primeira vez)
        if (isFirstTime) {
            console.log("finalizado1.jsx: Adicionando 50 Lcoins.");
            setLcoins(prevLcoins => prevLcoins + rewardAmount);
        } else {
            console.log("finalizado1.jsx: Não é a primeira vez, Lcoins já foram dadas.");
        }
        
        return () => clearTimeout(timer);
    }, [isFirstTime, setLcoins]); // Dependências
    
    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 ${
            theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            {/* Header */}
            <div className="w-full flex justify-start">
                <img 
                    src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                    alt="Lires Logo" 
                    className="h-24" 
                />
            </div>
            
            {/* Conteúdo Central */}
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                {/* Animação da moeda caindo */}
                <img src={lcoinImage} alt="Lcoin" className="w-32 h-32 mb-4" 
                     style={{ animation: startAnimations ? 'coin-drop-glow 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards' : 'none' }} />
                
                {/* Texto da recompensa */}
                <p className="text-2xl font-bold" 
                   style={{ animation: startAnimations ? 'fadeInUp 0.5s ease-out 1s forwards' : 'none', opacity: 0 }}>
                    {isFirstTime ? (
                        // Se for a primeira vez, mostra o CountUp
                        <>
                            <span style={{ color: '#FBC02D' }}>+<CountUp end={rewardAmount} duration={3000} start={startAnimations} /></span>
                            <span style={{ color: '#1E88E5' }}> LCOINS</span>
                        </>
                    ) : (
                        // Se não for, só mostra "Lição Refeita"
                        <span style={{ color: '#1E88E5' }}>Lição Refeita!</span>
                    )}
                </p>
            </div>
            
            {/* Botão de Continuar */}
            <div className="w-full flex justify-end">
                <button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                    Continuar
                </button>
            </div>
        </div>
    );
}

/**
 * Componente Principal: Finalizado1
 * Este é o "maestro" que controla a sequência das telas de finalização.
 * Ele puxa os dados da lição (via `useLocation`) e decide qual tela mostrar.
 */
export default function Finalizado1() {
    // Controla qual tela (congrats, sequence, achievements, lcoins) está ativa
    const [screen, setScreen] = useState('congrats'); 
    const navigate = useNavigate();
    const { state } = useLocation(); // Pega os dados passados pelo navigate() da lição
    
    // Puxa os dados da lição. Usa '??' para definir valores padrão caso algo dê errado.
    const errorCount = state?.errorCount ?? 0;
    const totalExercises = state?.totalExercises ?? 3;
    const isFirstTime = state?.isFirstTime ?? false; // É a 1ª vez que completa esta lição?
    const xpGained = state?.xpGained ?? 5;
    const isFirstLessonOfDay = state?.isFirstLessonOfDay ?? false; // É a 1ª lição do dia (pra mostrar a sequência)?
    const lessonId = state?.lessonId ?? null; // O ID da lição (ex: 'comecar-do-zero')

    // Verifica se a lição que acabamos de completar está no mapa de conquistas
    const unlocksAchievement = achievementsMap.some(ach => ach.id === lessonId);

    /**
     * Lógica de Navegação (A Máquina de Estados)
     * Chamada toda vez que o botão "Continuar" é pressionado.
     * Define qual é a PRÓXIMA tela a ser mostrada.
     */
    const handleNavigation = () => {
        // Se estamos na tela de 'congrats':
        if (screen === 'congrats') {
            // 1. Deve mostrar a sequência? (Se for a 1ª lição do dia)
            if (isFirstLessonOfDay) {
                setScreen('sequence');
            } 
            // 2. Se não, deve mostrar a conquista? (Se for a 1ª vez E se esta lição desbloquear uma)
            else if (unlocksAchievement && isFirstTime) { 
                setScreen('achievements');
            }
            // 3. Se não for nenhum desses, vai direto para Lcoins
            else {
                setScreen('lcoins');
            }
        } 
        // Se estamos na tela de 'sequence':
        else if (screen === 'sequence') {
            // 1. Depois da sequência, deve mostrar a conquista?
            if (unlocksAchievement && isFirstTime) {
                setScreen('achievements');
            }
            // 2. Se não, vai para Lcoins
            else {
                setScreen('lcoins');
            }
        } 
        // Se estamos na tela de 'achievements':
        else if (screen === 'achievements') {
            // Depois da conquista, vai sempre para Lcoins
            setScreen('lcoins');
        } 
        // Se estamos na tela de 'lcoins':
        else if (screen === 'lcoins') {
            // Depois dos Lcoins, a sequência acabou, volta para a home
            navigate('/home'); 
        }
    }

    // Renderização principal: mostra a tela ativa baseada no estado 'screen'
    return (
        <div className="fixed inset-0 z-50">
            <style>{animations}</style>
            
            {screen === 'congrats' && (
                <CongratulationsScreen 
                    onContinue={handleNavigation} 
                    errorCount={errorCount}
                    totalExercises={totalExercises}
                    xpGained={xpGained} 
                />
            )}
            
            {screen === 'sequence' && <SequenciaAtivaScreen onContinue={handleNavigation} />}
            
            {/* Passa o 'lessonId' para a tela de conquista saber qual emblema mostrar */}
            {screen === 'achievements' && <AchievementRewardScreen onContinue={handleNavigation} unlockedLessonId={lessonId} />}
            
            {screen === 'lcoins' && <LcoinsScreen onContinue={handleNavigation} isFirstTime={isFirstTime} />}
        </div>
    );
}