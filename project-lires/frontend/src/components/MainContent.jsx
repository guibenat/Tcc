import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';

import { lessonMap } from '../lessons/lessonMap';
import { useSettings } from './SettingsContext';

import checkIconImg from '../assets/check-icon.png';
import diamondIconImg from '../assets/coroa.png';
import lockIconImg from '../assets/locked-Achievement.png';

// --- COMPONENTE DO BLOCO DE LIÇÃO ---
const LessonBlock = ({ status, progress, iconSrc, lessonId, isUnlocked }) => {
    const navigate = useNavigate();
    const { theme, lives, isRegeneratingLives, livesRegenerationTime } = useSettings();
    const baseLayout = "rounded-3xl w-48 h-48 flex flex-col items-center justify-center p-4 transition-transform border-b-8";

    let content;
    let colorStyles;

    const handleLessonClick = () => {
        // Verifica se tem vidas
        if (lives === 0 && isRegeneratingLives) {
            const now = Date.now();
            const timeRemaining = Math.ceil((livesRegenerationTime - now) / 1000);
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;

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
                customClass: {
                    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                    title: `${theme === 'escuro' ? 'text-red-300' : 'text-slate-800'}`,
                    htmlContainer: 'text-left',
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            });
            return;
        }

        // Verifica se está bloqueado
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
            return;
        }

        // Se já está concluído, pergunta se quer refazer
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
                    navigate(`/lesson/${lessonId}`);
                }
            });
            return;
        }

        // Navega para a lição
        if (lessonId) {
            navigate(`/lesson/${lessonId}`);
            return;
        }

        // Se for o diamante (progresso)
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

    // Lógica de Estilo
    switch (status) {
        case 'completed':
            content = (
                <div className="flex flex-col items-center gap-2">
                    <img src={checkIconImg} alt="Concluído" className="w-20 h-20" />
                    {lessonId && (
                        <span className="text-xs font-semibold text-white opacity-75">
                            Clique para refazer
                        </span>
                    )}
                </div>
            );
            colorStyles = `bg-purple-500 border-purple-700 ${theme === 'escuro' ? 'bg-purple-800 border-purple-600' : ''} cursor-pointer`;
            break;
        case 'in-progress':
            content = iconSrc ?
                <img src={iconSrc} alt="Ícone" className="w-20 h-20" /> :
                <span className={`font-bold text-4xl ${theme === 'escuro' ? 'text-purple-300' : 'text-[#A195E1]'}`}>{progress}</span>;
            colorStyles = `bg-[#E9E4FF] border-[#C6BFF7] ${theme === 'escuro' ? 'bg-gray-800 border-purple-700' : ''} cursor-pointer`;
            break;
        case 'locked':
        default:
            content = <img src={lockIconImg} alt="Cadeado" className="w-20 h-20 opacity-60" />;
            colorStyles = `bg-[#E9E4FF] border-[#C6BFF7] ${theme === 'escuro' ? 'bg-gray-700 border-gray-600' : ''} opacity-60 cursor-not-allowed`;
            break;
    }

    const finalClasses = `${baseLayout} ${colorStyles} ${isUnlocked ? 'hover:-translate-y-2' : ''}`;
    return <div onClick={handleLessonClick} className={finalClasses}>{content}</div>;
};

// --- COMPONENTE DO TÍTULO DA SEÇÃO ---
const SectionTitle = ({ children }) => {
    const { theme } = useSettings();
    return (
        <div className="relative my-10 flex justify-center items-center">
            <div className={`absolute w-full h-0.5 ${theme === 'escuro' ? 'bg-gray-700' : 'bg-slate-200'}`}></div>
            <h2 className="relative bg-gradient-to-r from-indigo-300 to-purple-400 text-white font-bold py-4 px-12 sm:px-16 rounded-full text-xl sm:text-2xl text-center shadow-2xl shadow-purple-600/40 z-10">
                {children}
            </h2>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function MainContent() {
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

    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    const handleResetProgress = () => {
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
            if (result.isConfirmed) {
                // Resetar tudo
                setLessonProgress({});
                setLives(5);
                setLcoins(0);
                setDailyStreak(0);
                setTimeSpentToday(0);
                setLastCompletedTimestamp(null);
                
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

    // ===== UNIDADE 1: Primeiros Passos =====
    const unit1Lessons = lessonMap.filter(lesson => lesson.unit === 1);

    let previousLessonWasCompleted = true;
    const unit1Blocks = unit1Lessons.map(lesson => {
        const prog = lessonProgress[lesson.id];
        const isLessonCompleted = prog?.completed === lesson.totalSteps;
        const isUnlocked = previousLessonWasCompleted;

        previousLessonWasCompleted = isLessonCompleted;

        const icon = lesson.isCheckpoint ? diamondIconImg : null;

        return {
            status: isLessonCompleted ? 'completed' : (isUnlocked ? 'in-progress' : 'locked'),
            progress: `${prog?.completed || 0}/${lesson.totalSteps}`,
            lessonId: lesson.id,
            isUnlocked: isUnlocked,
            icon: isLessonCompleted ? null : icon,
        };
    });

    // ===== UNIDADE 2: Alfabeto Manual =====
    const unit2Lessons = lessonMap.filter(lesson => lesson.unit === 2);
    // Verifica se a Unidade 1 está completa para desbloquear a 2
    const unit1IsFullyCompleted = unit1Lessons.every(lesson => 
        lessonProgress[lesson.id]?.completed === lesson.totalSteps
    );

    let unit2PreviousCompleted = unit1IsFullyCompleted;
    const unit2Blocks = unit2Lessons.map(lesson => {
        const prog = lessonProgress[lesson.id];
        const isLessonCompleted = prog?.completed === lesson.totalSteps;
        const isUnlocked = unit2PreviousCompleted;

        unit2PreviousCompleted = isLessonCompleted;

        const icon = lesson.isCheckpoint ? diamondIconImg : null;

        return {
            status: isLessonCompleted ? 'completed' : (isUnlocked ? 'in-progress' : 'locked'),
            progress: `${prog?.completed || 0}/${lesson.totalSteps}`,
            lessonId: lesson.id,
            isUnlocked: isUnlocked,
            icon: isLessonCompleted ? null : icon,
        };
    });

    const lessonsData = [
        {
            title: 'Primeiros passos',
            blocks: unit1Blocks
        },
        {
            title: 'Alfabeto Manual',
            blocks: unit2Blocks
        },
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
                <div className="p-8 rounded-2xl text-white mb-12 relative h-40 flex flex-col justify-center shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient">
                    <h1 className="text-3xl md:text-4xl font-bold" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Bem vindo a experiência Lires</h1>
                    <p className="text-md md:text-lg" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Se divirta aprendendo!</p>
                </div>

                {lessonsData.map((section, index) => (
                    <section key={index}>
                        <SectionTitle>{section.title}</SectionTitle>
                        <div className="grid grid-cols-1 gap-8 justify-items-center">
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