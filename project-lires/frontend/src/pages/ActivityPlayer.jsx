import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// Puxo todos os setters e estados do Contexto Global
import { useSettings } from '../components/SettingsContext';

// --- Importações de Lições ---
// lessonLookup é um objeto que mapeia IDs para metadados (para barra de progresso)
import { lessonLookup } from '../lessons/lessonMap.jsx'; 
// Importo todas as lições criadas para que o React as carregue.
import { comecarDoZeroLesson } from '../lessons/comecarDoZeroLesson.jsx';
import { saudacoesAvancadasLesson } from '../lessons/saudacoesAvancadasLesson.jsx';
import { checkpoint1Lesson } from '../lessons/checkpoint1Lesson.jsx';
import { alfabetoLetraALesson } from '../lessons/alfabetoLetraALesson.jsx';
import { alfabetoConsoantesLesson } from '../lessons/alfabetoConsoantesLesson.jsx';
import { alfabetoConsoantes2Lesson } from '../lessons/alfabetoConsoantes2Lesson.jsx';
import { alfabetoConsoantes3Lesson } from '../lessons/alfabetoConsoantes3Lesson.jsx';
import { alfabetoConsoantes4Lesson } from '../lessons/alfabetoConsoantes4Lesson.jsx';
import { alfabetoRevisaoLesson } from '../lessons/alfabetoRevisaoLesson.jsx';
import coracaoImage from '../assets/coracaoo.png';
import robotReviewImage from '../assets/robot-review.png';

// Objeto lookup que mapeia o ID da lição para o pacote COMPLETO (steps, etc.)
const lessonDatabase = {
    'comecar-do-zero': comecarDoZeroLesson,
    'saudacoes-avancadas': saudacoesAvancadasLesson,
    'checkpoint-1': checkpoint1Lesson,
    'alfabeto-letra-a': alfabetoLetraALesson,
    'alfabeto-consoantes': alfabetoConsoantesLesson,
    'alfabeto-consoantes-2': alfabetoConsoantes2Lesson,
    'alfabeto-consoantes-3': alfabetoConsoantes3Lesson,
    'alfabeto-consoantes-4': alfabetoConsoantes4Lesson,
    'alfabeto-revisao': alfabetoRevisaoLesson,
};

// --- Componentes Visuais (Feedback e Modais) ---

