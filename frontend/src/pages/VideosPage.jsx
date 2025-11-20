// CAMINHO: src/pages/VideosPage.jsx

import React, { useState, useEffect } from 'react';
// Layout e Contexto
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// Puxo o estado global e o mapa de lições (estrutura do curso)
import { useSettings } from '../components/SettingsContext';
import { lessonMap } from '../lessons/lessonMap'; 

// --- Ícones (SVG) ---
const PlayIcon = ({ theme }) => ( /* ... código SVG ... */ 
  <svg 
    className={`w-10 h-10 transition-colors ${
      theme === 'escuro' 
      ? 'text-slate-400 group-hover:text-violet-400' 
      : 'text-slate-500 group-hover:text-violet-500'
    }`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
  </svg>
);
const LockIcon = ({ theme }) => ( /* ... código SVG ... */ 
  <svg 
    className={`w-8 h-8 ${
      theme === 'escuro' ? 'text-slate-500' : 'text-slate-400'
    }`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
  </svg>
);
const BackArrowIcon = ({ theme }) => ( /* ... código SVG ... */ 
  <svg 
    className={`w-8 h-8 ${
      theme === 'escuro' ? 'text-slate-300' : 'text-slate-600'
    }`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
  </svg>
);
const CloseIcon = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;


// --- 1. Importação Estática de Todos os Vídeos ---
// (Necessário para que o Vite/Webpack inclua os assets no build final)
import videoOi from '../assets/PrimeirosPassosVideo/Oi.mp4';
import videoTchau from '../assets/PrimeirosPassosVideo/Tchau.mp4';
// ... (outros vídeos de Primeiros Passos)
import videoObrigado from '../assets/PrimeirosPassosVideo/Obrigado.mp4';
import videoBomDia from '../assets/PrimeirosPassosVideo/BomDia.mp4';
import videoBoaTarde from '../assets/PrimeirosPassosVideo/BoaTarde.mp4';
import videoBoaNoite from '../assets/PrimeirosPassosVideo/BoaNoite.mp4';
import videoAteLogo from '../assets/PrimeirosPassosVideo/AteLogo.mp4';
// ... (todos os vídeos do Alfabeto)
import videoA from '../assets/AlfabetoVideo/A.mp4';
import videoB from '../assets/AlfabetoVideo/B.mp4';
import videoC from '../assets/AlfabetoVideo/C.mp4';
import videoD from '../assets/AlfabetoVideo/D.mp4';
import videoE from '../assets/AlfabetoVideo/E.mp4';
import videoF from '../assets/AlfabetoVideo/F.mp4';
import videoG from '../assets/AlfabetoVideo/G.mp4';
import videoH from '../assets/AlfabetoVideo/H.mp4';
import videoI from '../assets/AlfabetoVideo/I.mp4';
import videoJ from '../assets/AlfabetoVideo/J.mp4';
import videoK from '../assets/AlfabetoVideo/K.mp4';
import videoL from '../assets/AlfabetoVideo/L.mp4';
import videoM from '../assets/AlfabetoVideo/M.mp4';
import videoN from '../assets/AlfabetoVideo/N.mp4';
import videoO from '../assets/AlfabetoVideo/O.mp4';
import videoP from '../assets/AlfabetoVideo/P.mp4';
// Q está em falta
import videoR from '../assets/AlfabetoVideo/R.mp4';
import videoS from '../assets/AlfabetoVideo/S.mp4';
import videoT from '../assets/AlfabetoVideo/T.mp4';
import videoU from '../assets/AlfabetoVideo/U.mp4';
import videoV from '../assets/AlfabetoVideo/V.mp4';

// --- 2. MAPA DE LIÇÕES PARA VÍDEOS ---
// Associa o ID da lição (lessonId) aos vídeos que ela ensinou.
const lessonVideoMap = {
  'comecar-do-zero': [
    { id: 'v1', title: 'Oi', url: videoOi },
    { id: 'v2', title: 'Tchau', url: videoTchau },
    { id: 'v3', title: 'Obrigado', url: videoObrigado },
  ],
  'saudacoes-avancadas': [
    { id: 'v4', title: 'Bom Dia', url: videoBomDia },
    { id: 'v5', title: 'Boa Tarde', url: videoBoaTarde },
    { id: 'v6', title: 'Boa Noite', url: videoBoaNoite },
    { id: 'v7', title: 'Até Logo', url: videoAteLogo },
  ],
  'alfabeto-letra-a': [
    { id: 'a1', title: 'Letra A', url: videoA },
    { id: 'a2', title: 'Letra E', url: videoE },
    { id: 'a3', title: 'Letra I', url: videoI },
    { id: 'a4', title: 'Letra O', url: videoO },
    { id: 'a5', title: 'Letra U', url: videoU },
  ],
  'alfabeto-consoantes': [
    { id: 'b1', title: 'Letra B', url: videoB },
    { id: 'b2', title: 'Letra C', url: videoC },
    { id: 'b3', title: 'Letra D', url: videoD },
    { id: 'b4', title: 'Letra F', url: videoF },
    { id: 'b5', title: 'Letra G', url: videoG },
    { id: 'b6', title: 'Letra H', url: videoH },
  ],
  'alfabeto-consoantes-2': [
    { id: 'c1', title: 'Letra J', url: videoJ },
    { id: 'c2', title: 'Letra K', url: videoK },
    { id: 'c3', title: 'Letra L', url: videoL },
    { id: 'c4', title: 'Letra M', url: videoM },
    { id: 'c5', title: 'Letra N', url: videoN },
  ],
  'alfabeto-consoantes-3': [
    { id: 'd1', title: 'Letra P', url: videoP },
    // Q está em falta
    { id: 'd2', title: 'Letra R', url: videoR },
    { id: 'd3', title: 'Letra S', url: videoS },
    { id: 'd4', title: 'Letra T', url: videoT },
  ],
  'alfabeto-consoantes-4': [
    { id: 'e1', title: 'Letra V', url: videoV },
    // W, X, Y, Z estão em falta
  ],
  'checkpoint-1': [], 
  'alfabeto-revisao': [], 
};


// --- COMPONENTES DE UI ---

/**
 * Título de Página Reutilizável
 */
const PageTitle = ({ title, subtitle, theme }) => (
  <div className="text-left">
    <div className="relative inline-block mb-1">
      <h1 className={`text-4xl font-bold ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-400'}`}>{title}</h1>
      <div className={`absolute -bottom-1 left-0 w-full h-1 rounded-full ${theme === 'escuro' ? 'bg-purple-500' : 'bg-violet-300'}`} />
    </div>
    {subtitle && <p className={`text-lg opacity-80 mt-2 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-400'}`}>{subtitle}</p>}
  </div>
);

/**
 * Modal do Player de Vídeo (O que aparece em tela cheia)
 */
const VideoPlayerModal = ({ videoUrl, onClose }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
    <button className="absolute top-4 right-4 text-white z-50"><CloseIcon /></button>
    <div className="w-full max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
      <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-2xl">
        <video src={videoUrl} controls autoPlay className="w-full h-full" />
      </div>
    </div>
  </div>
);

/**
 * View da Lista de Módulos (Primeira Tela)
 */
const ModuleListView = ({ videoModules, onSelectModule, theme }) => (
  <div className="flex flex-col h-full w-full">
    <div className="mb-12 w-full">
      <PageTitle title="Vídeos aprendidos" subtitle="Revise agora os vídeos que você já aprendeu" theme={theme} />
    </div>
    <div className="flex-grow flex flex-col justify-center space-y-6">
      {videoModules.map(module => (
        <button
          key={module.id}
          // Só permite o clique se o módulo estiver destrancado
          onClick={() => module.unlocked && onSelectModule(module)} 
          disabled={!module.unlocked}
          className={`w-full flex items-center p-6 rounded-2xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group ${
            theme === 'escuro'
            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
            : 'bg-white/50 hover:bg-white/90 shadow-sm border border-white'
          }`}
        >
          <div className="mr-5">{module.unlocked ? <PlayIcon theme={theme} /> : <LockIcon theme={theme} />}</div>
          <span className={`text-2xl font-bold ${theme === 'escuro' ? 'text-slate-200' : 'text-slate-700'}`}>{module.title}</span>
          {/* Contador: Vídeos Assistidos / Total de Vídeos */}
          <span className={`ml-auto text-xl font-semibold ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}`}>{`${module.videosWatched} / ${module.totalVideos}`}</span>
        </button>
      ))}
    </div>
  </div>
);

/**
 * View em Grid de Vídeos (Segunda Tela)
 */
const VideoGridView = ({ module, onBack, onPlayVideo, theme }) => (
  <div className="flex flex-col h-full w-full">
    <div className="flex items-center mb-12 w-full">
      <button onClick={onBack} className={`p-2 rounded-full transition-colors mr-4 ${theme === 'escuro' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`}>
        <BackArrowIcon theme={theme} />
      </button>
      <PageTitle title={module.title} subtitle="Revise agora os vídeos que você já aprendeu" theme={theme} />
    </div>
    {/* Grid de 2 colunas (mobile) e 3 colunas (desktop/tablet) */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 flex-grow">
      {module.videos.map((video, index) => (
        <div key={index}>
          <button
            onClick={() => video.unlocked && onPlayVideo(video.url)}
            disabled={!video.unlocked}
            className={`relative w-full aspect-video rounded-2xl flex items-center justify-center transition-transform hover:scale-105 disabled:cursor-not-allowed ${
              theme === 'escuro'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white/70 shadow-sm border border-white'
            }`}
          >
            {/* Ícone de Play ou Cadeado */}
            {video.unlocked ? <PlayIcon theme={theme} /> : <LockIcon theme={theme} />}
          </button>
          <h3 className={`text-center font-semibold mt-2 ${
            video.unlocked 
              ? (theme === 'escuro' ? 'text-slate-200' : 'text-slate-700')
              : (theme === 'escuro' ? 'text-slate-500' : 'text-slate-400')
          }`}>
            {video.title}
          </h3>
        </div>
      ))}
    </div>
  </div>
);


// --- COMPONENTE PRINCIPAL DA PÁGINA (VideosPage) ---
export default function VideosPage() {
  // Puxo o tema e o progresso do Contexto
  const { theme, lessonProgress } = useSettings(); 
  
  // --- Estados da Máquina de Visão ---
  const [currentView, setCurrentView] = useState('list'); // 'list' (módulos) ou 'grid' (vídeos)
  const [selectedModule, setSelectedModule] = useState(null); // Módulo selecionado
  const [playingVideo, setPlayingVideo] = useState(null); // URL do vídeo tocando no modal
  const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter');
  const [exitAnimationClass, setExitAnimationClass] = useState('');

  // --- LÓGICA DINÂMICA PARA CONSTRUIR OS MÓDULOS ---
  
  // 1. Definição da Estrutura do Curso (agrupada por Unidade)
  const moduleStructure = [
    { 
      id: 1, 
      title: 'Unidade 1: Primeiros passos', 
      lessons: lessonMap.filter(l => l.unit === 1).map(l => l.id) // Pega as lições da Unidade 1
    },
    { 
      id: 2, 
      title: 'Unidade 2: Alfabeto', 
      lessons: lessonMap.filter(l => l.unit === 2).map(l => l.id) // Pega as lições da Unidade 2
    },
    { id: 3, title: 'Unidade 3: Símbolos e marcas', lessons: [] },
    // ... (Placeholder para unidades futuras)
  ];

  // 2. Mapeia a estrutura para os dados de visualização (videoModules)
  const videoModules = moduleStructure.map(module => {
    let moduleUnlocked = false; // O módulo está destrancado se pelo menos uma lição estiver completa
    let videosWatched = 0; // Quantos vídeos estão desbloqueados
    let allModuleVideos = []; // Lista de vídeos desbloqueados (para o grid)

    module.lessons.forEach(lessonId => {
      const progress = lessonProgress[lessonId];
      // Considero uma lição completa se o objeto de progresso existe
      const isLessonComplete = !!progress; 
      
      const videosForThisLesson = lessonVideoMap[lessonId] || [];

      if (isLessonComplete) {
        moduleUnlocked = true; // Se qualquer lição estiver completa, o módulo é desbloqueado
        
        videosForThisLesson.forEach(video => {
          allModuleVideos.push({ ...video, unlocked: true }); // Adiciona vídeos desbloqueados
          videosWatched++;
        });
      }
      // TODO: Para vídeos não assistidos, marcar como unlocked: false e adicioná-los também
    });

    // Calcula o total de vídeos que este módulo possui (para o contador)
    const totalVideosInModule = module.lessons.reduce((acc, lessonId) => {
      return acc + (lessonVideoMap[lessonId]?.length || 0);
    }, 0);

    return {
      id: module.id,
      title: module.title,
      unlocked: moduleUnlocked, // Se o módulo está visualmente clicável
      videosWatched: videosWatched,
      totalVideos: totalVideosInModule,
      videos: allModuleVideos, // Lista de vídeos desbloqueados
    };
  });
  // --- FIM DA LÓGICA DINÂMICA ---


  // Handler para ir do "list" (módulos) para o "grid" (vídeos)
  const handleSelectModule = (module) => {
    // Lógica de animação de saída/entrada
    setEnterAnimationClass('');
    setExitAnimationClass('anim-exit');
    setTimeout(() => {
      setSelectedModule(module);
      setCurrentView('grid');
      setExitAnimationClass('');
      setEnterAnimationClass('anim-enter');
    }, 800);
  };

  // Handler para voltar do "grid" para o "list"
  const handleBackToList = () => {
    // Lógica de animação de saída/entrada
    setEnterAnimationClass('');
    setExitAnimationClass('anim-exit');
    setTimeout(() => {
      setSelectedModule(null);
      setCurrentView('list');
      setExitAnimationClass('');
      setEnterAnimationClass('anim-enter');
    }, 800);
  };

  return (
    <div className={`font-poppins relative min-h-screen flex flex-col ${
        theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
    }`}>
      {/* --- Layout Fixo --- */}
      <SidebarLeft />
      <SidebarRight />
      <MobileTopBar />
      <MobileBottomBar />
      {/* Modal do Player de Vídeo */}
      {playingVideo && <VideoPlayerModal videoUrl={playingVideo} onClose={() => setPlayingVideo(null)} />}

      <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
        {/* Main Content Area */}
        <main className="px-6 lg:px-12 pt-20 pb-24 lg:pt-8 lg:pb-8 w-full flex-grow flex flex-col">
          {/* Wrapper que controla a animação do conteúdo central */}
          <div className={`content-box w-full flex-grow flex flex-col ${enterAnimationClass} ${exitAnimationClass}`}>
            
            {/* 1. View de Lista de Módulos */}
            {currentView === 'list' && (
              <ModuleListView 
                videoModules={videoModules} 
                onSelectModule={handleSelectModule} 
                theme={theme} 
              />
            )}
            
            {/* 2. View em Grid de Vídeos */}
            {currentView === 'grid' && selectedModule && (
              <VideoGridView 
                module={selectedModule} 
                onBack={handleBackToList} 
                onPlayVideo={(url) => setPlayingVideo(url)} // Abre o modal do player
                theme={theme} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}