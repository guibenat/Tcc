// LessonUI.jsx
// Aqui ficam os "blocos de construção" da UI para as lições.
// Separei cada tipo de tela (início, vídeo, pergunta) em seu próprio componente.
// Isso deixa o componente de lógica principal (que vai usar isso) bem mais limpo.

// CORREÇÃO: Erro de digitação. Tinha colocado 'in' em vez de 'from'.
import React, { useState, useEffect, useRef } from 'react'; 
// Puxo meu contexto de configurações (tema, etc)
import { useSettings } from './SettingsContext'; 

// Assets (imagens)
import robotImage from '../assets/robot-happy.png';
import liresLogoImage from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png';
import coracaoImage from '../assets/coracaoo.png';

// --- Componente 1: Barra de Progresso ---
// Componente "burro" (dumb component) reutilizável.
// Só recebe o progresso (ex: 33.3) e renderiza a barra.
export function ProgressBar({ progress }) {
  const { theme } = useSettings();
  return (
    // div 'pai' (o fundo da barra)
    <div 
      className={`w-full max-w-3xl h-[14px] rounded-full overflow-hidden mb-10 ${
        theme === 'escuro' ? 'bg-gray-700' : 'bg-gray-200'
      }`} 
    >
      {/* div 'filha' (o preenchimento) */}
      <div 
        className="h-full"
        style={{ 
          width: `${progress}%`, // A mágica tá aqui: a largura é controlada pela prop 'progress'.
          backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
          transition: 'width 0.5s ease', // A transição no CSS faz ela animar suavemente.
        }}
      ></div>
    </div>
  );
}

