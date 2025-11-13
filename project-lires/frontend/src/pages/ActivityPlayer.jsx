import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSettings } from '../components/SettingsContext';

import { lessonLookup } from '../lessons/lessonMap.jsx';
import { comecarDoZeroLesson } from '../lessons/comecarDoZeroLesson.jsx';
import { saudacoesAvancadasLesson } from '../lessons/saudacoesAvancadasLesson.jsx';
import { checkpoint1Lesson } from '../lessons/checkpoint1Lesson.jsx';
import { alfabetoLetraALesson } from '../lessons/alfabetoLetraALesson.jsx';
import { alfabetoConsoantesLesson } from '../lessons/alfabetoConsoantesLesson.jsx';
import { alfabetoRevisaoLesson } from '../lessons/alfabetoRevisaoLesson.jsx';
import coracaoImage from '../assets/coracaoo.png';
import robotReviewImage from '../assets/robot-review.png';

const lessonDatabase = {
    'comecar-do-zero': comecarDoZeroLesson,
    'saudacoes-avancadas': saudacoesAvancadasLesson,
    'checkpoint-1': checkpoint1Lesson,
    'alfabeto-letra-a': alfabetoLetraALesson,
    'alfabeto-consoantes': alfabetoConsoantesLesson,
    'alfabeto-revisao': alfabetoRevisaoLesson,
};

// --- Componentes Visuais ---
function BottomNotification({ type, message, onContinue }) {
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
    const { theme } = useSettings();
    return ( <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-poppins"><div className={`p-8 rounded-2xl border-2 max-w-lg text-center ${ theme === 'escuro' ? 'bg-gray-800 border-blue-700' : 'bg-white border-blue-400' }`} style={{ boxShadow: '0 0 50px rgba(90, 177, 255, 0.6)' }}><div className="flex justify-center mb-4">{[...Array(5)].map((_, i) => ( <HeartIcon key={i} filled={i < lives} /> ))}</div><h2 className={`text-2xl font-bold mb-2 ${theme === 'escuro' ? 'text-purple-300' : 'text-[#4b3670]'}`}>Cada erro tira 1 vida!</h2><p className={`text-lg mb-6 ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>Tenha foco e cuidado pra não perder suas vidas. Vai, você consegue!</p><button onClick={onClose} className="mt-4 w-full text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)', }}>OK, ENTENDI</button></div></div> );
}

