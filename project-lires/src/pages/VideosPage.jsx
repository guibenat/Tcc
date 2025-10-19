import React, { useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';

// --- Ícones ---
const PlayIcon = () => <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>;
const LockIcon = () => <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>;
const BackArrowIcon = () => <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>;
const CloseIcon = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;


// --- DADOS DE EXEMPLO (COM TÍTULOS DOS VÍDEOS) ---
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
  { id: 4, title: 'Não definido', unlocked: false, videosWatched: 0, totalVideos: 10, videos: Array(10).fill({ unlocked: false }) },
  { id: 5, title: 'Não definido', unlocked: false, videosWatched: 0, totalVideos: 10, videos: Array(10).fill({ unlocked: false }) },
  { id: 6, title: 'Não definido', unlocked: false, videosWatched: 0, totalVideos: 10, videos: Array(10).fill({ unlocked: false }) },
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
    <button className="absolute top-4 right-4 text-white z-50">
      <CloseIcon />
    </button>
    <div className="w-full max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
      <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-2xl">
        <video src={videoUrl} controls autoPlay className="w-full h-full" />
      </div>
    </div>
  </div>
);

const ModuleListView = ({ onSelectModule }) => (
    <div className="flex flex-col h-full">
        <div className="mb-12">
            <PageTitle title="Vídeos aprendidos" subtitle="Revise agora os vídeos que você já aprendeu" />
        </div>
        <div className="flex-grow flex flex-col justify-center space-y-6">
            {videoModules.map(module => (
                <button
                    key={module.id}
                    onClick={() => module.unlocked && onSelectModule(module)}
                    disabled={!module.unlocked}
                    className="w-full flex items-center p-6 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    style={{ backgroundColor: module.unlocked ? '#E9E4FF' : '#F1F5F9', borderBottom: `6px solid ${module.unlocked ? '#C6BFF7' : '#E2E8F0'}` }}
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
  <div>
    <div className="flex items-center mb-12">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 transition-colors mr-4">
        <BackArrowIcon />
      </button>
      <PageTitle title={module.title} subtitle="Revise agora os vídeos que você já aprendeu" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
      {module.videos.map((video, index) => (
        <div key={index}>
          <button
            onClick={() => video.unlocked && onPlayVideo(video.url)}
            disabled={!video.unlocked}
            className="relative w-full aspect-video rounded-2xl flex items-center justify-center transition-transform hover:scale-105 disabled:cursor-not-allowed"
            style={{ backgroundColor: video.unlocked ? '#fbcfe8' : '#e5e7eb' }}
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

  const handleSelectModule = (module) => {
    setSelectedModule(module);
    setCurrentView('grid');
  };

  const handleBackToList = () => {
    setSelectedModule(null);
    setCurrentView('list');
  };

  return (
    <div className="bg-[#F9EFFF] font-poppins relative min-h-screen flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
        * { box-sizing: border-box; }
      `}</style>

      <SidebarLeft />
      <SidebarRight />
      {playingVideo && <VideoPlayerModal videoUrl={playingVideo} onClose={() => setPlayingVideo(null)} />}

      <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
        <main className="px-6 lg:px-12 pt-20 pb-24 lg:pt-8 lg:pb-8 w-full flex-grow flex flex-col">
          {currentView === 'list' && (
            <ModuleListView onSelectModule={handleSelectModule} />
          )}
          {currentView === 'grid' && selectedModule && (
            <VideoGridView module={selectedModule} onBack={handleBackToList} onPlayVideo={(url) => setPlayingVideo(url)} />
          )}
        </main>
      </div>
    </div>
  );
}