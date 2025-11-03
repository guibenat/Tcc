import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../components/SettingsContext';

// --- Assets Globais ---
// (Movido 'coracaoImage' e 'robotReviewImage' para cá, pois são globais)
import coracaoImage from '../assets/coracaoo.png';
import robotReviewImage from '../assets/robot-review.png';

// --- Animação Global ---
const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

// --- Estilos de Scrollbar Global ---
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(200, 200, 200, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #b081ff, #59b1ff);
    border-radius: 10px;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: #59b1ff #f1f1f1;
  }
`;

// --- Componentes de UI Globais (Movidos de ComecarDoZero) ---

function BottomNotification({ type, message, onContinue }) {
    const isCorrect = type === 'correct';
    const containerStyle = isCorrect
        ? "bg-purple-900 border-t-4 border-purple-700"
        : "bg-red-900 border-t-4 border-red-700";
    const titleStyle = "text-white";
    const messageStyle = isCorrect ? "text-purple-200" : "text-red-200";
    const Icon = () => isCorrect ? (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
         </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-300" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
         </svg>
    );
     const buttonStyle = isCorrect
        ? { backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(176, 129, 255, 0.4)' }
        : { backgroundImage: 'linear-gradient(90deg, #EF4444, #F87171)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' };

    return (
        <div className={`fixed bottom-0 left-0 right-0 p-6 shadow-lg z-40 ${containerStyle}`}>
            <div className="container mx-auto flex items-center justify-between max-w-4xl">
                <div className="flex items-center gap-4">
                    <Icon />
                    <div>
                        <p className={`text-2xl font-bold ${titleStyle}`}>
                            {isCorrect ? "Muito bem!" : "Você errou!"}
                        </p>
                        <p className={`text-lg ${messageStyle}`}>{message}</p>
                    </div>
                </div>
                <button
                    onClick={onContinue}
                    className="text-xl font-semibold py-4 px-12 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
                    style={buttonStyle}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}

function FirstIncorrectAnswerModal({ lives, onClose }) {
    const { theme } = useSettings();
    const HeartIcon = ({ filled }) => (
      <img 
          src={coracaoImage} 
          alt={filled ? "Coração cheio" : "Coração vazio"}
          className="w-8 h-8"
          style={{
              filter: filled ? 'none' : 'grayscale(1)',
              opacity: filled ? 1 : 0.4
          }}
      />
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-poppins">
            <div 
                className={`p-8 rounded-2xl border-2 max-w-lg text-center ${
                    theme === 'escuro' ? 'bg-gray-800 border-blue-700' : 'bg-white border-blue-400'
                }`} 
                style={{ boxShadow: '0 0 50px rgba(90, 177, 255, 0.6)' }}
            >
                <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                       <HeartIcon key={i} filled={i < lives} />
                    ))}
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${theme === 'escuro' ? 'text-purple-300' : 'text-[#4b3670]'}`}>
                    Cada erro tira 1 vida!
                </h2>
                <p className={`text-lg mb-6 ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tenha foco e cuidado pra não perder suas vidas. Vai, você consegue!
                </p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                        boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
                    }}
                >
                    OK, ENTENDI
                </button>
            </div>
        </div>
    );
}

function GameOverModal({ onClose }) {
    const { theme } = useSettings();
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-poppins">
            <div 
                className={`p-8 rounded-2xl border-2 max-w-lg text-center ${
                    theme === 'escuro' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-400'
                }`} 
                style={{ boxShadow: '0 0 50px rgba(156, 163, 175, 0.6)' }}
            >
                <h2 className={`text-2xl font-bold mb-4 ${theme === 'escuro' ? 'text-gray-200' : 'text-gray-800'}`}>
                    Fim de Jogo!
                </h2>
                <p className={`text-lg mb-6 ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Você ficou sem vidas. Mas não desista, tente novamente!
                </p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                        boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
                    }}
                >
                    Tentar Novamente
                </button>
            </div>
        </div>
    );
}

