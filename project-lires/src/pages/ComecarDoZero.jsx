import React, { useState, useEffect } from 'react';
// --- IMPORTA O HOOK DE CONFIGURAÇÕES ---
import { useSettings } from '../components/SettingsContext';

import robotImage from '../assets/robot-happy.png';
// --- LOGOS DINÂMICAS ---
import liresLogoImage from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png'; // Logo para o modo escuro
// ---
import coracaoImage from '../assets/coracaoo.png';
import robotReviewImage from '../assets/robot-review.png';
// --- Fim da seção de imagens ---

// Animação para o robô na primeira tela
const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

// Estilos para a barra de rolagem customizada
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

// Componente para o ícone de Play (usado nas telas de vídeo)
const PlayIconPlaceholder = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-16 h-16 text-white opacity-90"
  >
    <path fillRule="evenodd" d="M4.5 5.653c0-1.082 1.397-1.786 2.37-1.272l12.72 6.848c.974.522.974 1.942 0 2.464L6.87 20.62c-.973.514-2.37-.19-2.37-1.272V5.653z" clipRule="evenodd" />
  </svg>
);

// --- Componente para o Alerta de Resposta (embaixo) ---
function BottomNotification({ type, message, onContinue }) {
    const isCorrect = type === 'correct';

    // Estilos condicionais para o tema escuro
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

// --- Componente para o Modal de Primeira Resposta Incorreta ---
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
function FirstIncorrectAnswerModal({ lives, onClose }) {
    // --- USA O TEMA ---
    const { theme } = useSettings();

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


// --- Componente para o Modal de Fim de Jogo ---
function GameOverModal({ onClose }) {
    // --- USA O TEMA ---
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

// --- Componente da Tela de Revisão ---
function ReviewScreen({ errorCount, onContinue }) {
    // --- USA O TEMA ---
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

// --- Componente da Barra de Progresso ---
function ProgressBar({ progress }) {
  // --- USA O TEMA ---
  const { theme } = useSettings();

  return (
    <div 
      className={`w-full max-w-3xl h-[14px] rounded-full overflow-hidden mb-10 ${
        theme === 'escuro' ? 'bg-gray-700' : 'bg-gray-200'
      }`} 
    >
      <div 
        className="h-full"
        style={{ 
          width: `${progress}%`, 
          backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
          transition: 'width 0.5s ease',
        }}
      ></div>
    </div>
  );
}


// --- Telas Individuais como Componentes ---

// Tela 1: Modal de Início
function Step1({ onNext }) {
  // --- USA O TEMA ---
  const { theme } = useSettings();

  return (
    <div 
      className={`flex flex-col justify-center items-center h-screen w-screen font-poppins ${
        theme === 'escuro' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <div 
        className={`shadow-lg rounded-2xl p-10 w-full h-full box-border text-center flex flex-col ${
          theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex flex-col flex-shrink-0">
          <div className="pb-2 flex justify-start">
            {/* --- LOGO DINÂMICA --- */}
            <img 
              src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
              alt="Lires Logo" 
              className="h-24" 
            />
          </div>
          <hr className={`my-0 mb-4 ${theme === 'escuro' ? 'border-gray-700' : ''}`} />
        </div>
        <div className="flex-grow flex items-center justify-center"></div>
      </div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <div
          className={`p-8 rounded-2xl border-2 flex items-center gap-8 max-w-2xl ${
            theme === 'escuro' ? 'bg-gray-800 border-blue-700' : 'bg-white border-blue-400'
          }`}
          style={{
            boxShadow: '0 0 50px rgba(90, 177, 255, 0.6)',
          }}
        >
          <div className="flex-grow text-left">
            <p className="text-xl font-semibold mb-2" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Você vai começar do básico em Libras. Prepare-se para sua primeira aula!
            </p>
            <button
              onClick={onNext}
              className="mt-4 text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
              }}
            >
              Iniciar
            </button>
          </div>
          <div className="flex-shrink-0 w-48">
            <img
              src={robotImage}
              alt="Robô Amigável"
              className="w-full"
              style={{
                animation: 'float 3s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}

// Tela 2: Vídeo 1
function Step2({ onNext, progress, lives }) {
    // --- USA O TEMA ---
    const { theme } = useSettings();

    return (
        <div 
          className={`flex flex-col h-screen w-screen font-poppins ${
            theme === 'escuro' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
          }`}
        >
            <div 
              className={`shadow-lg rounded-2xl w-full h-full box-border text-center flex flex-col ${
                theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
                <div className="flex-shrink-0 px-10 pt-10">
                    <div className="pb-2 flex justify-start">
                      {/* --- LOGO DINÂMICA --- */}
                      <img 
                        src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                        alt="Lires Logo" 
                        className="h-24" 
                      />
                    </div>
                    <hr className={`my-0 mb-4 ${theme === 'escuro' ? 'border-gray-700' : ''}`} />
                </div>

                <div className="flex-shrink-0 flex flex-col items-center px-10">
                    <div className="w-full max-w-2xl mb-5">
                        <div className="flex justify-between items-start w-full">
                            <div>
                                 <h1
                                    className="text-4xl font-semibold text-left"
                                    style={{
                                    backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Primeira Aula Prática
                                </h1>
                                <p className="text-lg font-medium text-left" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Saudações
                                </p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <img src={coracaoImage} alt="Corações" className="w-8 h-8" />
                                <span className="text-lg font-bold text-red-500">{lives}</span>
                            </div>
                        </div>
                    </div>
                    <ProgressBar progress={progress} />
                </div>
                
                <div className="flex-grow flex flex-col items-center overflow-y-auto px-10">
                    <div className="w-full max-w-2xl aspect-[16/10] p-1 cursor-pointer my-auto" style={{ backgroundImage: 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)', borderRadius: '1.5rem', boxShadow: '0 0 50px rgba(181, 130, 255, 0.6)' }}>
                        <div 
                          className="relative w-full h-full rounded-2xl flex justify-center items-center" 
                          style={{ backgroundColor: theme === 'escuro' ? '#37304a' : '#f0e0ff' }}
                        >
                            <PlayIconPlaceholder />
                        </div>
                    </div>
                </div>

                 <div className="flex-shrink-0 px-10 pb-10">
                    <div className="w-full max-w-2xl mx-auto">
                        <hr 
                          className={`w-full my-6 ${
                            theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'
                          }`} 
                        />
                        <div className="flex justify-center items-center gap-4">
                            <button onClick={onNext} className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)', padding: '2px' }}>
                              <span 
                                className={`block px-7 py-2 rounded-xl ${
                                  theme === 'escuro' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                                }`}
                              >
                                Pular
                              </span>
                            </button>
                            <button onClick={onNext} className="text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style>{scrollbarStyles}</style>
        </div>
    );
}

// Tela 3: Pergunta 1
function Step3({ onNext, onCheckAnswer, progress, onSelectAnswer, selectedAnswer, lives, isChecking }) {
    // --- USA O TEMA ---
    const { theme } = useSettings();

    return (
        <div 
          className={`flex flex-col h-screen w-screen font-poppins ${
            theme === 'escuro' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
          }`}
        >
            <div 
              className={`shadow-lg rounded-2xl w-full h-full box-border text-center flex flex-col ${
                theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
                <div className="flex-shrink-0 px-10 pt-10">
                    <div className="pb-2 flex justify-start">
                      {/* --- LOGO DINÂMICA --- */}
                      <img 
                        src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                        alt="Lires Logo" 
                        className="h-24" 
                      />
                    </div>
                    <hr className={`my-0 mb-4 ${theme === 'escuro' ? 'border-gray-700' : ''}`} />
                </div>
                 <div className="flex-shrink-0 flex flex-col items-center px-10">
                    <div className="w-full max-w-3xl mb-5">
                        <div className="flex justify-between items-start w-full">
                           <div>
                                <h1
                                    className="text-4xl font-semibold text-left"
                                    style={{
                                    backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Primeira Aula Prática
                                </h1>
                                <p className="text-lg font-medium text-left" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Saudações
                                </p>
                           </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <img src={coracaoImage} alt="Corações" className="w-8 h-8" />
                                <span className="text-lg font-bold text-red-500">{lives}</span>
                            </div>
                        </div>
                    </div>
                    <ProgressBar progress={progress} />
                </div>
                <div className="flex-grow flex flex-col items-center overflow-y-auto px-10">
                    <div className="w-full max-w-3xl text-left my-auto">
                        <p className="text-xl font-semibold mb-6" style={{ color: theme === 'escuro' ? '#d8b4fe' : '#4b3670' }}>
                            Qual desses sinais significa Oi?
                        </p>
                        <div className="flex justify-center flex-wrap gap-4 sm:gap-8 w-full">
                            {[...Array(5)].map((_, index) => (
                                <div 
                                  key={index} 
                                  onClick={() => !isChecking && onSelectAnswer(index)} 
                                  className={`w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center rounded-2xl p-1 flex-shrink-0 transition transform duration-200 hover:scale-105 ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                                  style={{ 
                                    backgroundImage: selectedAnswer === index 
                                      ? 'linear-gradient(to bottom right, #59b1ff, #b081ff)' 
                                      : (theme === 'escuro' ? 'linear-gradient(to bottom right, #4b3670, #3a2b57)' : 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)'), 
                                    boxShadow: selectedAnswer === index ? '0 0 30px rgba(90, 177, 255, 0.8)' : '0 0 20px rgba(181, 130, 255, 0.3)' 
                                  }}
                                >
                                    <div 
                                      className="w-full h-full rounded-xl" 
                                      style={{ 
                                        backgroundColor: selectedAnswer === index 
                                          ? (theme === 'escuro' ? '#5a4b7a' : '#c0d8ff') 
                                          : (theme === 'escuro' ? '#4b3670' : '#f0e0ff') 
                                      }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                 <div className="flex-shrink-0 px-10 pb-10">
                    <div className="w-full max-w-3xl mx-auto">
                        <hr 
                          className={`w-full my-6 ${
                            theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'
                          }`} 
                        />
                        <div className="flex justify-center items-center gap-4">
                            <button onClick={onNext} disabled={isChecking} className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer transition transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)', padding: '2px' }}>
                                <span 
                                  className={`block px-7 py-2 rounded-xl ${
                                    theme === 'escuro' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                                  }`}
                                >
                                    Pular
                                </span>
                            </button>
                            <button onClick={onCheckAnswer} disabled={isChecking} className="text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <style>{scrollbarStyles}</style>
        </div>
    );
}

// Tela 4: Vídeo 2
function Step4({ onNext, progress, lives }) {
    return <Step2 onNext={onNext} progress={progress} lives={lives} />;
}


// Tela 5: Pergunta 2
function Step5({ onNext, onCheckAnswer, progress, onSelectAnswer, selectedAnswer, lives, isChecking }) {
    // --- USA O TEMA ---
    const { theme } = useSettings();

    return (
        <div 
          className={`flex flex-col h-screen w-screen font-poppins ${
            theme === 'escuro' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
          }`}
        >
            <div 
              className={`shadow-lg rounded-2xl w-full h-full box-border text-center flex flex-col ${
                theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
                 <div className="flex-shrink-0 px-10 pt-10">
                    <div className="pb-2 flex justify-start">
                      {/* --- LOGO DINÂMICA --- */}
                      <img 
                        src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                        alt="Lires Logo" 
                        className="h-24" 
                      />
                    </div>
                    <hr className={`my-0 mb-4 ${theme === 'escuro' ? 'border-gray-700' : ''}`} />
                </div>
                <div className="flex-grow flex flex-col items-center overflow-y-auto px-10">
                    <div className="w-full max-w-3xl mb-5">
                        <div className="flex justify-between items-start w-full">
                           <div>
                                <h1
                                    className="text-4xl font-semibold text-left"
                                    style={{
                                    backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Primeira Aula Prática
                                </h1>
                                <p className="text-lg font-medium text-left" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Saudações
                                </p>
                           </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <img src={coracaoImage} alt="Corações" className="w-8 h-8" />
                                <span className="text-lg font-bold text-red-500">{lives}</span>
                            </div>
                        </div>
                    </div>
                    <ProgressBar progress={progress} />
                    <div className="w-full max-w-3xl text-center my-auto">
                        <p className="text-xl font-semibold mb-6" style={{ color: theme === 'escuro' ? '#d8b4fe' : '#4b3670' }}>
                            Qual desses sinais significa Tchau?
                        </p>
                        <div className="flex justify-center flex-wrap gap-4 sm:gap-8 w-full">
                            {[...Array(5)].map((_, index) => (
                                <div 
                                  key={index} 
                                  onClick={() => !isChecking && onSelectAnswer(index)} 
                                  className={`w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center rounded-2xl p-1 flex-shrink-0 transition transform duration-200 hover:scale-105 ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                                  style={{ 
                                    backgroundImage: selectedAnswer === index 
                                      ? 'linear-gradient(to bottom right, #59b1ff, #b081ff)' 
                                      : (theme === 'escuro' ? 'linear-gradient(to bottom right, #4b3670, #3a2b57)' : 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)'), 
                                    boxShadow: selectedAnswer === index ? '0 0 30px rgba(90, 177, 255, 0.8)' : '0 0 20px rgba(181, 130, 255, 0.3)' 
                                  }}
                                >
                                    <div 
                                      className="w-full h-full rounded-xl" 
                                      style={{ 
                                        backgroundColor: selectedAnswer === index 
                                          ? (theme === 'escuro' ? '#5a4b7a' : '#c0d8ff') 
                                          : (theme === 'escuro' ? '#4b3670' : '#f0e0ff') 
                                      }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                 <div className="flex-shrink-0 px-10 pb-10">
                    <div className="w-full max-w-3xl mx-auto">
                        <hr 
                          className={`w-full my-6 ${
                            theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'
                          }`} 
                        />
                        <div className="flex justify-center items-center gap-4">
                            <button onClick={onNext} disabled={isChecking} className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer transition transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)', padding: '2px' }}>
                                <span 
                                  className={`block px-7 py-2 rounded-xl ${
                                    theme === 'escuro' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                                  }`}
                                >
                                    Pular
                                </span>
                            </button>
                            <button onClick={onCheckAnswer} disabled={isChecking} className="text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <style>{scrollbarStyles}</style>
        </div>
    );
}

// Tela 6: Vídeo 3
function Step6({ onNext, progress, lives }) {
    return <Step2 onNext={onNext} progress={progress} lives={lives} />;
}

// Tela 7: Pergunta 3
function Step7({ onNext, onCheckAnswer, progress, onSelectAnswer, selectedAnswer, lives, isChecking }) {
    // --- USA O TEMA ---
    const { theme } = useSettings();

    return (
        <div 
          className={`flex flex-col h-screen w-screen font-poppins ${
            theme === 'escuro' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
          }`}
        >
            <div 
              className={`shadow-lg rounded-2xl w-full h-full box-border text-center flex flex-col ${
                theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
                <div className="flex-shrink-0 px-10 pt-10">
                    <div className="pb-2 flex justify-start">
                      {/* --- LOGO DINÂMICA --- */}
                      <img 
                        src={theme === 'escuro' ? logoLiresEscuraImg : liresLogoImage} 
                        alt="Lires Logo" 
                        className="h-24" 
                      />
                    </div>
                    <hr className={`my-0 mb-4 ${theme === 'escuro' ? 'border-gray-700' : ''}`} />
                </div>
                <div className="flex-grow flex flex-col items-center overflow-y-auto px-10">
                    <div className="w-full max-w-3xl mb-5">
                        <div className="flex justify-between items-start w-full">
                            <div>
                                <h1
                                    className="text-4xl font-semibold text-left"
                                    style={{
                                    backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Primeira Aula Prática
                                </h1>
                                <p className="text-lg font-medium text-left" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Saudações
                                </p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <img src={coracaoImage} alt="Corações" className="w-8 h-8" />
                                <span className="text-lg font-bold text-red-500">{lives}</span>
                            </div>
                        </div>
                    </div>
                    <ProgressBar progress={progress} />
                    <div className="w-full max-w-3xl text-center my-auto">
                        <p className="text-xl font-semibold mb-6" style={{ color: theme === 'escuro' ? '#d8b4fe' : '#4b3670' }}>
                            Qual desses sinais significa Obrigado?
                        </p>
                        <div className="flex justify-center flex-wrap gap-4 sm:gap-8 w-full">
                            {[...Array(5)].map((_, index) => (
                                <div 
                                  key={index} 
                                  onClick={() => !isChecking && onSelectAnswer(index)} 
                                  className={`w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center rounded-2xl p-1 flex-shrink-0 transition transform duration-200 hover:scale-105 ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                                  style={{ 
                                    backgroundImage: selectedAnswer === index 
                                      ? 'linear-gradient(to bottom right, #59b1ff, #b081ff)' 
                                      : (theme === 'escuro' ? 'linear-gradient(to bottom right, #4b3670, #3a2b57)' : 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)'), 
                                    boxShadow: selectedAnswer === index ? '0 0 30px rgba(90, 177, 255, 0.8)' : '0 0 20px rgba(181, 130, 255, 0.3)' 
                                  }}
                                >
                                    <div 
                                      className="w-full h-full rounded-xl" 
                                      style={{ 
                                        backgroundColor: selectedAnswer === index 
                                          ? (theme === 'escuro' ? '#5a4b7a' : '#c0d8ff') 
                                          : (theme === 'escuro' ? '#4b3670' : '#f0e0ff') 
                                      }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                 <div className="flex-shrink-0 px-10 pb-10">
                    <div className="w-full max-w-3xl mx-auto">
                        <hr 
                          className={`w-full my-6 ${
                            theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'
                          }`} 
                        />
                        <div className="flex justify-center items-center gap-4">
                            <button onClick={onNext} disabled={isChecking} className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer transition transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)', padding: '2px' }}>
                                <span 
                                  className={`block px-7 py-2 rounded-xl ${
                                    theme === 'escuro' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                                  }`}
                                >
                                    Pular
                                </span>
                            </button>
                            <button onClick={onCheckAnswer} disabled={isChecking} className="text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <style>{scrollbarStyles}</style>
        </div>
    );
}


// --- Componente Principal que gerencia as telas ---
export default function App() {
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


  // Define as respostas corretas (o índice da opção correta, começando em 0)
  const correctAnswers = {
    2: 1, // Resposta correta para a pergunta do Step3 é a Opção 2
    4: 3, // Resposta correta para a pergunta do Step5 é a Opção 4
    6: 0, // Resposta correta para a pergunta do Step7 é a Opção 1
  };
  
  const [answers, setAnswers] = useState({
    2: null,
    4: null,
    6: null,
  });
  const totalSteps = 6;

  const handleSelectAnswer = (step, answer) => {
    setAnswers(prev => ({ ...prev, [step]: answer }));
  };
  
   const startRedoMode = () => {
    setShowReviewScreen(false);
    setIsRedoMode(true);
    setRedoIndex(0);
    // Also reset any lingering selections for the upcoming questions
    setAnswers(prev => {
        const resetAnswers = { ...prev };
        incorrectSteps.forEach(step => {
            resetAnswers[step] = null;
        });
        return resetAnswers;
    });
    setCurrentStep(incorrectSteps[0]);
};


  const proceed = () => {
    setIsChecking(false);
    setNotification({ visible: false, type: '', message: '' });
    
    // This check uses the `lives` state *before* the potential decrement in the next turn
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
            // End of redo loop, show summary
            setIsRedoMode(false);
            console.log("Respostas Finais:", answers);
            alert("Respostas salvas no console!");
            resetGame();
        }
        return;
    }

    if (wasFinalAnswer) {
        if (incorrectSteps.length > 0) {
            setShowReviewScreen(true);
        } else {
            console.log("Respostas Finais:", answers);
            alert("Respostas salvas no console!");
            resetGame();
        }
        return;
    }

    if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
    } else {
        console.log("Respostas Finais:", answers);
        alert("Respostas salvas no console!");
        resetGame();
    }
  };

  const checkAnswer = (isFinal) => {
    const selectedAnswer = answers[currentStep];
    if (selectedAnswer === null) {
      console.log("Por favor, selecione uma resposta.");
      return;
    }
    setIsChecking(true);
    setWasFinalAnswer(isFinal); 

    const correctAnswer = correctAnswers[currentStep];
    const message = `A resposta correta era a Opção ${correctAnswer + 1}.`;

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
        setNotification({
          visible: true,
          type: 'incorrect',
          message: message,
        });
      } else {
        setNotification({
          visible: true,
          type: 'incorrect',
          message: message,
        });
      }
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

  const resetGame = () => {
      setCurrentStep(0);
      setAnswers({ 2: null, 4: null, 6: null });
      setLives(5);
      setShowGameOverModal(false);
      setIsChecking(false);
      setHasSeenFirstMistakeModal(false);
      setWasFinalAnswer(false);
      setIncorrectSteps([]);
      setIsRedoMode(false);
      setRedoIndex(0);
      setShowReviewScreen(false);
  };
  
  let progress;
  if (isRedoMode) {
      const redoProgress = (redoIndex + 1) / incorrectSteps.length;
      // Start the redo progress bar at 85% and fill up the last 15%
      progress = 85 + (redoProgress * 15);
  } else {
      progress = currentStep > 0 ? (currentStep / totalSteps) * 100 : 0;
  }

  const renderStep = () => {
    
    switch (currentStep) {
      case 0:
        return <Step1 onNext={() => setCurrentStep(1)} />;
      case 1:
        return <Step2 onNext={() => setCurrentStep(2)} progress={progress} lives={lives}/>;
      case 2:
        return <Step3
                    onNext={() => setCurrentStep(3)}
                    onCheckAnswer={handleCheckAnswer}
                    progress={progress}
                    onSelectAnswer={(answer) => handleSelectAnswer(2, answer)}
                    selectedAnswer={answers[2]}
                    lives={lives}
                    isChecking={isChecking}
                />;
      case 3:
        return <Step4 onNext={() => setCurrentStep(4)} progress={progress} lives={lives}/>;
      case 4:
        return <Step5
                    onNext={() => setCurrentStep(5)}
                    onCheckAnswer={handleCheckAnswer}
                    progress={progress}
                    onSelectAnswer={(answer) => handleSelectAnswer(4, answer)}
                    selectedAnswer={answers[4]}
                    lives={lives}
                    isChecking={isChecking}
                />;
      case 5:
        return <Step6 onNext={() => setCurrentStep(6)} progress={progress} lives={lives} />;
      case 6:
        return <Step7
                    onNext={() => { 
                      if (incorrectSteps.length > 0) {
                        setShowReviewScreen(true);
                      } else {
                        console.log("Respostas Finais:", answers);
                        alert("Respostas salvas no console!");
                        resetGame();
                      }
                    }}
                    onCheckAnswer={handleFinish} 
                    progress={progress}
                    onSelectAnswer={(answer) => handleSelectAnswer(6, answer)}
                    selectedAnswer={answers[6]}
                    lives={lives}
                    isChecking={isChecking}
                />;
      default:
        return <Step1 onNext={() => setCurrentStep(1)} />;
    }
  };

  return (
    <>
      <style>{floatAnimation}</style>
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