function GameOverModal({ regenerationTime }) {
    const { theme, lives } = useSettings();
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        const updateTimer = () => {
            const now = Date.now();
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
                <p className={`text-lg mb-6 ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>Você perdeu todas as suas vidas. Não se preocupe, elas vão regenerar automaticamente!</p>
                <div className={`p-6 rounded-2xl mb-6 ${theme === 'escuro' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-sm mb-2 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>Tempo restante para regeneração:</p>
                    <p className="text-5xl font-bold tracking-wider" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
                </div>
                <p className={`text-sm ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>⏱️ Suas 5 vidas voltarão automaticamente quando o tempo acabar!</p>
            </div>
        </div>
    );
}

function ReviewScreen({ errorCount, onContinue }) {
    const { theme } = useSettings();
    return ( <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-poppins p-4"><div className={`p-8 sm:p-12 rounded-3xl flex flex-col items-center gap-6 sm:gap-8 w-full max-w-xl ${ theme === 'escuro' ? 'bg-gray-800' : 'bg-white' }`} style={{boxShadow: '0px 0px 70px 0px rgba(176, 129, 255, 0.5)'}}><div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12"><p className="text-2xl sm:text-3xl font-semibold text-center sm:text-left" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }}>Agora vamos refazer<br/>os exercícios que<br/>você errou!</p><img src={robotReviewImage} alt="Robô de revisão" className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}/></div><p className="text-lg font-bold text-red-500 tracking-widest">{errorCount} {errorCount === 1 ? 'ERRO' : 'ERROS'}</p><button onClick={onContinue} className="text-lg sm:text-xl font-semibold py-3 px-12 sm:py-4 sm:px-16 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(176, 129, 255, 0.4)' }}>Continuar</button></div></div> );
}

// --- COMPONENTE PRINCIPAL ---
export default function ActivityPlayer() {
    const navigate = useNavigate();
    const { lessonId } = useParams();

    const {
        lives, setLives,
        lcoins, setLcoins,
        dailyStreak, setDailyStreak,
        lastCompletedTimestamp, setLastCompletedTimestamp,
        timeSpentToday, setTimeSpentToday,
        lessonProgress, setLessonProgress,
        livesRegenerationTime,
        isRegeneratingLives,
    } = useSettings();

    const initialProgressRef = useRef(lessonProgress[lessonId]?.completed || 0);

    const lessonData = lessonDatabase[lessonId];
    const lessonInfo = lessonLookup[lessonId];

    if (!lessonData || !lessonInfo) {
        useEffect(() => {
            console.error(`ActivityPlayer: ID da lição ('${lessonId}') não encontrado. Redirecionando...`);
            navigate('/');
        }, [navigate, lessonId]);
        return null;
    }

    const LESSON_REWARD = 50;
    const ACTIVITY_TIME_MINUTES = 5;

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [notification, setNotification] = useState({ visible: false, type: '', message: '' });
    const [showFirstMistakeModal, setShowFirstMistakeModal] = useState(false);
    const [hasSeenFirstMistakeModal, setHasSeenFirstMistakeModal] = useState(false);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [incorrectSteps, setIncorrectSteps] = useState([]);
    const [isRedoMode, setIsRedoMode] = useState(false);
    const [redoIndex, setRedoIndex] = useState(0);
    const [showReviewScreen, setShowReviewScreen] = useState(false);

    const allLessonSteps = lessonData.steps;
    const totalLessonSteps = allLessonSteps.length;
    const totalInteractiveSteps = lessonInfo.totalSteps;

    const handleCloseFirstMistakeModal = () => setShowFirstMistakeModal(false);

    const startRedoMode = () => {
        setShowReviewScreen(false);
        setIsRedoMode(true);
        setRedoIndex(0);
        setCurrentStepIndex(incorrectSteps[0]);
        setSelectedAnswer(null);
        setIsChecking(false);
    };

    const handleSelectAnswer = (index) => {
        if (isChecking) return;
        setSelectedAnswer(index);
    };

    const completeLessonAndGiveRewards = () => {
        const today = new Date();
        const todayTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

        if (lastCompletedTimestamp !== todayTimestamp) {
            console.log("Primeira atividade COMPLETA do dia. Verificando streak...");
            const yesterdayTimestamp = todayTimestamp - 86400000;

            if (lastCompletedTimestamp === yesterdayTimestamp) {
                console.log("Dia consecutivo! Streak +1");
                setDailyStreak(prevStreak => prevStreak + 1);
            } else {
                console.log("Sequência quebrada ou iniciada. Streak = 1");
                setDailyStreak(1);
            }

            setTimeSpentToday(ACTIVITY_TIME_MINUTES);
            setLastCompletedTimestamp(todayTimestamp);
        } else {
            console.log("Já completou uma lição hoje. Adicionando tempo à meta.");
            setTimeSpentToday(prevTime => prevTime + ACTIVITY_TIME_MINUTES);
        }
    };

    const finishLesson = (errorCount) => {
        const finalCompletedSteps = totalInteractiveSteps;
        const finalTotalSteps = totalInteractiveSteps;

        console.log(`ActivityPlayer: Finalizando lição. Forçando progresso para ${finalCompletedSteps} / ${finalTotalSteps} passos.`);

        setLessonProgress(prev => ({
            ...prev,
            [lessonId]: { completed: finalCompletedSteps, total: finalTotalSteps }
        }));

        completeLessonAndGiveRewards();

        const isFirstTimeFullCompletion = initialProgressRef.current < finalCompletedSteps;
        console.log(`ActivityPlayer: Progresso inicial era ${initialProgressRef.current}. É a primeira vez? ${isFirstTimeFullCompletion}`);

        if (isFirstTimeFullCompletion) {
            setLcoins(prevLcoins => prevLcoins + LESSON_REWARD);
        }

        navigate('/finalizado', {
            state: {
                errorCount: errorCount,
                totalExercises: finalCompletedSteps,
                isFirstTime: isFirstTimeFullCompletion
            }
        });
    };

    const proceedToNextStep = () => {
        setNotification({ visible: false, type: '', message: '' });
        setIsChecking(false);
        setSelectedAnswer(null);

        if (lives <= 0) {
            setShowGameOverModal(true);
            return;
        }

        if (isRedoMode) {
            const nextRedoIndex = redoIndex + 1;
            if (nextRedoIndex < incorrectSteps.length) {
                setRedoIndex(nextRedoIndex);
                setCurrentStepIndex(incorrectSteps[nextRedoIndex]);
            } else {
                console.log("Redo concluído. Navegando para /finalizado");
                finishLesson(incorrectSteps.length);
            }
        } else {
            const nextStepIndex = currentStepIndex + 1;

            if (nextStepIndex < totalLessonSteps) {
                setCurrentStepIndex(nextStepIndex);
            } else {
                console.warn("proceedToNextStep: Fim da lição atingido. Direcionando para a tela de revisão.");
                if (incorrectSteps.length === 0) {
                    finishLesson(0);
                } else {
                    setShowReviewScreen(true);
                }
            }
        }
    };

    const handleSkip = () => {
        const isLastStep = currentStepIndex === totalLessonSteps - 1;

        if (isLastStep && !isRedoMode) {
            console.log("Lição 'pulada' no final. Mostrando tela de revisão.");
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

    const handleCheckAnswer = () => {
        if (selectedAnswer === null) {
            Swal.fire('Opa!', 'Você precisa selecionar uma resposta primeiro.', 'info');
            return;
        }

        const currentStep = allLessonSteps[currentStepIndex];
        const correctAnswer = currentStep.correctAnswer;
        const message = `A resposta correta era a Opção ${correctAnswer + 1}.`;

        if (selectedAnswer === correctAnswer) {
            if (!isRedoMode) {
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
            if (lives > 0) {
                setLives(lives - 1);
            }

            if (!isRedoMode && !incorrectSteps.includes(currentStepIndex)) {
                setIncorrectSteps(prev => [...prev, currentStepIndex].sort((a, b) => a - b));
            }

            if (!hasSeenFirstMistakeModal) {
                setShowFirstMistakeModal(true);
                setHasSeenFirstMistakeModal(true);
            }

            if (lives - 1 <= 0) {
                setShowGameOverModal(true);
                setNotification({ visible: false, type: '', message: '' });
                return;
            }

            setNotification({ visible: true, type: 'incorrect', message: message });
            setIsChecking(true);
        }
    };

    let progressPercent;
    if (isRedoMode) {
        progressPercent = 85 + ((redoIndex / incorrectSteps.length) * 15);
    } else {
        progressPercent = totalLessonSteps > 1 ? (currentStepIndex / (totalLessonSteps - 1)) * 100 : 0;
    }

    const CurrentStepComponent = allLessonSteps[currentStepIndex].component;

    useEffect(() => {
        if (lives > 0 && showGameOverModal) {
            setShowGameOverModal(false);
        }
    }, [lives]);

    return (
        <Fragment>
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
                isFinal={currentStepIndex === totalLessonSteps - 1 && !isRedoMode}
            />

            {showGameOverModal && isRegeneratingLives && (
                <GameOverModal regenerationTime={livesRegenerationTime} />
            )}

            {showFirstMistakeModal && <FirstIncorrectAnswerModal lives={lives} onClose={handleCloseFirstMistakeModal} />}
            {showReviewScreen && <ReviewScreen errorCount={incorrectSteps.length} onContinue={startRedoMode} />}
            {notification.visible && (
                <BottomNotification
                    type={notification.type}
                    message={notification.message}
                    onContinue={proceedToNextStep}
                />
            )}
        </Fragment>
    );
}