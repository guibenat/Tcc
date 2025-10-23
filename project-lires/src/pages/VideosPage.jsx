import React, { useState, useEffect } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';

// --- Ícones ---
const PlayIcon = () => <svg className="w-10 h-10 text-slate-500 group-hover:text-violet-500 transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>;
const LockIcon = () => <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>;
const BackArrowIcon = () => <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>;
const CloseIcon = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;


// --- DADOS DE EXEMPLO ---
const videoModules = [
  {
    id: 1, title: 'Primeiros passos', unlocked: true, videosWatched: 3, totalVideos: 10,
    videos: [
      { id: 'v1', unlocked: true, url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Oi' },
      { id: 'v2', unlocked: true, url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Tchau' },
      { id: 'v3', unlocked: true, url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Obrigado' },
      ...Array(7).fill({ unlocked: false, title: 'Indisponível' })
    ]
  },
  { id: 2, title: 'Alfabeto', unlocked: false, videosWatched: 0, totalVideos: 10, videos: Array(10).fill({ unlocked: false, title: 'Indisponível' }) },
  { id: 3, title: 'Símbolos e marcas', unlocked: false, videosWatched: 0, totalVideos: 10, videos: Array(10).fill({ unlocked: false, title: 'Indisponível' }) },
  { id: 4, title: 'Não definido', unlocked: false, videosWatched: 0, totalVideos: 10, videos: Array(10).fill({ unlocked: false, title: 'Indisponível' }) },
  { id: 5, title: 'Não definido', unlocked: false, videosWatched: 0, totalVideos: 10, videos: Array(10).fill({ unlocked: false, title: 'Indisponível' }) },
  { id: 6, title: 'Não definido', unlocked: false, videosWatched: 0, totalVideos: 10, videos: Array(10).fill({ unlocked: false, title: 'Indisponível' }) },
];


// --- COMPONENTES DA PÁGINA ---
const PageTitle = ({ title, subtitle }) => (
    <div className="text-left">
        <div className="relative inline-block mb-1">
            <h1 className="text-4xl font-bold text-violet-400">{title}</h1>
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-violet-300 rounded-full" />
        </div>
        {subtitle && <p className="text-lg text-violet-400 opacity-80 mt-2">{subtitle}</p>}
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

const ModuleListView = ({ onSelectModule }) => (
    <div className="flex flex-col h-full w-full">
        <div className="mb-12 w-full">
            <PageTitle title="Vídeos aprendidos" subtitle="Revise agora os vídeos que você já aprendeu" />
        </div>
        <div className="flex-grow flex flex-col justify-center space-y-6">
            {videoModules.map(module => (
                <button
                    key={module.id}
                    onClick={() => module.unlocked && onSelectModule(module)}
                    disabled={!module.unlocked}
                    className="w-full flex items-center p-6 rounded-2xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group bg-white/50 hover:bg-white/90 shadow-sm border border-white"
                >
                    <div className="mr-5">{module.unlocked ? <PlayIcon /> : <LockIcon />}</div>
                    <span className="text-2xl font-bold text-slate-700">{module.title}</span>
                    <span className="ml-auto text-xl font-semibold text-slate-500">{`${module.videosWatched} / ${module.totalVideos}`}</span>
                </button>
            ))}
        </div>
    </div>
);

const VideoGridView = ({ module, onBack, onPlayVideo }) => (
  <div className="flex flex-col h-full w-full">
    <div className="flex items-center mb-12 w-full">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 transition-colors mr-4"><BackArrowIcon /></button>
      <PageTitle title={module.title} subtitle="Revise agora os vídeos que você já aprendeu" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 flex-grow">
      {module.videos.map((video, index) => (
        <div key={index}>
          <button
            onClick={() => video.unlocked && onPlayVideo(video.url)}
            disabled={!video.unlocked}
            className="relative w-full aspect-video rounded-2xl flex items-center justify-center transition-transform hover:scale-105 disabled:cursor-not-allowed bg-white/70 shadow-sm border border-white"
          >
            <PlayIcon />
          </button>
          <h3 className={`text-center font-semibold mt-2 ${video.unlocked ? 'text-slate-700' : 'text-slate-400'}`}>
            {video.title}
          </h3>
        </div>
      ))}
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function VideosPage() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedModule, setSelectedModule] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter');
  const [exitAnimationClass, setExitAnimationClass] = useState('');

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
    <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins relative min-h-screen flex flex-col">
      <SidebarLeft />
      <SidebarRight />
      <MobileTopBar />
      <MobileBottomBar />
      {playingVideo && <VideoPlayerModal videoUrl={playingVideo} onClose={() => setPlayingVideo(null)} />}

      <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
        {/* ALTERADO: Removidas as classes 'max-w-screen-xl' e 'mx-auto' */}
        <main className="px-6 lg:px-12 pt-20 pb-24 lg:pt-8 lg:pb-8 w-full flex-grow flex flex-col">
          <div className={`content-box w-full flex-grow flex flex-col ${enterAnimationClass} ${exitAnimationClass}`}>
            {currentView === 'list' && (
              <ModuleListView onSelectModule={handleSelectModule} />
            )}
            {currentView === 'grid' && selectedModule && (
              <VideoGridView module={selectedModule} onBack={handleBackToList} onPlayVideo={(url) => setPlayingVideo(url)} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}