// --- Componente 2: Modal de Início (Step 1) ---
// É o modal que aparece antes da lição começar (ex: "Vamos aprender sobre...")
export function Step1({ onNext, text }) {
  const { theme } = useSettings();
  return (
    // Layout em 2 camadas:
    // 1. A div principal que é a página de fundo (com logo, etc)
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
        {/* Espaço vazio só pra empurrar o footer da página (que não tem) */}
        <div className="flex-grow flex items-center justify-center"></div>
      </div>

      {/* 2. O modal 'fixed' que fica por cima com o overlay escuro */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
        <div
          className={`p-8 rounded-2xl border-2 flex flex-col sm:flex-row items-center gap-8 max-w-2xl ${
            theme === 'escuro' ? 'bg-gray-800 border-blue-700' : 'bg-white border-blue-400'
          }`}
          style={{
            boxShadow: '0 0 50px rgba(90, 177, 255, 0.6)', // Efeito de glow
          }}
        >
          <div className="flex-grow text-left">
            {/* O texto vem por prop, pra ser genérico */}
            <p className="text-xl font-semibold mb-2" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {text}
            </p>
            {/* O botão 'onNext' vem do componente pai, que controla a lógica dos steps */}
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
          <div className="flex-shrink-0 w-32 sm:w-48">
            {/* Robô com a animação 'float' (definida no CSS global) */}
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

// --- Componente 3: Tela de Vídeo (StepVideo) ---
// Layout principal da lição (serve pro vídeo e pra pergunta)
export function StepVideo({ onNext, progress, lives, lessonTitle, lessonSubtitle, videoSrc }) {
    const { theme } = useSettings();
    const videoRef = useRef(null); // Ref para controlar o <video>
    const [videoEnded, setVideoEnded] = useState(false); // Estado pra mostrar o botão 'Recomeçar'

    // Esse effect roda toda vez que o 'videoSrc' muda (ou seja, nova etapa)
    useEffect(() => {
        setVideoEnded(false); // Reseta o estado do botão
        // Diminuí a velocidade do vídeo um pouco (0.8x)
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; 
        }
    }, [videoSrc]); // Dependência: videoSrc

    // Funções de callback do vídeo
    const handleVideoEnd = () => {
        setVideoEnded(true); 
    };

    const handleRestartVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setVideoEnded(false); 
        }
    };

    return (
        <>
            {/* Container full-screen */}
            <div 
              className={`flex flex-col h-screen w-screen font-poppins overflow-hidden ${
                theme === 'escuro' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {/* Card principal (branco ou cinza-escuro) */}
              <div 
                className={`shadow-lg rounded-2xl w-full h-full box-border text-center flex flex-col ${
                  theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* --- Header da Lição --- */}
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

                {/* Container do Header (Título, Vidas, Barra) */}
                <div className="flex-shrink-0 flex flex-col items-center px-10">
                  <div className="w-full max-w-2xl mb-5">
                    <div className="flex justify-between items-start w-full">
                      {/* Título e Subtítulo */}
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
                      {/* Vidas */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                          <img src={coracaoImage} alt="Corações" className="w-8 h-8" />
                          <span className="text-lg font-bold text-red-500">{lives}</span>
                      </div>
                    </div>
                  </div>
                  <ProgressBar progress={progress} />
                </div>
                
                {/* --- Conteúdo (O Vídeo) --- */}
                {/* 'flex-grow' faz esse container ocupar o espaço restante */}
                <div className="flex-grow flex flex-col items-center min-h-0 px-10">
                  {/* Container do vídeo com borda gradiente e sombra */}
                  <div className="w-full max-w-2xl aspect-[16/10] p-1 cursor-pointer my-auto max-h-full" style={{ backgroundImage: 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)', borderRadius: '1.5rem', boxShadow: '0 0 50px rgba(181, 130, 255, 0.6)' }}>
                    {/* Container interno (com a cor de fundo) */}
                    <div 
                      className="relative w-full h-full rounded-2xl flex justify-center items-center overflow-hidden" 
                      style={{ backgroundColor: theme === 'escuro' ? '#37304a' : '#f0e0ff' }}
                    >
                      <video
                        ref={videoRef}
                        // IMPORTANTE: A 'key' força o React a recriar o <video> quando o src muda. Evita bugs.
                        key={videoSrc}
                        src={videoSrc}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd} 
                        // 'object-contain' garante que o vídeo caiba no box sem distorcer.
                        className="relative w-full h-full object-contain" 
                      >
                        Seu navegador não suporta vídeos MP4.
                      </video>

                      {/* Overlay que aparece quando o vídeo termina */}
                      {videoEnded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300">
                              <button
                                onClick={handleRestartVideo}
                                className="flex items-center gap-2 text-white font-semibold py-3 px-6 bg-purple-600 rounded-full shadow-lg transition transform hover:scale-105"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                Recomeçar
                              </button>
                          </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* --- Footer da Lição --- */}
                {/* 'flex-shrink-0' impede que o footer encolha */}
                <div className="flex-shrink-0 px-10 pb-10">
                  <div className="w-full max-w-2xl mx-auto">
                    <hr 
                      className={`w-full my-6 ${
                        theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'
                      }`} 
                    />
                    {/* Botões de Ação */}
                    <div className="flex justify-center items-center gap-4">
                      {/* Botão de Pular (com borda gradiente) */}
                      {/* Truque do CSS: div 'pai' com gradiente e padding 2px... */}
                      <button onClick={onNext} className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)', padding: '2px' }}>
                        {/* ...e span 'filho' com bg-white/dark */}
                        <span 
                          className={`block px-7 py-2 rounded-xl ${
                            theme === 'escuro' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                          }`}
                        >
                          Pular
                        </span>
                      </button>
                      {/* Botão Principal */}
                      <button onClick={onNext} className="text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}>
                          Próximo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    );
}

// --- Componente 4: Tela de Pergunta (StepPergunta) ---
// A estrutura é quase idêntica à do StepVideo (Header, Footer),
// mas o conteúdo do meio muda para as opções de resposta.
export function StepPergunta({ 
    onNext, 
    onCheckAnswer, 
    progress, 
    onSelectAnswer, 
    selectedAnswer, // O índice da resposta selecionada
    lives, 
    isChecking, // Estado (do pai) que trava os botões
    lessonTitle, 
    lessonSubtitle,
    questionText,
    options, // Array de URLs de GIFs
    isFinal // É a última pergunta?
}) {
    const { theme } = useSettings();

    return (
        <>
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
                {/* --- Header da Lição (Idêntico ao StepVideo) --- */}
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
                
                {/* --- Conteúdo (A Pergunta e Opções) --- */}
                {/* 'overflow-y-auto' é importante caso as opções não caibam na tela */}
                <div className="flex-grow flex flex-col items-center overflow-y-auto px-10">
                  <div className="w-full max-w-3xl text-left my-auto">
                    {/* O texto da pergunta */}
                    <p className="text-xl font-semibold mb-6" style={{ color: theme === 'escuro' ? '#d8b4fe' : '#4b3670' }}>
                      {questionText}
                    </p>
                    {/* Grid de opções (com flex-wrap para quebrar a linha) */}
                    <div className="flex justify-center flex-wrap gap-4 sm:gap-8 w-full">
                      {options.map((optionGif, index) => (
                        <div 
                          key={index} 
                          // Desabilita o clique se 'isChecking' for true (evita clique duplo)
                          onClick={() => !isChecking && onSelectAnswer(index)} 
                          className={`w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center rounded-2xl p-1 flex-shrink-0 transition transform duration-200 hover:scale-105 ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                          style={{ 
                            // Estilo dinâmico: muda o fundo e a sombra se (selectedAnswer === index)
                            backgroundImage: selectedAnswer === index 
                              ? 'linear-gradient(to bottom right, #59b1ff, #b081ff)' // Selecionado
                              : (theme === 'escuro' ? 'linear-gradient(to bottom right, #4b3670, #3a2b57)' : 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)'), // Padrão
                            boxShadow: selectedAnswer === index ? '0 0 30px rgba(90, 177, 255, 0.8)' : '0 0 20px rgba(181, 130, 255, 0.3)' 
                          }}
                        >
                          {/* Container interno da imagem */}
                          <div 
                            className="w-full h-full rounded-xl flex items-center justify-center" 
                            style={{ 
                              backgroundColor: selectedAnswer === index 
                                ? (theme === 'escuro' ? '#5a4b7a' : '#c0d8ff') 
                                : (theme === 'escuro' ? '#4b3670' : '#f0e0ff') 
                            }}
                          >
                            <img 
                              src={optionGif} 
                              alt={`Opção ${index + 1}`} 
                              className="w-full h-full object-contain rounded-xl"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* --- Footer da Lição (com lógica de 'disabled') --- */}
                <div className="flex-shrink-0 px-10 pb-10">
                  <div className="w-full max-w-3xl mx-auto">
                    <hr 
                      className={`w-full my-6 ${
                        theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'
                      }`} 
                    />
                    <div className="flex justify-center items-center gap-4">
                      {/* Botão Pular (desabilitado durante a verificação) */}
                      <button onClick={onNext} disabled={isChecking} className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer transition transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)', padding: '2px' }}>
                        <span 
                          className={`block px-7 py-2 rounded-xl ${
                            theme === 'escuro' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                          }`}
                        >
                          Pular
                        </span>
                      </button>
                      {/* Botão Principal (Verificar/Próximo/Finalizar) */}
                      <button 
                        onClick={onCheckAnswer} // Chama a verificação (lógica no pai)
                        disabled={isChecking} // Desabilitado enquanto verifica
                        className="text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
                        style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}
                      >
                        {/* O texto do botão muda se for a última pergunta */}
                        {isFinal ? 'Finalizar' : 'Próximo'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    );
}