function BottomNotification({ type, message, onContinue }) {
    // (Lógica de estilo e renderização da notificação inferior)
    const { theme } = useSettings();
    const isCorrect = type === 'correct';
    const containerStyle = isCorrect ? (theme === 'escuro' ? "bg-purple-900 border-t-4 border-purple-700" : "bg-purple-100 border-t-4 border-purple-400") : (theme === 'escuro' ? "bg-red-900 border-t-4 border-red-700" : "bg-red-100 border-t-4 border-red-400");
    const titleStyle = isCorrect ? (theme === 'escuro' ? "text-white" : "text-purple-800") : (theme === 'escuro' ? "text-white" : "text-red-800");
    const messageStyle = isCorrect ? (theme === 'escuro' ? "text-purple-200" : "text-purple-700") : (theme === 'escuro' ? "text-red-200" : "text-red-700");
    const Icon = () => isCorrect ? ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${theme === 'escuro' ? 'text-red-300' : 'text-red-600'}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg> );
    const buttonStyle = isCorrect ? { backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(176, 129, 255, 0.4)' } : { backgroundImage: 'linear-gradient(90deg, #EF4444, #F87171)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' };
    return ( <div className={`fixed bottom-0 left-0 right-0 p-6 shadow-lg z-40 ${containerStyle}`}><div className="container mx-auto flex items-center justify-between max-w-4xl"><div className="flex items-center gap-4"><Icon /><div><p className={`text-2xl font-bold ${titleStyle}`}>{isCorrect ? "Muito bem!" : "Você errou!"}</p><p className={`text-lg ${messageStyle}`}>{isCorrect ? "Você acertou!" : message}</p></div></div><button onClick={onContinue} className="text-xl font-semibold py-4 px-12 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105" style={buttonStyle}>Continuar</button></div></div> );
}

const HeartIcon = ({ filled }) => ( <img src={coracaoImage} alt={filled ? "Coração cheio" : "Coração vazio"} className="w-8 h-8" style={{ filter: filled ? 'none' : 'grayscale(1)', opacity: filled ? 1 : 0.4 }}/> );

function FirstIncorrectAnswerModal({ lives, onClose }) {
    // Modal que informa o usuário que ele perdeu a primeira vida
    const { theme } = useSettings();
    return ( <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-poppins"><div className={`p-8 rounded-2xl border-2 max-w-lg text-center ${ theme === 'escuro' ? 'bg-gray-800 border-blue-700' : 'bg-white border-blue-400' }`} style={{ boxShadow: '0 0 50px rgba(90, 177, 255, 0.6)' }}><div className="flex justify-center mb-4">{[...Array(5)].map((_, i) => ( <HeartIcon key={i} filled={i < lives} /> ))}</div><h2 className={`text-2xl font-bold mb-2 ${theme === 'escuro' ? 'text-purple-300' : 'text-[#4b3670]'}`}>Cada erro tira 1 vida!</h2><p className={`text-lg mb-6 ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>Tenha foco e cuidado pra não perder suas vidas. Vai, você consegue!</p><button onClick={onClose} className="mt-4 w-full text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)', }}>OK, ENTENDI</button></div></div> );
}

/**
 * Modal de Game Over (Vidas = 0)
 * Mostra o timer de regeneração e as opções de recuperar vida (Anúncio, Home).
 */
function GameOverModal({ regenerationTime, onGoHome, onWatchAd }) { 
    const { theme, lives } = useSettings();
    const [timeRemaining, setTimeRemaining] = useState(0);

    // Cronômetro regressivo
    useEffect(() => {
        const updateTimer = () => {
            const now = Date.now();
            // Calcula o tempo restante em segundos, limitado a 0
            const remaining = Math.max(0, Math.ceil((regenerationTime - now) / 1000)); 
            setTimeRemaining(remaining);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [regenerationTime, lives]);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-poppins p-4">
            <div className={`p-8 sm:p-12 rounded-3xl border-2 max-w-lg text-center ${theme === 'escuro' ? 'bg-gray-800 border-red-700' : 'bg-white border-red-400'}`} style={{ boxShadow: '0 0 50px rgba(239, 68, 68, 0.6)' }}>
                <div className="flex justify-center mb-6">{[...Array(5)].map((_, i) => ( <HeartIcon key={i} filled={false} /> ))}</div>
                <h2 className="text-3xl font-bold mb-4" style={{ backgroundImage: 'linear-gradient(90deg, #EF4444, #F87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sem Vidas! 💔</h2>
                <p className={`text-lg mb-6 ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>Você perdeu todas as suas vidas. Não se preocupe, elas vão regenerar!</p>
                
                {/* Display do Timer */}
                <div className={`p-6 rounded-2xl mb-6 ${theme === 'escuro' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-sm mb-2 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>Tempo restante para regeneração:</p>
                    <p className="text-5xl font-bold tracking-wider" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
                </div>
                
                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    {/* Botão Secundário: Voltar para a Home */}
                    <button
                        onClick={onGoHome}
                        className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer transition transform duration-200 hover:scale-105"
                        style={{ backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)', padding: '2px' }}
                    >
                        <span 
                        className={`block px-7 py-2 rounded-xl ${
                            theme === 'escuro' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                        }`}
                        >
                        Voltar para Home
                        </span>
                    </button>
                    {/* Botão Principal: Ver Anúncio (+1 Vida) */}
                    <button
                        onClick={onWatchAd}
                        className="text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
                        style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}
                    >
                        Ver Anúncio (+1 Vida)
                    </button>
                </div>
            </div>
        </div>
    );
}

function ReviewScreen({ errorCount, onContinue }) {
    // Modal que aparece quando a lição termina com erros. Oferece a opção de refazer (Redo Mode).
    const { theme } = useSettings();
    return ( <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-poppins p-4"><div className={`p-8 sm:p-12 rounded-3xl flex flex-col items-center gap-6 sm:gap-8 w-full max-w-xl ${ theme === 'escuro' ? 'bg-gray-800' : 'bg-white' }`} style={{boxShadow: '0px 0px 70px 0px rgba(176, 129, 255, 0.5)'}}><div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12"><p className="text-2xl sm:text-3xl font-semibold text-center sm:text-left" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }}>Agora vamos refazer<br/>os exercícios que<br/>você errou!</p><img src={robotReviewImage} alt="Robô de revisão" className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}/></div><p className="text-lg font-bold text-red-500 tracking-widest">{errorCount} {errorCount === 1 ? 'ERRO' : 'ERROS'}</p><button onClick={onContinue} className="text-lg sm:text-xl font-semibold py-3 px-12 sm:py-4 sm:px-16 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(176, 129, 255, 0.4)' }}>Continuar</button></div></div> );
}

// Helper para estilos do SweetAlert
const getSwalPopupStyles = (theme) => ({
    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white text-gray-800'}`,
    title: `${theme === 'escuro' ? 'text-slate-100' : 'text-slate-900'}`,
    htmlContainer: `${theme === 'escuro' ? 'text-slate-300' : 'text-gray-700'}`,
    confirmButton: 'btn-gradient-glow text-lg font-semibold py-3 px-8 rounded-2xl text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
});


// --- COMPONENTE PRINCIPAL: ActivityPlayer ---
export default function ActivityPlayer() {
    const navigate = useNavigate();
    const { lessonId } = useParams();

    // Puxo todos os estados e setters do Contexto Global
    const {
        lives, setLives,
        lcoins, setLcoins,
        dailyStreak, setDailyStreak,
        lastCompletedTimestamp, setLastCompletedTimestamp,
        timeSpentToday, setTimeSpentToday,
        lessonProgress, setLessonProgress,
        livesRegenerationTime,
        isRegeneratingLives,
        doubleXpExpiresAt,
        theme,
        setLivesRegenerationTime // Setter para parar o timer de regeneração
    } = useSettings();

    // Ref para rastrear o progresso inicial antes de começar a lição (para calcular o 'isFirstTime')
    const initialProgressRef = useRef(lessonProgress[lessonId]?.completed || 0);

    // Carrega o pacote de lição (steps) e os metadados
    const lessonData = lessonDatabase[lessonId];
    const lessonInfo = lessonLookup[lessonId];

    // Checagem de Erro: Se a lição não existe, redireciona para a Home
    if (!lessonData || !lessonInfo) {
        useEffect(() => {
            console.error(`ActivityPlayer: ID da lição ('${lessonId}') não encontrado. Redirecionando...`);
            navigate('/');
        }, [navigate, lessonId]);
        return null;
    }

    const LESSON_REWARD = 50; // Lcoins ganhas ao completar pela primeira vez
    const ACTIVITY_TIME_MINUTES = 5; // Tempo/XP ganho por completar

    // --- Estados da Máquina de Lição ---
    const [currentStepIndex, setCurrentStepIndex] = useState(0); // Qual passo estou?
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Resposta selecionada
    const [isChecking, setIsChecking] = useState(false); // Estamos verificando a resposta?
    const [notification, setNotification] = useState({ visible: false, type: '', message: '' }); // Notificação inferior
    const [showFirstMistakeModal, setShowFirstMistakeModal] = useState(false); // Modal da 1ª vida perdida
    const [hasSeenFirstMistakeModal, setHasSeenFirstMistakeModal] = useState(false); // Flag de "já vi"
    const [showGameOverModal, setShowGameOverModal] = useState(false); // Modal de Fim de Jogo
    const [incorrectSteps, setIncorrectSteps] = useState([]); // Array de índices de passos errados
    const [isRedoMode, setIsRedoMode] = useState(false); // Estou refazendo só os erros?
    const [redoIndex, setRedoIndex] = useState(0); // Qual passo errado estou refazendo?
    const [showReviewScreen, setShowReviewScreen] = useState(false); // Tela de "Vamos revisar"
    const [isFirstLessonOfDay, setIsFirstLessonOfDay] = useState(false); // Flag para a lógica de streak

    const allLessonSteps = lessonData.steps;
    const totalLessonSteps = allLessonSteps.length; // Total de vídeos + perguntas + modal
    const totalInteractiveSteps = lessonInfo.totalSteps; // Total SÓ de perguntas

    const handleCloseFirstMistakeModal = () => setShowFirstMistakeModal(false);

    /**
     * Inicia o modo de Refazer Erros (Redo Mode)
     */
    const startRedoMode = () => {
        setShowReviewScreen(false);
        setIsRedoMode(true);
        setRedoIndex(0);
        // O primeiro passo no Redo Mode é o primeiro passo que foi marcado como incorreto
        setCurrentStepIndex(incorrectSteps[0]); 
        setSelectedAnswer(null);
        setIsChecking(false);
    };

    const handleSelectAnswer = (index) => {
        if (isChecking) return;
        setSelectedAnswer(index);
    };

    // --- Lógica de Game Over ---
    
    // Volta para a home (usado no modal GameOver)
    const handleGoHome = () => {
        navigate('/home');
    };

    // Vê anúncio e recupera 1 vida (usado no modal GameOver)
    const handleWatchAd = () => {
        console.log("Simulando anúncio... recompensando com 1 vida.");
        
        // Dá 1 vida
        setLives(1);
        
        // Zera o temporizador de regeneração (já que o usuário "furou" a fila)
        setLivesRegenerationTime(null); 
        
        // Fecha o modal e retorna à lição
        setShowGameOverModal(false);
    };
    // --- Fim da Lógica de Game Over ---


    /**
     * Lógica que atualiza o Streak e as Metas Diárias
     */
    const completeLessonAndGiveRewards = () => {
        const today = new Date();
        const todayTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

        // 1. Lógica do STREAK (Só roda se a última atividade não foi hoje)
        if (lastCompletedTimestamp !== todayTimestamp) {
            console.log("Primeira atividade COMPLETA do dia. Verificando streak...");
            setIsFirstLessonOfDay(true);
            const yesterdayTimestamp = todayTimestamp - 86400000;

            if (lastCompletedTimestamp === yesterdayTimestamp) {
                console.log("Dia consecutivo! Streak +1");
                setDailyStreak(prevStreak => prevStreak + 1);
            } else {
                console.log("Sequência quebrada ou iniciada. Streak = 1");
                // NOTA: O reset do streak (para 0) é feito no SettingsContext.jsx, no load.
                setDailyStreak(1); 
            }
            
            // 2. Lógica da Meta Diária (Tempo)
            setTimeSpentToday(ACTIVITY_TIME_MINUTES); // Adiciona o tempo da lição à meta
            setLastCompletedTimestamp(todayTimestamp); // Seta a data de conclusão
        } else {
            console.log("Já completou uma lição hoje. Adicionando tempo à meta.");
            setIsFirstLessonOfDay(false);
            setTimeSpentToday(prevTime => prevTime + ACTIVITY_TIME_MINUTES);
        }
    };

    /**
     * Finaliza a lição, calcula recompensas e navega para /finalizado
     */
    const finishLesson = (errorCount) => {
        const finalCompletedSteps = totalInteractiveSteps;
        const finalTotalSteps = totalInteractiveSteps;

        // Força o progresso a ser completo para garantir o desbloqueio visual
        setLessonProgress(prev => ({
            ...prev,
            [lessonId]: { completed: finalCompletedSteps, total: finalTotalSteps }
        }));

        completeLessonAndGiveRewards(); // Dá o streak/tempo (meta diária)

        // Calcula se é a primeira vez que o usuário completa esta lição
        const isFirstTimeFullCompletion = initialProgressRef.current < finalCompletedSteps;
        
        // 1. Lógica do XP (com Dobro XP)
        const isDoubleXpActive = doubleXpExpiresAt && Date.now() < doubleXpExpiresAt;
        const xpGained = isDoubleXpActive ? ACTIVITY_TIME_MINUTES * 2 : ACTIVITY_TIME_MINUTES;
        
        // 2. Lógica das Lcoins (Só ganha na primeira vez)
        if (isFirstTimeFullCompletion) {
            setLcoins(prevLcoins => prevLcoins + LESSON_REWARD);
        }

        const isCheckpoint = lessonInfo?.isCheckpoint ?? false;

        // Navega para a tela de finalização, passando todos os resultados no state
        navigate('/finalizado', {
            state: {
                errorCount: errorCount,
                totalExercises: finalCompletedSteps,
                isFirstTime: isFirstTimeFullCompletion,
                xpGained: xpGained,
                isCheckpoint: isCheckpoint,
                isFirstLessonOfDay: isFirstLessonOfDay,
                lessonId: lessonId
            }
        });
    };

    /**
     * Função que avança para o próximo passo da lição (ou do Redo Mode)
     */
    const proceedToNextStep = () => {
        setNotification({ visible: false, type: '', message: '' });
        setIsChecking(false);
        setSelectedAnswer(null);

        // Se acabaram as vidas, mostra o modal de Game Over
        if (lives <= 0) {
            setShowGameOverModal(true);
            return;
        }

        if (isRedoMode) {
            // --- MODO REFAZER ERROS (REDO MODE) ---
            const nextRedoIndex = redoIndex + 1;
            if (nextRedoIndex < incorrectSteps.length) {
                // Se ainda há erros para refazer
                setRedoIndex(nextRedoIndex);
                setCurrentStepIndex(incorrectSteps[nextRedoIndex]);
            } else {
                // Se todos os erros foram refeitos
                console.log("Redo concluído. Navegando para /finalizado");
                finishLesson(incorrectSteps.length);
            }
        } else {
            // --- MODO NORMAL ---
            const nextStepIndex = currentStepIndex + 1;

            if (nextStepIndex < totalLessonSteps) {
                // Se há mais passos, avança
                setCurrentStepIndex(nextStepIndex);
            } else {
                // Fim da lição no modo normal
                console.warn("proceedToNextStep: Fim da lição atingido. Direcionando para a tela de revisão.");
                if (incorrectSteps.length === 0) {
                    // Se acertou tudo, finaliza
                    finishLesson(0);
                } else {
                    // Se errou, mostra a tela de revisão
                    setShowReviewScreen(true);
                }
            }
        }
    };

    // Lógica para PULAR um vídeo ou um passo
    const handleSkip = () => {
        const isLastStep = currentStepIndex === totalLessonSteps - 1;

        if (isLastStep && !isRedoMode) {
            // Se pulou o último passo, trata como fim da lição
            if (incorrectSteps.length === 0) {
                finishLesson(0);
            } else {
                setShowReviewScreen(true);
            }
            return;
        } else {
            proceedToNextStep();
        }
    };

    /**
     * Lógica de Verificação da Resposta
     */
    const handleCheckAnswer = () => {
        if (selectedAnswer === null) {
            // Precisa selecionar uma resposta
            Swal.fire({
                title: 'Opa!',
                text: 'Você precisa selecionar uma resposta primeiro.',
                icon: 'info',
                confirmButtonText: 'OK',
                customClass: getSwalPopupStyles(theme), 
                buttonsStyling: false, 
            });
            return;
        }

        const currentStep = allLessonSteps[currentStepIndex];
        const correctAnswer = currentStep.correctAnswer;
        const message = `A resposta correta era a Opção ${correctAnswer + 1}.`;

        if (selectedAnswer === correctAnswer) {
            // --- Resposta CORRETA ---
            if (!isRedoMode) {
                // Se não estiver no modo de refazer, incrementa o progresso
                const currentCompleted = lessonProgress[lessonId]?.completed || 0;
                if (currentCompleted < totalInteractiveSteps) {
                    setLessonProgress(prev => ({
                        ...prev,
                        [lessonId]: { completed: currentCompleted + 1, total: totalInteractiveSteps }
                    }));
                }
            }

            setNotification({ visible: true, type: 'correct', message: 'Você acertou!' });
            setIsChecking(true);

        } else {
            // --- Resposta INCORRETA ---
            if (lives > 0) {
                setLives(lives - 1); // Perde 1 vida
            }

            if (!isRedoMode && !incorrectSteps.includes(currentStepIndex)) {
                // Adiciona o erro ao array para o Redo Mode posterior
                setIncorrectSteps(prev => [...prev, currentStepIndex].sort((a, b) => a - b));
            }

            if (!hasSeenFirstMistakeModal) {
                // Mostra o modal da primeira vida perdida
                setShowFirstMistakeModal(true);
                setHasSeenFirstMistakeModal(true);
            }

            // Game Over
            if (lives - 1 <= 0) {
                // Se a vida chegou a zero (próximo estado)
                setShowGameOverModal(true);
                setNotification({ visible: false, type: '', message: '' }); // Esconde a notificação inferior
                return;
            }

            setNotification({ visible: true, type: 'incorrect', message: message });
            setIsChecking(true);
        }
    };

    // Calcula a porcentagem de progresso para a barra
    let progressPercent;
    if (isRedoMode) {
        // No modo refazer, o progresso vai de 85% a 100%
        progressPercent = 85 + ((redoIndex / incorrectSteps.length) * 15);
    } else {
        // No modo normal, o progresso vai de 0% a 100% (com base no passo atual)
        progressPercent = totalLessonSteps > 1 ? (currentStepIndex / (totalLessonSteps - 1)) * 100 : 0;
    }
    
    // O componente atual a ser renderizado (Step1, StepVideo ou StepPergunta)
    const CurrentStepComponent = allLessonSteps[currentStepIndex].component;

    // Se as vidas forem restauradas (ex: ad), esconde o modal de game over
    useEffect(() => {
        if (lives > 0 && showGameOverModal) {
            setShowGameOverModal(false);
        }
    }, [lives]);

    return (
        <Fragment>
            {/* Injeta o CSS do gradiente para o SweetAlert */}
            <style>{`
                .btn-gradient-glow {
                    background-image: linear-gradient(90deg, #b081ff, #59b1ff);
                    box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
                }
            `}</style>
            
            {/* Renderiza o componente do passo atual */}
            <CurrentStepComponent
                onNext={handleSkip}
                onCheckAnswer={handleCheckAnswer}
                onSelectAnswer={handleSelectAnswer}
                selectedAnswer={selectedAnswer}
                isChecking={isChecking}
                progress={progressPercent}
                lives={lives}
                lessonTitle={lessonData.title}
                lessonSubtitle={lessonData.subtitle}
                // isFinal: Se for o último passo NO MODO NORMAL
                isFinal={currentStepIndex === totalLessonSteps - 1 && !isRedoMode} 
            />

            {/* --- Modais e Notificações (Renderização Condicional) --- */}
            
            {/* Modal de Game Over (Só se estiver em regeneração) */}
            {showGameOverModal && isRegeneratingLives && (
                <GameOverModal 
                    regenerationTime={livesRegenerationTime} 
                    onGoHome={handleGoHome}
                    onWatchAd={handleWatchAd}
                />
            )}

            {/* Modal da Primeira Vida Perdida */}
            {showFirstMistakeModal && <FirstIncorrectAnswerModal lives={lives} onClose={handleCloseFirstMistakeModal} />}
            
            {/* Tela de Revisão (só aparece se terminou a primeira rodada com erros) */}
            {showReviewScreen && <ReviewScreen errorCount={incorrectSteps.length} onContinue={startRedoMode} />}
            
            {/* Notificação Inferior (Feedback Correto/Incorreto) */}
            {notification.visible && (
                <BottomNotification
                    type={notification.type}
                    message={notification.message}
                    onContinue={proceedToNextStep} // Avança para o próximo passo
                />
            )}
        </Fragment>
    );
}