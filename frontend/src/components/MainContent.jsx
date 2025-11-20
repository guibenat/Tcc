import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Para meus pop-ups customizados
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';

// Importo meu "banco de dados" de lições e o contexto
import { lessonMap } from '../lessons/lessonMap';
import { useSettings } from './SettingsContext';

// Meus assets (ícones)
import checkIconImg from '../assets/check-icon.png';
import diamondIconImg from '../assets/coroa.png'; // checkpoint
import lockIconImg from '../assets/locked-Achievement.png';

/**
 * Componente: LessonBlock
 * Este é o "botão" ou "bloco" individual de cada lição na trilha.
 * Ele muda de cor, ícone e comportamento baseado no seu status.
 */
const LessonBlock = ({ status, progress, iconSrc, lessonId, isUnlocked }) => {
    const navigate = useNavigate();
    // Puxo o estado global de vidas e regeneração
    const { theme, lives, isRegeneratingLives, livesRegenerationTime } = useSettings();
    const baseLayout = "rounded-3xl w-48 h-48 flex flex-col items-center justify-center p-4 transition-transform border-b-8";

    let content; // O que vai dentro do bloco (ícone, check, etc)
    let colorStyles; // As classes de cor (bg, border)

    /**
     * Função principal que decide o que fazer ao clicar no bloco.
     * Tem várias checagens de "bloqueio" (sem vidas, lição trancada).
     */
    const handleLessonClick = () => {
        // --- 1. CHECAGEM DE VIDAS ---
        // Se não tiver vidas E elas estiverem regenerando...
        if (lives === 0 && isRegeneratingLives) {
            // Calculo o tempo que falta para a próxima vida
            const now = Date.now();
            const timeRemaining = Math.ceil((livesRegenerationTime - now) / 1000);
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;

            // Mostro um pop-up customizado com o timer
            Swal.fire({
                title: '💔 Sem Vidas!',
                html: `
                    <p style="margin-bottom: 1rem;">Você está sem vidas no momento.</p>
                    <div style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 1.5rem;
                        border-radius: 1rem;
                        margin: 1rem 0;
                    ">
                        <p style="color: white; font-size: 0.875rem; margin-bottom: 0.5rem;">Tempo para regeneração:</p>
                        <p style="color: white; font-size: 2.5rem; font-weight: bold; letter-spacing: 0.1em;">
                            ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
                        </p>
                    </div>
                    <p style="font-size: 0.875rem; color: #6b7280;">⏱️ Suas 5 vidas voltarão automaticamente!</p>
                `,
                icon: 'warning',
                confirmButtonText: 'Entendi',
                customClass: { // Estilos do Swal
                    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                    title: `${theme === 'escuro' ? 'text-red-300' : 'text-slate-800'}`,
                    htmlContainer: 'text-left',
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            });
            return; // Bloqueia a ação
        }

        // --- 2. CHECAGEM DE BLOQUEIO (LIÇÃO TRANCADA) ---
        // Se a lição não está destravada E ainda não foi completada
        if (!isUnlocked && status !== 'completed') {
            Swal.fire({
                title: 'Bloqueado!',
                text: 'Complete as lições anteriores para desbloquear.',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                    title: `${theme === 'escuro' ? 'text-purple-300' : 'text-slate-800'}`,
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            });
            return; // Bloqueia a ação
        }

        // --- 3. CHECAGEM DE "REFAZER" ---
        // Se a lição já foi completada, pergunto se quer refazer
        if (status === 'completed' && lessonId) {
            Swal.fire({
                title: '✅ Lição Concluída!',
                text: 'Você já completou esta lição. Deseja refazer?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: '🔄 Refazer',
                cancelButtonText: 'Cancelar',
                customClass: {
                    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                    title: `${theme === 'escuro' ? 'text-purple-300' : 'text-slate-800'}`,
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 mr-2',
                    cancelButton: 'bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/lesson/${lessonId}`); // Navega se confirmar
                }
            });
            return; // Bloqueia a ação
        }

        // --- 4. CAMINHO FELIZ (INICIAR LIÇÃO) ---
        // Se passou em tudo e tem um lessonId, navega para a lição
        if (lessonId) {
            navigate(`/lesson/${lessonId}`);
            return;
        }

        // --- 5. CLIQUE NO CHECKPOINT (DIAMANTE) ---
        // Se for um bloco de "progresso" (o diamante, que não tem lessonId)
        if (status === 'in-progress') {
            Swal.fire({
                title: 'Progresso do Capítulo',
                text: `Você completou ${progress} passos neste capítulo.`,
                icon: 'info',
                confirmButtonText: 'Entendi',
                customClass: {
                    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                    title: `${theme === 'escuro' ? 'text-purple-300' : 'text-slate-800'}`,
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            });
        }
    };

    // --- Lógica de Estilo ---
    // Defino o conteúdo e as cores do bloco baseado no 'status'
    switch (status) {
        case 'completed': // Lição completa
            content = (
                <div className="flex flex-col items-center gap-2">
                    <img src={checkIconImg} alt="Concluído" className="w-20 h-20" />
                    {lessonId && ( // Mostra o texto 'refazer' só se for uma lição (e não um checkpoint)
                        <span className="text-xs font-semibold text-white opacity-75">
                            Clique para refazer
                        </span>
                    )}
                </div>
            );
            colorStyles = `bg-purple-500 border-purple-700 ${theme === 'escuro' ? 'bg-purple-800 border-purple-600' : ''} cursor-pointer`;
            break;
        case 'in-progress': // Lição atual (destravada mas não completa)
            content = iconSrc ?
                <img src={iconSrc} alt="Ícone" className="w-20 h-20" /> : // Se for checkpoint, mostra o ícone (diamante)
                <span className={`font-bold text-4xl ${theme === 'escuro' ? 'text-purple-300' : 'text-[#A195E1]'}`}>{progress}</span>; // Senão, mostra o texto (ex: "1/3")
            colorStyles = `bg-[#E9E4FF] border-[#C6BFF7] ${theme === 'escuro' ? 'bg-gray-800 border-purple-700' : ''} cursor-pointer`;
            break;
        case 'locked': // Lição bloqueada
        default:
            content = <img src={lockIconImg} alt="Cadeado" className="w-20 h-20 opacity-60" />;
            colorStyles = `bg-[#E9E4FF] border-[#C6BFF7] ${theme === 'escuro' ? 'bg-gray-700 border-gray-600' : ''} opacity-60 cursor-not-allowed`;
            break;
    }

    // Só adiciono o efeito de 'hover' se a lição estiver destravada
    const finalClasses = `${baseLayout} ${colorStyles} ${isUnlocked ? 'hover:-translate-y-2' : ''}`;
    
    return <div onClick={handleLessonClick} className={finalClasses}>{content}</div>;
};

/**
 * Componente: SectionTitle
 * É o título da seção (ex: "Primeiros passos") com a linha atrás.
 */
const SectionTitle = ({ children }) => {
    const { theme } = useSettings();
    return (
        <div className="relative my-10 flex justify-center items-center">
            {/* A linha */}
            <div className={`absolute w-full h-0.5 ${theme === 'escuro' ? 'bg-gray-700' : 'bg-slate-200'}`}></div>
            {/* O texto (que fica por cima da linha) */}
            <h2 className="relative bg-gradient-to-r from-indigo-300 to-purple-400 text-white font-bold py-4 px-12 sm:px-16 rounded-full text-xl sm:text-2xl text-center shadow-2xl shadow-purple-600/40 z-10">
                {children}
            </h2>
        </div>
    );
};

/**
 * Componente Principal: MainContent
 * Este é o componente que renderiza toda a trilha de lições.
 */
export default function MainContent() {
    // Puxo todo o estado global e os 'setters' do Contexto.
    // Os 'setters' são usados pelo botão de DEBUG.
    const { 
        lessonProgress, 
        theme, 
        setLessonProgress, 
        setLives, 
        setLcoins, 
        setDailyStreak, 
        setTimeSpentToday, 
        setLastCompletedTimestamp 
    } = useSettings();

    const [animationClass, setAnimationClass] = useState('');

    // Animação de entrada
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    /**
     * Função de DEBUG para resetar todo o progresso do usuário.
     * Útil para eu testar a lógica de desbloqueio.
     */
    const handleResetProgress = () => {
        // Mostra um pop-up de confirmação 'perigoso'
        Swal.fire({
            title: 'Resetar Progresso? (Debug)',
            text: "Todo o seu progresso de lições, Lcoins e streak serão zerados. Deseja continuar?",
            icon: 'warning',
            iconColor: '#f87171', // Vermelho
            showCancelButton: true,
            confirmButtonText: 'Sim, zerar tudo',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                title: `${theme === 'escuro' ? 'text-red-300' : 'text-slate-800'}`,
                confirmButton: 'bg-red-600 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 mr-2',
                cancelButton: 'bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
            }
        }).then((result) => {
            // Se confirmar, chama todos os 'setters' para resetar o estado
            if (result.isConfirmed) {
                setLessonProgress({});
                setLives(5);
                setLcoins(0);
                setDailyStreak(0);
                setTimeSpentToday(0);
                setLastCompletedTimestamp(null);
                
                // Pop-up de sucesso
                Swal.fire({
                    title: 'Progresso Resetado!',
                    text: 'Suas atividades foram zeradas.',
                    icon: 'success',
                    customClass: {
                        popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                        title: `${theme === 'escuro' ? 'text-purple-300' : 'text-slate-800'}`,
                        confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                    }
                });
            }
        });
    };

    // --- LÓGICA DE PROGRESSÃO E DESBLOQUEIO ---
    // Aqui eu gero os dados para os blocos de lição dinamicamente.

    // ===== UNIDADE 1: Primeiros Passos =====
    const unit1Lessons = lessonMap.filter(lesson => lesson.unit === 1);

    // Esta é a flag que controla o desbloqueio. 
    // Começa como 'true' para a primeira lição da Unidade 1 estar sempre destravada.
    let previousLessonWasCompleted = true; 
    
    const unit1Blocks = unit1Lessons.map(lesson => {
        // Pego o progresso salvo para esta lição (ex: { completed: 3, total: 3 })
        const prog = lessonProgress[lesson.id];
        // Verifico se está completa
        const isLessonCompleted = prog?.completed === lesson.totalSteps;
        // A lição atual só está destravada se a ANTERIOR foi completada.
        const isUnlocked = previousLessonWasCompleted;

        // ATUALIZO A FLAG para a PRÓXIMA iteração do loop.
        // A próxima lição só estará destravada se *esta* lição for completada.
        previousLessonWasCompleted = isLessonCompleted;

        // Se for um checkpoint, defino o ícone
        const icon = lesson.isCheckpoint ? diamondIconImg : null;

        // Retorno o objeto de props que o <LessonBlock> espera
        return {
            status: isLessonCompleted ? 'completed' : (isUnlocked ? 'in-progress' : 'locked'),
            progress: `${prog?.completed || 0}/${lesson.totalSteps}`,
            lessonId: lesson.id,
            isUnlocked: isUnlocked,
            icon: isLessonCompleted ? null : icon, // Se já completei, mostro o check, não o diamante
        };
    });

    // ===== UNIDADE 2: Alfabeto Manual =====
    const unit2Lessons = lessonMap.filter(lesson => lesson.unit === 2);
    
    // Para a Unidade 2 destravar, preciso checar se TODAS as lições da Unidade 1 estão completas.
    const unit1IsFullyCompleted = unit1Lessons.every(lesson => 
        lessonProgress[lesson.id]?.completed === lesson.totalSteps
    );

    // A flag de desbloqueio da Unidade 2 começa com o status da Unidade 1.
    let unit2PreviousCompleted = unit1IsFullyCompleted;
    
    // O resto da lógica é idêntica à da Unidade 1.
    const unit2Blocks = unit2Lessons.map(lesson => {
        const prog = lessonProgress[lesson.id];
        const isLessonCompleted = prog?.completed === lesson.totalSteps;
        const isUnlocked = unit2PreviousCompleted;

        unit2PreviousCompleted = isLessonCompleted; // Atualizo a flag para a próxima lição da Unidade 2

        const icon = lesson.isCheckpoint ? diamondIconImg : null;

        return {
            status: isLessonCompleted ? 'completed' : (isUnlocked ? 'in-progress' : 'locked'),
            progress: `${prog?.completed || 0}/${lesson.totalSteps}`,
            lessonId: lesson.id,
            isUnlocked: isUnlocked,
            icon: isLessonCompleted ? null : icon,
        };
    });

    // Array final que junta tudo para o render.
    // Assim eu posso adicionar/remover unidades facilmente.
    const lessonsData = [
        {
            title: 'Primeiros passos',
            blocks: unit1Blocks
        },
        {
            title: 'Alfabeto Manual',
            blocks: unit2Blocks
        },
        // Hardcoded (por enquanto)
        {
            title: 'Saudações e Cumprimentos',
            blocks: [
                { status: 'locked', progress: '0/4', isUnlocked: false },
                { status: 'locked', progress: '0/4', isUnlocked: false },
                { status: 'locked', progress: '0/4', isUnlocked: false }
            ]
        },
    ];

    return (
        <>
            {/* Injeto o CSS para o botão de gradiente do Swal e animações */}
            <style>{`
                .btn-gradient-glow {
                    background-image: linear-gradient(90deg, #b081ff, #59b1ff);
                    box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
                }
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient-animation 15s ease infinite;
                }
                /* Animação de entrada da página */
                .content-box.anim-enter {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 800ms ease, transform 800ms ease;
                }
                .content-box {
                    opacity: 0;
                    transform: translateY(20px);
                }
            `}</style>

            <main className={`px-4 sm:px-8 content-box ${animationClass}`}>
                {/* Banner do Topo */}
                <div className="p-8 rounded-2xl text-white mb-12 relative h-40 flex flex-col justify-center shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient">
                    <h1 className="text-3xl md:text-4xl font-bold" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Bem vindo a experiência Lires</h1>
                    <p className="text-md md:text-lg" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Se divirta aprendendo!</p>
                </div>

                {/* Mapeio o array 'lessonsData' para criar cada seção */}
                {lessonsData.map((section, index) => (
                    <section key={index}>
                        <SectionTitle>{section.title}</SectionTitle>
                        <div className="grid grid-cols-1 gap-8 justify-items-center">
                            {/* Mapeio os 'blocks' de cada seção para criar os LessonBlock */}
                            {section.blocks.map((block, blockIndex) => (
                                <LessonBlock
                                    key={blockIndex}
                                    status={block.status}
                                    progress={block.progress}
                                    iconSrc={block.icon}
                                    lessonId={block.lessonId}
                                    isUnlocked={block.isUnlocked}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                {/* Seção "Bloqueada" (placeholder) */}
                <section>
                    <SectionTitle>Nível 2</SectionTitle>
                    <div className={`flex flex-col items-center justify-center p-10 rounded-3xl border-2 border-dashed ${theme === 'escuro' ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-300'}`}>
                        <img src={lockIconImg} alt="Cadeado" className="w-20 h-20 mb-4 opacity-40" />
                        <h3 className={`text-3xl font-bold ${theme === 'escuro' ? 'text-gray-600' : 'text-slate-400'}`}>BLOQUEADO</h3>
                    </div>
                </section>

                {/* --- BOTÃO DE DEBUG --- */}
                <section className="mt-16 mb-8 flex justify-center">
                    <button
                        onClick={handleResetProgress}
                        className={`
                            py-2 px-4 rounded-full font-semibold text-xs
                            ${theme === 'escuro' 
                                ? 'bg-gray-800 text-red-400 hover:bg-gray-700' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200'}
                            transition-colors
                        `}
                    >
                        [DEBUG] Resetar Progresso
                    </button>
                </section>
                {/* --- FIM DO BOTÃO DE DEBUG --- */}

            </main>
        </>
    );
}