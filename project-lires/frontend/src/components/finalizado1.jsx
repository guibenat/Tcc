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

// --- IMPORTAR O NOVO MAPA DE CONQUISTAS ---
import { achievementsMap } from '../lessons/achievementsMap'; 

// Animações
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


// --- Componente CountUp (Sem alteração) ---
const CountUp = ({ end, duration, start }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return; let startVal = 0; const endValue = parseInt(end, 10); if (endValue === 0) { setCount(0); return; } const totalFrames = Math.round(duration / (1000 / 60)); const increment = endValue / totalFrames; const counter = setInterval(() => { startVal += increment; if (startVal > endValue) { setCount(endValue); clearInterval(counter); } else { setCount(Math.ceil(startVal)); } }, 16); return () => clearInterval(counter);
    }, [end, duration, start]);
    return <span>{count}</span>;
};

// --- Tela de Parabéns (Sem alteração) ---
function CongratulationsScreen({ onContinue, errorCount, totalExercises, xpGained }) {
    const { theme } = useSettings();
    const [startCounting, setStartCounting] = useState(false);
    useEffect(() => { const timer = setTimeout(() => setStartCounting(true), 600); return () => clearTimeout(timer); }, []);
    const animationStyle = (delay) => ({ animation: `fadeInUp 0.5s ease-out ${delay}s forwards`, opacity: 0, });
    
    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 ${
            theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            <div className="w-full flex justify-start">
              <img 
                src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                alt="Lires Logo" 
                className="h-24" 
              />
            </div>
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ ...animationStyle(0.2), backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Parabéns!</h1>
                <p className={`text-xl sm:text-2xl mb-8 ${
                    theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'
                }`} style={animationStyle(0.4)}>Você concluiu a atividade!</p>
                
                <div className="flex flex-col gap-2 mb-8 text-lg text-center" style={animationStyle(0.6)}>
                    <p className={`font-bold tracking-wider ${
                        theme === 'escuro' ? 'text-gray-200' : 'text-gray-800'
                    }`}><CountUp end={errorCount} duration={1000} start={startCounting} /> ERROS</p>
                    
                    <p className="font-bold text-blue-600 tracking-wider"><CountUp end={totalExercises} duration={1000} start={startCounting} /> EXERCÍCIOS FEITOS</p>
                    
                    <p className="font-bold text-yellow-500 tracking-wider">+<CountUp end={xpGained} duration={1000} start={startCounting} /> XP</p>
                </div>

                <img src={robotCongratsImage} alt="Robô Festejando" className="w-40 h-40 sm:w-48 sm:h-48" style={{ ...animationStyle(0.8), animationName: 'float, fadeInUp', animationDuration: '3s, 0.5s', animationTimingFunction: 'ease-in-out, ease-out', animationIterationCount: 'infinite, 1', animationDelay: '0s, 0.8s', animationFillMode: 'forwards' }} />
            </div>
            <div className="w-full flex justify-end"><button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>Continuar</button></div>
        </div>
    );
}

