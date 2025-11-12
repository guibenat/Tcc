import React, { useState, useEffect } from 'react';
import { useSettings } from '../components/SettingsContext';

// --- Imports dos Assets ---
import liresLogoImage from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png';
import lockedAchievementImage from '../assets/locked-Achievement.png';
import robotIconImage from '../assets/robot-Icon.png';

// --- INÍCIO DA MODIFICAÇÃO (Importar a imagem correta) ---
// Esta é a imagem que aparece na tela 'finalizado1.jsx'
import achievementBadgeImage from '../assets/achievement-Badge.png';
// --- FIM DA MODIFICAÇÃO ---


// Animações simples para este modal
export const animations = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
`;

// --- INÍCIO DA MODIFICAÇÃO ---
// Mapeamento de IDs de conquista para suas imagens (agora com a imagem importada)
const achievementImages = {
    'comecar-do-zero': achievementBadgeImage, // Usar a variável importada
    // Adicione aqui outros módulos quando tiver as imagens:
    // 'modulo-2': aprendizAchievementImage,
    // ...
};
// --- FIM DA MODIFICAÇÃO ---

// --- Componente do Modal de Status de Conquistas ---
export function AchievementStatusModal({ onClose }) {
    const { theme, lessonProgress } = useSettings();

    // Lógica de quais conquistas estão desbloqueadas (Sem alteração)
    const allAchievements = [
        { id: 'comecar-do-zero', name: 'Iniciante' },
        { id: 'modulo-2', name: 'Aprendiz' },
        { id: 'modulo-3', name: 'Intermediário' },
        { id: 'modulo-4', name: 'Avançado' },
        { id: 'modulo-5', name: 'Fluente' },
        { id: 'modulo-6', name: 'Mestre' },
        { id: 'modulo-7', name: 'Lendário' },
    ];

    const unlockedIds = new Set();
    
    // Lógica de desbloqueio (Sem alteração)
    const progressData = lessonProgress['comecar-do-zero'];
    const completedSteps = progressData?.completed || 0;
    const totalSteps = progressData?.total || 3; 
    
    console.log(`ACHIEVEMENT_MODAL: Lendo progresso 'comecar-do-zero': ${completedSteps} / ${totalSteps}`);

    if (completedSteps >= totalSteps && totalSteps > 0) {
        console.log("ACHIEVEMENT_MODAL: DESBLOQUEANDO 'comecar-do-zero'");
        unlockedIds.add('comecar-do-zero');
    } else {
        console.log(`ACHIEVEMENT_MODAL: 'comecar-do-zero' NÃO desbloqueado. (Progresso ${completedSteps} < ${totalSteps})`);
    }

    const unlockedCount = unlockedIds.size;
    const progressPercent = (unlockedCount / allAchievements.length) * 100;

    // Estado da animação da barra (Sem alteração)
    const [progressAnimation, setProgressAnimation] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => { 
            setProgressAnimation(progressPercent); 
        }, 500); 
        return () => clearTimeout(timer);
    }, [progressPercent]);
    
    return (
        <div className={`w-full h-full flex flex-col items-center font-poppins p-10 relative overflow-hidden ${
          theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}>
            
            {/* Cabeçalho com botão Voltar e Logo (Sem alteração) */}
            <div className="w-full flex justify-between items-center">
              <button 
                onClick={onClose} 
                className={`p-2 rounded-full transition-colors z-10 ${theme === 'escuro' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
                aria-label="Voltar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <img 
                src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                alt="Lires Logo" 
                className="h-24 -ml-12" 
              />
              <div className="w-8"></div> 
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-grow flex flex-col items-center justify-center text-center w-full max-w-5xl">
                
                {/* Mensagem de Incentivo (Sem alteração) */}
                <div style={{animation: 'fadeInUp 0.5s forwards 1s', opacity: 0}}>
                    <p className="text-2xl font-semibold mb-4" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #849dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {unlockedCount > 0 ? "Belo começo! Continue assim para desbloquear mais!" : "Sua jornada está só começando. Vamos lá!"}
                    </p>
                    <img src={robotIconImage} alt="Ícone Robô" className="h-16 mb-8 mx-auto" />
                </div>

                {/* Barra de Progresso e Cadeados/Conquistas */}
                <div className="w-full relative mt-12">
                     {/* A Barra (Sem alteração) */}
                     <div className={`w-full h-4 rounded-full relative ${
                       theme === 'escuro' ? 'bg-gray-700' : 'bg-purple-200'
                     }`}>
                          {/* O Progresso (Sem alteração) */}
                          <div className="h-full bg-purple-600 rounded-full" style={{ width: `${progressAnimation}%`, transition: 'width 2s ease-out' }}></div>
                     </div>
                     {/* Os Cadeados/Conquistas */}
                     <div className="absolute -bottom-8 w-full flex justify-between px-2">
                          {allAchievements.map((ach) => {
                            const isAchUnlocked = unlockedIds.has(ach.id);

                            // --- INÍCIO DA MODIFICAÇÃO (Lógica da imagem) ---
                            // Se a conquista estiver desbloqueada E tiver uma imagem específica, usa essa imagem.
                            // Caso contrário, usa a imagem do cadeado.
                            const imageSrc = isAchUnlocked && achievementImages[ach.id] 
                                ? achievementImages[ach.id] 
                                : lockedAchievementImage;
                            // --- FIM DA MODIFICAÇÃO ---

                            return (
                                <div key={ach.id} className="relative w-16 h-16 flex items-center justify-center">
                                    <img 
                                        src={imageSrc} 
                                        alt={isAchUnlocked ? ach.name : "Cadeado"} 
                                        className="h-16 w-16" 
                                    />
                                </div>
                            );
                          })}
                     </div>
                </div>
            </div>
            
            {/* Rodapé (espaçador) (Sem alteração) */}
            <div className="w-full h-16"></div> 
        </div>
    );
}