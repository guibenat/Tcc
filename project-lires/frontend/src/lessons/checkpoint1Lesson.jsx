import React from 'react';
import { useSettings } from '../components/SettingsContext';

// --- Assets ---
import robotImage from '../assets/robot-happy.png';
import liresLogoImage from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png';
import coracaoImage from '../assets/coracaoo.png';

// --- Componentes de UI Reutilizáveis ---
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

function ProgressBar({ progress }) {
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

// --- Tela de Início do Checkpoint ---
function Step1({ onNext }) {
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
            theme === 'escuro' ? 'bg-gray-800 border-purple-700' : 'bg-white border-purple-400'
          }`}
          style={{
            boxShadow: '0 0 50px rgba(176, 129, 255, 0.6)',
          }}
        >
          <div className="flex-grow text-left">
            <h2 className="text-2xl font-bold mb-3" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              🏆 Desafio da Unidade 1
            </h2>
            <p className="text-xl font-semibold mb-2" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Parabéns por chegar até aqui! Agora vamos revisar tudo que você aprendeu nas lições anteriores.
            </p>
            <button
              onClick={onNext}
              className="mt-4 text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
              }}
            >
              Começar Desafio
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

// --- Tela de Vídeo ---
function StepVideo({ onNext, progress, lives, lessonTitle, lessonSubtitle }) {
    const { theme } = useSettings();
    return (
        <div
          className={`flex flex-col h-screen w-screen font-poppins overflow-hidden ${
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
                                  {lessonTitle}
                                </h1>
                                <p className="text-lg font-medium text-left" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                  {lessonSubtitle}
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

                <div className="flex-grow flex flex-col items-center min-h-0 px-10">
                    <div className="w-full max-w-2xl aspect-[16/10] p-1 cursor-pointer my-auto max-h-full" style={{ backgroundImage: 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)', borderRadius: '1.5rem', boxShadow: '0 0 50px rgba(181, 130, 255, 0.6)' }}>
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
        </div>
    );
}

// --- Tela de Pergunta ---
function StepPergunta({
    onNext,
    onCheckAnswer,
    progress,
    onSelectAnswer,
    selectedAnswer,
    lives,
    isChecking,
    lessonTitle,
    lessonSubtitle,
    questionText,
    isFinal // Note: Esta prop é passada pelo ActivityPlayer, não precisamos mais forçá-la
}) {
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
                                  {lessonTitle}
                                </h1>
                                <p className="text-lg font-medium text-left" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                  {lessonSubtitle}
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
                            {questionText}
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
                                {isFinal ? 'Finalizar' : 'Próximo'}
                            </button>
                        </div>
                    </div>
                   </div>
            </div>
        </div>
    );
}

// --- Pacote de Lição (Checkpoint) ---
export const checkpoint1Lesson = {
  id: 'checkpoint-1',
  title: 'Desafio Final',
  subtitle: 'Revisão da Unidade 1',
  steps: [
    {
      type: 'modal-inicio',
      component: Step1
    },
    {
      type: 'video',
      component: StepVideo
    },
    {
      type: 'pergunta',
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal significa 'Oi'?" />,
      correctAnswer: 1
    },
    {
      type: 'video',
      component: StepVideo
    },
    {
      type: 'pergunta',
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal significa 'Bom dia'?" />,
      correctAnswer: 2
    },
    {
      type: 'video',
      component: StepVideo
    },
    {
      type: 'pergunta',
      // --- CORREÇÃO: Removido 'isFinal={true}' ---
      // O ActivityPlayer vai injetar esta prop automaticamente
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal significa 'Obrigado'?" />,
      correctAnswer: 0
    }
  ]
};