// --- Tela de Sequência (Sem alteração) ---
function SequenciaAtivaScreen({ onContinue }) {
    const { theme, dailyStreak } = useSettings();
    const [isAnimating, setIsAnimating] = useState(false);
    const sequenceCount = dailyStreak; 

    useEffect(() => { const timer = setTimeout(() => { setIsAnimating(true); }, 100); return () => clearTimeout(timer); }, []);
    
    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 ${
            theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            <div className="w-full flex justify-start">
              <img 
                src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                alt="Lires Logo" 
                className="h-24" 
              />
            </div>
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="relative mb-4">
                    <img src={flameImage} alt="Chama" className="h-32 w-32" style={isAnimating ? { animation: 'ignite 1.5s ease-in-out forwards', } : { filter: 'grayscale(1)', transform: 'scale(0.8)', opacity: 0.5, }} />
                    {isAnimating && (<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg" style={{ backgroundImage: 'linear-gradient(to top, #ef4444, #f87171)', animation: 'popIn 0.4s ease-out 1.3s forwards', opacity: 0, }}>{sequenceCount}</div>)}
                </div>
                <p className="text-xl font-semibold mb-8" style={{ animation: isAnimating ? 'fadeInUp 0.5s ease-out 1.5s forwards' : 'none', opacity: 0, backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Continue praticando todos os dias para<br />manter sua sequência ativa</p>
            </div>
            <div className="w-full flex justify-end"><button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>Continuar</button></div>
        </div>
    );
}

// --- TELA DE CONQUISTA (Totalmente atualizada) ---
function AchievementRewardScreen({ onContinue, unlockedLessonId }) {
    const { theme } = useSettings();
    const [progress, setProgress] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [textKey, setTextKey] = useState(1);
    
    // --- LÓGICA DINÂMICA ---
    const achievements = achievementsMap;
    // Encontra o ÍNDICE da conquista que acabamos de desbloquear
    const unlockedIndex = achievements.findIndex(ach => ach.id === unlockedLessonId);
    // Pega os dados da conquista (título, descrição)
    const unlockedAchievement = achievements[unlockedIndex] ?? achievements[0]; // Fallback
    const totalAchievements = achievements.length;
    // --- FIM DA LÓGICA ---

    useEffect(() => {
        // Se a conquista não for encontrada, não faz nada
        if (unlockedIndex < 0) {
            console.error("Conquista não encontrada para o ID:", unlockedLessonId);
            return;
        }

        const currentProgressPercent = ((unlockedIndex + 1) / totalAchievements) * 100;
        const prevProgressPercent = (unlockedIndex / totalAchievements) * 100;

        setProgress(prevProgressPercent);
        
        const progressTimer = setTimeout(() => { setProgress(currentProgressPercent); }, 1000);
        const shakeTimer = setTimeout(() => { setIsShaking(true); }, 3000);
        const unlockTimer = setTimeout(() => { setIsShaking(false); setIsUnlocked(true); }, 4500);
        const modalShowTimer = setTimeout(() => { setShowModal(true); }, 4800);
        const modalHideTimer = setTimeout(() => { setShowModal(false); setTextKey(2); }, 7300);
        
        return () => { clearTimeout(progressTimer); clearTimeout(shakeTimer); clearTimeout(unlockTimer); clearTimeout(modalShowTimer); clearTimeout(modalHideTimer); };
    }, [unlockedIndex, totalAchievements, unlockedLessonId]); // Adicionada dependência

    // Se a conquista não for válida (ex: -1), nem renderiza
    if (unlockedIndex < 0) {
        // Em vez de quebrar, nós pulamos esta tela
        useEffect(() => {
            onContinue();
        }, [onContinue]);
        return null;
    }

    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 relative overflow-hidden ${
          theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            
            {/* --- POP-UP MODAL (Atualizado com Título/Descrição) --- */}
            {showModal && (
              <div style={{ animation: 'glow-pop-in 0.7s forwards, fade-out 0.5s 2.2s forwards' }} className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <p className="text-4xl font-bold mb-2" style={{color: '#8A2BE2'}}>{unlockedAchievement.title}</p>
                <p className="text-3xl font-bold mb-4" style={{color: '#FFFF00'}}>{unlockedAchievement.description}</p>
                <img src={achievementBadgeImage} alt="Conquista Desbloqueada" className="w-72 h-72" />
              </div>
            )}
            
            <div className="w-full flex justify-start">
              <img 
                src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                alt="Lires Logo" 
                className="h-24" 
              />
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center text-center w-full max-w-5xl">
                {isUnlocked ? (<div key={textKey} style={{animation: 'fadeInUp 0.5s forwards'}}><p className="text-2xl font-semibold mb-4" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Continue as atividades para desbloquear mais conquistas</p><img src={robotIconImage} alt="Ícone Robô" className="h-16 mb-8 mx-auto" /></div>) : (<div className="h-28"></div>)}
                
                <div className="w-full relative mt-12">
                    <div className={`w-full h-4 rounded-full relative ${
                        theme === 'escuro' ? 'bg-gray-700' : 'bg-purple-200'
                    }`}>
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${progress}%`, transition: 'width 2s ease-out' }}></div>
                    </div>
                    
                    <div className="absolute -bottom-8 w-full flex justify-between px-2">
                        {achievements.map((ach, index) => (
                          <div key={index} className="relative w-16 h-16 flex items-center justify-center">
                            {/* Mostra desbloqueado se o índice for MENOR OU IGUAL ao desbloqueado */}
                            {index <= unlockedIndex ? (
                                <img src={unlockedAchievementImage} alt="Conquista Desbloqueada" className="h-16 w-16"/>
                            ) : (
                                // Mostra o cadeado (e o shake se for o próximo)
                                <img 
                                  src={lockedAchievementImage} 
                                  alt="Cadeado" 
                                  className="h-16 w-16" 
                                  style={{ animation: index === (unlockedIndex + 1) && isShaking ? 'shake 1.5s' : 'none' }} 
                                />
                            )}
                          </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end"><button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>Continuar</button></div>
        </div>
    );
}

// --- TELA DE LCOINS (Sem alteração) ---
function LcoinsScreen({ onContinue, isFirstTime }) {
    const { theme, setLcoins } = useSettings(); 
    const [startAnimations, setStartAnimations] = useState(false);
    const rewardAmount = 50; 

    useEffect(() => {
        const timer = setTimeout(() => setStartAnimations(true), 100);
        if (isFirstTime) {
            console.log("finalizado1.jsx: Adicionando 50 Lcoins.");
            setLcoins(prevLcoins => prevLcoins + rewardAmount);
        } else {
            console.log("finalizado1.jsx: Não é a primeira vez, Lcoins já foram dadas.");
        }
        return () => clearTimeout(timer);
    }, [isFirstTime, setLcoins]); 
    
    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 ${
            theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            <div className="w-full flex justify-start">
              <img 
                src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                alt="Lires Logo" 
                className="h-24" 
              />
            </div>
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <img src={lcoinImage} alt="Lcoin" className="w-32 h-32 mb-4" style={{ animation: startAnimations ? 'coin-drop-glow 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards' : 'none' }} />
                <p className="text-2xl font-bold" style={{ animation: startAnimations ? 'fadeInUp 0.5s ease-out 1s forwards' : 'none', opacity: 0 }}>
                    {isFirstTime ? (
                        <>
                            <span style={{ color: '#FBC02D' }}>+<CountUp end={rewardAmount} duration={3000} start={startAnimations} /></span>
                            <span style={{ color: '#1E88E5' }}> LCOINS</span>
                        </>
                    ) : (
                        <span style={{ color: '#1E88E5' }}>Lição Refeita!</span>
                    )}
                </p>
            </div>
            <div className="w-full flex justify-end"><button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>Continuar</button></div>
        </div>
    );
}

// --- Componente Principal (LÓGICA DE NAVEGAÇÃO ATUALIZADA) ---
export default function Finalizado1() {
    const [screen, setScreen] = useState('congrats'); // Começa sempre nos parabéns
    const navigate = useNavigate();
    const { state } = useLocation();
    
    // --- PUXAR TODOS OS DADOS (INCLUINDO 'lessonId') ---
    const errorCount = state?.errorCount ?? 0;
    const totalExercises = state?.totalExercises ?? 3;
    const isFirstTime = state?.isFirstTime ?? false;
    const xpGained = state?.xpGained ?? 5;
    // const isCheckpoint = state?.isCheckpoint ?? false; // Não precisamos mais disto
    const isFirstLessonOfDay = state?.isFirstLessonOfDay ?? false;
    const lessonId = state?.lessonId ?? null; // <-- O ID DA LIÇÃO

    // --- CORREÇÃO: Lógica de navegação atualizada ---
    // Verifica se a lição completada DESBLOQUEIA uma conquista
    const unlocksAchievement = achievementsMap.some(ach => ach.id === lessonId);

    const handleNavigation = () => {
        if (screen === 'congrats') {
            // 1. Deve mostrar a sequência?
            if (isFirstLessonOfDay) {
                setScreen('sequence');
            } 
            // 2. Se não for, deve mostrar a conquista?
            // (Só mostra se for a 1ª vez E se esta lição desbloquear uma)
            else if (unlocksAchievement && isFirstTime) { 
                setScreen('achievements');
            }
            // 3. Se não for nenhum desses, vai para Lcoins
            else {
                setScreen('lcoins');
            }
        } 
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
        else if (screen === 'achievements') {
            // Depois da conquista, vai sempre para Lcoins
            setScreen('lcoins');
        } 
        else if (screen === 'lcoins') {
            // Depois dos Lcoins, volta para casa
            navigate('/home'); 
        }
    }

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
            
            {/* --- PASSAR O 'lessonId' PARA A TELA DE CONQUISTA --- */}
            {screen === 'achievements' && <AchievementRewardScreen onContinue={handleNavigation} unlockedLessonId={lessonId} />}
            
            {screen === 'lcoins' && <LcoinsScreen onContinue={handleNavigation} isFirstTime={isFirstTime} />}
        </div>
    );
}