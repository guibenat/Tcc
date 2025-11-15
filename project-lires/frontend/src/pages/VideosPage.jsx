// CAMINHO: src/pages/VideosPage.jsx
import React, { useState, useEffect } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// 1. IMPORTAR O CONTEXTO E O MAPA DE LIÇÕES
import { useSettings } from '../components/SettingsContext';
import { lessonMap } from '../lessons/lessonMap'; // Precisamos disto para saber as unidades

// --- Ícones (Sem alteração) ---
const PlayIcon = ({ theme }) => (
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
const LockIcon = ({ theme }) => (
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
const BackArrowIcon = ({ theme }) => (
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


// --- 2. IMPORTAR TODOS OS VÍDEOS ESTATICAMENTE ---
// (Este é o método que funciona no seu projeto)
import videoOi from '../assets/PrimeirosPassosVideo/Oi.mp4';
import videoTchau from '../assets/PrimeirosPassosVideo/Tchau.mp4';
import videoObrigado from '../assets/PrimeirosPassosVideo/Obrigado.mp4';
import videoBomDia from '../assets/PrimeirosPassosVideo/BomDia.mp4';
import videoBoaTarde from '../assets/PrimeirosPassosVideo/BoaTarde.mp4';
import videoBoaNoite from '../assets/PrimeirosPassosVideo/BoaNoite.mp4';
import videoAteLogo from '../assets/PrimeirosPassosVideo/AteLogo.mp4';
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

// --- 3. MAPA DE LIÇÕES PARA VÍDEOS ---
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
    { id: 'd2', title: 'Letra R', url: videoR },
    { id: 'd3', title: 'Letra S', url: videoS },
    { id: 'd4', title: 'Letra T', url: videoT },
  ],
  'alfabeto-consoantes-4': [
    { id: 'e1', title: 'Letra V', url: videoV },
  ],
  'checkpoint-1': [], // Checkpoints não têm vídeos novos
  'alfabeto-revisao': [], // Revisão não tem vídeos novos
};


// --- COMPONENTES DA PÁGINA (Sem alteração) ---
const PageTitle = ({ title, subtitle, theme }) => (
  <div className="text-left">
    <div className="relative inline-block mb-1">
      <h1 className={`text-4xl font-bold ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-400'}`}>{title}</h1>
      <div className={`absolute -bottom-1 left-0 w-full h-1 rounded-full ${theme === 'escuro' ? 'bg-purple-500' : 'bg-violet-300'}`} />
    </div>
    {subtitle && <p className={`text-lg opacity-80 mt-2 ${theme === 'escuro' ? 'text-purple-400' : 'text-violet-400'}`}>{subtitle}</p>}
  </div>
);

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

const ModuleListView = ({ videoModules, onSelectModule, theme }) => (
  <div className="flex flex-col h-full w-full">
    <div className="mb-12 w-full">
      <PageTitle title="Vídeos aprendidos" subtitle="Revise agora os vídeos que você já aprendeu" theme={theme} />
    </div>
    <div className="flex-grow flex flex-col justify-center space-y-6">
      {videoModules.map(module => (
        <button
          key={module.id}
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
          <span className={`ml-auto text-xl font-semibold ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}`}>{`${module.videosWatched} / ${module.totalVideos}`}</span>
        </button>
      ))}
    </div>
  </div>
);

const VideoGridView = ({ module, onBack, onPlayVideo, theme }) => (
  <div className="flex flex-col h-full w-full">
    <div className="flex items-center mb-12 w-full">
      <button onClick={onBack} className={`p-2 rounded-full transition-colors mr-4 ${theme === 'escuro' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`}>
        <BackArrowIcon theme={theme} />
      </button>
      <PageTitle title={module.title} subtitle="Revise agora os vídeos que você já aprendeu" theme={theme} />
    </div>
    {/* --- CORREÇÃO: Removido 'grid-cols-1 sm:grid-cols-2' para 3 colunas --- */}
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


// --- COMPONENTE PRINCIPAL DA PÁGINA (ATUALIZADO) ---
export default function VideosPage() {
  const { theme, lessonProgress } = useSettings(); 
  
  const [currentView, setCurrentView] = useState('list');
  const [selectedModule, setSelectedModule] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter');
  const [exitAnimationClass, setExitAnimationClass] = useState('');

  // --- LÓGICA DINÂMICA PARA CONSTRUIR OS MÓDULOS ---
  const moduleStructure = [
    { 
      id: 1, 
      title: 'Primeiros passos', 
      lessons: lessonMap.filter(l => l.unit === 1).map(l => l.id)
    },
    { 
      id: 2, 
      title: 'Alfabeto', 
      lessons: lessonMap.filter(l => l.unit === 2).map(l => l.id)
    },
    { id: 3, title: 'Símbolos e marcas', lessons: [] },
    { id: 4, title: 'Não definido', lessons: [] },
    { id: 5, title: 'Não definido', lessons: [] },
    { id: 6, title: 'Não definido', lessons: [] },
  ];

  const videoModules = moduleStructure.map(module => {
    let moduleUnlocked = false;
    let videosWatched = 0;
    let allModuleVideos = [];

    module.lessons.forEach(lessonId => {
      const progress = lessonProgress[lessonId];
      const isLessonComplete = !!progress; 
      
      const videosForThisLesson = lessonVideoMap[lessonId] || [];

      if (isLessonComplete) {
        moduleUnlocked = true;
        
        videosForThisLesson.forEach(video => {
          allModuleVideos.push({ ...video, unlocked: true });
          videosWatched++;
        });
      }
    });

    const totalVideosInModule = module.lessons.reduce((acc, lessonId) => {
      return acc + (lessonVideoMap[lessonId]?.length || 0);
    }, 0);

    // --- CORREÇÃO: Lógica de Placeholder Removida ---
    // (Não vamos mais adicionar vídeos "Bloqueado")

    return {
      id: module.id,
      title: module.title,
      unlocked: moduleUnlocked,
      videosWatched: videosWatched,
      totalVideos: totalVideosInModule,
      // --- CORREÇÃO: .slice(0, 10) Removido ---
      videos: allModuleVideos, // Mostra TODOS os vídeos desbloqueados
    };
  });
  // --- FIM DA LÓGICA DINÂMICA ---


  const handleSelectModule = (module) => {
    setEnterAnimationClass('');
    setExitAnimationClass('anim-exit');
    setTimeout(() => {
      setSelectedModule(module);
      setCurrentView('grid');
      setExitAnimationClass('');
      setEnterAnimationClass('anim-enter');
    }, 800);
  };

  const handleBackToList = () => {
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
      <SidebarLeft />
      <SidebarRight />
      <MobileTopBar />
      <MobileBottomBar />
      {playingVideo && <VideoPlayerModal videoUrl={playingVideo} onClose={() => setPlayingVideo(null)} />}

      <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
        <main className="px-6 lg:px-12 pt-20 pb-24 lg:pt-8 lg:pb-8 w-full flex-grow flex flex-col">
          <div className={`content-box w-full flex-grow flex flex-col ${enterAnimationClass} ${exitAnimationClass}`}>
            
            {currentView === 'list' && (
              <ModuleListView 
                videoModules={videoModules} 
                onSelectModule={handleSelectModule} 
                theme={theme} 
              />
            )}
            {currentView === 'grid' && selectedModule && (
              <VideoGridView 
                module={selectedModule} 
                onBack={handleBackToList} 
                onPlayVideo={(url) => setPlayingVideo(url)} 
                theme={theme} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}