function ReviewScreen({ errorCount, onContinue }) {
    const { theme } = useSettings();
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-poppins p-4">
            <div 
                className={`p-8 sm:p-12 rounded-3xl flex flex-col items-center gap-6 sm:gap-8 w-full max-w-xl ${
                    theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
                }`}
                style={{boxShadow: '0px 0px 70px 0px rgba(176, 129, 255, 0.5)'}}
            >
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                    <p 
                        className="text-2xl sm:text-3xl font-semibold text-center sm:text-left"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Agora vamos refazer<br/>os exercícios que<br/>você errou!
                    </p>
                    <img 
                        src={robotReviewImage} 
                        alt="Robô de revisão" 
                        className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0"
                        style={{ animation: 'float 3s ease-in-out infinite' }}
                    />
                </div>
                <p className="text-lg font-bold text-red-500 tracking-widest">
                    {errorCount} {errorCount === 1 ? 'ERRO' : 'ERROS'}
                </p>
                <button
                    onClick={onContinue}
                    className="text-lg sm:text-xl font-semibold py-3 px-12 sm:py-4 sm:px-16 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105"
                    style={{ 
                        backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                        boxShadow: '0 4px 15px rgba(176, 129, 255, 0.4)'
                    }}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}

// --- O "Motor" de Atividades ---
export default function ActivityPlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lesson } = location.state || {}; // Recebe a lição da Home

  // Se não houver lição (ex: usuário recarregou a página), volta pra Home
  useEffect(() => {
    if (!lesson) {
      navigate('/');
    }
  }, [lesson, navigate]);

  // --- Toda a lógica de estado foi movida para cá ---
  const [currentStep, setCurrentStep] = useState(0);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [lives, setLives] = useState(5);
  const [notification, setNotification] = useState({ visible: false, type: '', message: '' });
  const [isChecking, setIsChecking] = useState(false);
  const [showFirstMistakeModal, setShowFirstMistakeModal] = useState(false);
  const [hasSeenFirstMistakeModal, setHasSeenFirstMistakeModal] = useState(false);
  const [wasFinalAnswer, setWasFinalAnswer] = useState(false);
  const [incorrectSteps, setIncorrectSteps] = useState([]);
  const [isRedoMode, setIsRedoMode] = useState(false);
  const [redoIndex, setRedoIndex] = useState(0);
  const [showReviewScreen, setShowReviewScreen] = useState(false);

  // O estado das respostas agora é um objeto dinâmico
  const [answers, setAnswers] = useState({});

  // --- Funções Lógicas (quase idênticas ao original) ---

  const totalSteps = lesson ? lesson.steps.length : 0;

  const handleSelectAnswer = (stepIndex, answer) => {
    setAnswers(prev => ({ ...prev, [stepIndex]: answer }));
  };
  
  const startRedoMode = () => {
    setShowReviewScreen(false);
    setIsRedoMode(true);
    setRedoIndex(0);
    setAnswers(prev => {
        const resetAnswers = { ...prev };
        incorrectSteps.forEach(stepIndex => {
            resetAnswers[stepIndex] = null;
        });
        return resetAnswers;
    });
    setCurrentStep(incorrectSteps[0]);
  };

  const resetGame = () => {
      // Ao resetar, voltamos para a Home
      navigate('/');
  };

  const proceed = () => {
    setIsChecking(false);
    setNotification({ visible: false, type: '', message: '' });
    
    if (lives <= 0) {
      setShowGameOverModal(true);
      return;
    }

    if (isRedoMode) {
        if (redoIndex < incorrectSteps.length - 1) {
            const nextRedoIndex = redoIndex + 1;
            setRedoIndex(nextRedoIndex);
            setCurrentStep(incorrectSteps[nextRedoIndex]);
        } else {
            setIsRedoMode(false);
            console.log("Respostas Finais (Após Revisão):", answers);
            alert("Lição concluída! Respostas salvas no console!");
            resetGame(); // Volta pra Home
        }
        return;
    }

    if (wasFinalAnswer) {
        if (incorrectSteps.length > 0) {
            setShowReviewScreen(true);
        } else {
            console.log("Respostas Finais:", answers);
            alert("Lição concluída! Respostas salvas no console!");
            resetGame(); // Volta pra Home
        }
        return;
    }

    if (currentStep < totalSteps - 1) { // -1 porque os índices começam em 0
        setCurrentStep(prev => prev + 1);
    } else {
      // Lógica de final de lição movida para checkAnswer
      // Este 'else' não deve ser alcançado se 'wasFinalAnswer' for tratado
      console.log("Chegou ao fim inesperadamente");
    }
  };

  const checkAnswer = (isFinal) => {
    const stepData = lesson.steps[currentStep];
    const selectedAnswer = answers[currentStep];
    
    // Pula se a etapa não for uma pergunta
    if (stepData.correctAnswer === undefined) {
        proceed();
        return;
    }

    if (selectedAnswer === null || selectedAnswer === undefined) {
      console.log("Por favor, selecione uma resposta.");
      // Poderíamos mostrar um toast/alerta aqui
      return;
    }
    
    setIsChecking(true);
    setWasFinalAnswer(isFinal); 

    const correctAnswer = stepData.correctAnswer;
    const message = `A resposta correta era a Opção ${correctAnswer + 1}.`; // Ajustar se necessário

    if (selectedAnswer === correctAnswer) {
      setNotification({
        visible: true,
        type: 'correct',
        message: 'Você acertou!',
      });
    } else {
      const newLives = lives - 1;
      setLives(newLives);

      if(!isRedoMode && !incorrectSteps.includes(currentStep)){
        setIncorrectSteps(prev => [...prev, currentStep].sort((a,b)=>a-b));
      }

      if (!hasSeenFirstMistakeModal) {
        setShowFirstMistakeModal(true);
        setHasSeenFirstMistakeModal(true);
      }
      
      setNotification({
        visible: true,
        type: 'incorrect',
        message: message,
      });
    }
  };
  
  const handleCheckAnswer = () => checkAnswer(false);
  const handleFinish = () => checkAnswer(true);

  const handleNotificationContinue = () => {
    proceed();
  };
  
  const handleCloseFirstMistakeModal = () => {
    setShowFirstMistakeModal(false);
  };

  // --- Lógica de Renderização ---

  // Se a lição ainda não carregou, não renderiza nada.
  if (!lesson) {
    return null; 
  }

  let progress;
  if (isRedoMode) {
      const redoProgress = (redoIndex + 1) / incorrectSteps.length;
      progress = 85 + (redoProgress * 15);
  } else {
      // O progresso agora conta todas as etapas, não apenas as "principais"
      progress = currentStep > 0 ? (currentStep / (totalSteps -1)) * 100 : 0;
  }

  const renderStep = () => {
    const stepData = lesson.steps[currentStep];
    const StepComponent = stepData.component;

    // Props que todos os componentes de etapa recebem
    const commonProps = {
        lessonTitle: lesson.title,
        lessonSubtitle: lesson.subtitle,
        progress: progress,
        lives: lives,
        isChecking: isChecking,
    };
    
    // Props específicas para cada tipo de etapa
    let specificProps = {};

    switch(stepData.type) {
        case 'modal-inicio':
            specificProps = {
                onNext: () => setCurrentStep(prev => prev + 1)
            };
            break;
        case 'video':
            specificProps = {
                onNext: () => setCurrentStep(prev => prev + 1)
            };
            break;
        case 'pergunta': // Tipo genérico de pergunta
            specificProps = {
                onNext: () => setCurrentStep(prev => prev + 1), // Para o botão "Pular"
                onCheckAnswer: (currentStep === totalSteps - 1) ? handleFinish : handleCheckAnswer,
                onSelectAnswer: (answer) => handleSelectAnswer(currentStep, answer),
                selectedAnswer: answers[currentStep] || null,
            };
            break;
        // Adicionar outros 'case' para novos tipos de atividade aqui
        default:
            specificProps = {
                onNext: () => setCurrentStep(prev => prev + 1)
            };
    }

    return <StepComponent {...commonProps} {...specificProps} />;
  };

  return (
    <>
      <style>{floatAnimation}</style>
      <style>{scrollbarStyles}</style>
      
      {renderStep()}
      
      {showReviewScreen && <ReviewScreen errorCount={incorrectSteps.length} onContinue={startRedoMode} />}
      {showGameOverModal && <GameOverModal onClose={resetGame} />}
      {showFirstMistakeModal && <FirstIncorrectAnswerModal lives={lives} onClose={handleCloseFirstMistakeModal} />}
      {notification.visible && (
          <BottomNotification 
            type={notification.type} 
            message={notification.message}
            onContinue={handleNotificationContinue}
          />
      )}
    </>
  );
}