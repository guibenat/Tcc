import React, { useState, useEffect } from 'react';
import liresLogoImage from '../assets/logo-lires.png';
import robotCongratsImage from '../assets/robo-congrats.png'; 
import flameImage from '../assets/flame.png'; 
import lockedAchievementImage from '../assets/locked-Achievement.png';
import unlockedAchievementImage from '../assets/unlocked-Achievement.png';
import achievementBadgeImage from '../assets/achievement-Badge.png';
import robotIconImage from '../assets/robot-Icon.png';
import lcoinImage from '../assets/lcoin.png';
// --- Fim da seção de media ---

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

// --- Componentes de Telas Individuais ---

const CountUp = ({ end, duration, start }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return; let startVal = 0; const endValue = parseInt(end, 10); if (endValue === 0) { setCount(0); return; } const totalFrames = Math.round(duration / (1000 / 60)); const increment = endValue / totalFrames; const counter = setInterval(() => { startVal += increment; if (startVal > endValue) { setCount(endValue); clearInterval(counter); } else { setCount(Math.ceil(startVal)); } }, 16); return () => clearInterval(counter);
    }, [end, duration, start]);
    return <span>{count}</span>;
};

function CongratulationsScreen({ onContinue }) {
    const errorCount = 0; const totalExercises = 7; const [startCounting, setStartCounting] = useState(false);
    useEffect(() => { const timer = setTimeout(() => setStartCounting(true), 600); return () => clearTimeout(timer); }, []);
    const animationStyle = (delay) => ({ animation: `fadeInUp 0.5s ease-out ${delay}s forwards`, opacity: 0, });
    return (
        <div className="w-full h-full flex flex-col items-center bg-white font-poppins p-10">
            <div className="w-full flex justify-start"><img src={liresLogoImage} alt="Lires Logo" className="h-24" /></div>
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ ...animationStyle(0.2), backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Parabéns!</h1>
                <p className="text-xl sm:text-2xl text-gray-700 mb-8" style={animationStyle(0.4)}>Você concluiu todas as atividades<br />do módulo <strong>Começar do Zero!</strong></p>
                <div className="flex flex-col gap-2 mb-8 text-lg text-center" style={animationStyle(0.6)}>
                    <p className="font-bold text-gray-800 tracking-wider"><CountUp end={errorCount} duration={1000} start={startCounting} /> ERROS</p>
                    <p className="font-bold text-blue-600 tracking-wider"><CountUp end={totalExercises} duration={1000} start={startCounting} /> EXERCÍCIOS FEITOS</p>
                </div>
                <img src={robotCongratsImage} alt="Robô Festejando" className="w-40 h-40 sm:w-48 sm:h-48" style={{ ...animationStyle(0.8), animationName: 'float, fadeInUp', animationDuration: '3s, 0.5s', animationTimingFunction: 'ease-in-out, ease-out', animationIterationCount: 'infinite, 1', animationDelay: '0s, 0.8s', animationFillMode: 'forwards' }} />
            </div>
            <div className="w-full flex justify-end"><button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>Continuar</button></div>
        </div>
    );
}

function SequenciaAtivaScreen({ onContinue }) {
    const [isAnimating, setIsAnimating] = useState(false); const sequenceCount = 1;
    useEffect(() => { const timer = setTimeout(() => { setIsAnimating(true); }, 100); return () => clearTimeout(timer); }, []);
    return (
        <div className="w-full h-full flex flex-col items-center bg-white font-poppins p-10">
            <div className="w-full flex justify-start"><img src={liresLogoImage} alt="Lires Logo" className="h-24" /></div>
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

function AchievementsScreen({ onContinue }) {
    const [progress, setProgress] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [textKey, setTextKey] = useState(1);
    useEffect(() => {
        const progressTimer = setTimeout(() => { setProgress(2); }, 1000);
        const shakeTimer = setTimeout(() => { setIsShaking(true); }, 3000);
        const unlockTimer = setTimeout(() => { setIsShaking(false); setIsUnlocked(true); }, 4500);
        const modalShowTimer = setTimeout(() => { setShowModal(true); }, 4800);
        const modalHideTimer = setTimeout(() => { setShowModal(false); setTextKey(2); }, 7300);
        return () => { clearTimeout(progressTimer); clearTimeout(shakeTimer); clearTimeout(unlockTimer); clearTimeout(modalShowTimer); clearTimeout(modalHideTimer); };
    }, []);
    const achievements = Array(7).fill(0); const unlockedIndex = 0;
    return (
        <div className="w-full h-full flex flex-col items-center bg-white font-poppins p-10 relative overflow-hidden">
             {showModal && (<div style={{ animation: 'glow-pop-in 0.7s forwards, fade-out 0.5s 2.2s forwards' }} className="absolute inset-0 flex flex-col items-center justify-center z-20"><p className="text-4xl font-bold mb-2" style={{color: '#8A2BE2'}}>Conquista</p><p className="text-5xl font-bold mb-4" style={{color: '#FFFF00'}}>DESBLOQUEADA</p><img src={achievementBadgeImage} alt="Conquista Desbloqueada" className="w-72 h-72" /></div>)}
            <div className="w-full flex justify-start"><img src={liresLogoImage} alt="Lires Logo" className="h-24" /></div>
            <div className="flex-grow flex flex-col items-center justify-center text-center w-full max-w-5xl">
                 {isUnlocked ? (<div key={textKey} style={{animation: 'fadeInUp 0.5s forwards'}}><p className="text-2xl font-semibold mb-4" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Continue as atividades para desbloquear mais conquistas</p><img src={robotIconImage} alt="Ícone Robô" className="h-16 mb-8 mx-auto" /></div>) : (<div className="h-28"></div>)}
                <div className="w-full relative mt-12">
                     <div className="w-full h-4 bg-purple-200 rounded-full relative"><div className="h-full bg-purple-600 rounded-full" style={{ width: `${progress}%`, transition: 'width 2s ease-out' }}></div></div>
                     <div className="absolute -bottom-8 w-full flex justify-between px-2">
                         {achievements.map((_, index) => (<div key={index} className="relative w-16 h-16 flex items-center justify-center">{index < unlockedIndex ? <img src={unlockedAchievementImage} alt="Conquista Anterior" className="h-14 w-14"/> : index === unlockedIndex && isUnlocked ? <img src={unlockedAchievementImage} alt="Conquista Desbloqueada" className="h-16 w-16"/> : <img src={lockedAchievementImage} alt="Cadeado" className="h-16 w-16" style={{ animation: index === unlockedIndex && isShaking ? 'shake 1.5s' : 'none' }} />}</div>))}
                     </div>
                </div>
            </div>
            <div className="w-full flex justify-end"><button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>Continuar</button></div>
        </div>
    );
}

function LcoinsScreen({ onContinue }) {
    const [startAnimations, setStartAnimations] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setStartAnimations(true), 100);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="w-full h-full flex flex-col items-center bg-white font-poppins p-10">
            <div className="w-full flex justify-start"><img src={liresLogoImage} alt="Lires Logo" className="h-24" /></div>
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <img src={lcoinImage} alt="Lcoin" className="w-32 h-32 mb-4" style={{ animation: startAnimations ? 'coin-drop-glow 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards' : 'none' }} />
                <p className="text-2xl font-bold" style={{ animation: startAnimations ? 'fadeInUp 0.5s ease-out 1s forwards' : 'none', opacity: 0 }}>
                    <span style={{ color: '#FBC02D' }}>+<CountUp end={50} duration={3000} start={startAnimations} /></span>
                    <span style={{ color: '#1E88E5' }}> LCOINS</span>
                </p>
            </div>
            <div className="w-full flex justify-end"><button onClick={onContinue} className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>Continuar</button></div>
        </div>
    );
}

// --- Componente Principal que gere as telas ---
function App() {
    const [screen, setScreen] = useState('congrats'); // 'congrats', 'sequence', 'achievements', ou 'lcoins'

    const handleNavigation = () => {
        if (screen === 'congrats') setScreen('sequence');
        else if (screen === 'sequence') setScreen('achievements');
        else if (screen === 'achievements') setScreen('lcoins');
        else if (screen === 'lcoins') alert("Fim da demonstração!");
    }

    return (
        <div className="fixed inset-0 z-50">
            <style>{animations}</style>
            {screen === 'congrats' && <CongratulationsScreen onContinue={handleNavigation} />}
            {screen === 'sequence' && <SequenciaAtivaScreen onContinue={handleNavigation} />}
            {screen === 'achievements' && <AchievementsScreen onContinue={handleNavigation} />}
            {screen === 'lcoins' && <LcoinsScreen onContinue={handleNavigation} />}
        </div>
    );
}

export default App;

