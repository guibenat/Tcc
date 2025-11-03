import React, { useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
// 1. IMPORTAR O HOOK DO CAMINHO CORRETO
import { useSettings } from '../components/SettingsContext'; 

// --- Ícones e Imagens de Exemplo ---
const userAvatarImg = '../src/assets/perfil.png';
const postImage1 = '../src/assets/feed-image-1.png';
const postImage2 = '../src/assets/feed-image-2.png';

// --- DADOS DE EXEMPLO ---
const postsData = [
  { id: 1, avatar: userAvatarImg, username: '@cauasilva_2006', timestamp: 'há 1 hora atrás', text: 'Hoje eu consegui bater a meta de 65 dias acumulados', imageUrl: postImage1 },
  { id: 2, avatar: userAvatarImg, username: '@gustavorocha_2007', timestamp: 'há 2 horas atrás', text: 'Minha meta diária de 10 minutos por dia está sendo um sucesso', imageUrl: postImage2 },
];

// --- SUB-COMPONENTES DA PÁGINA (ATUALIZADOS) ---

// ATUALIZADO: Aceita 'theme' e reage
const PostCard = ({ post, theme }) => (
  <div className={`rounded-2xl p-6 ${
    theme === 'escuro' 
    ? 'bg-gray-800 border border-gray-700' 
    : 'bg-white/70 border border-slate-200'
  }`}>
    <div className="flex items-center mb-4">
      <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
      <div>
        <p className={`font-bold ${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`}>{post.username}</p>
        <p className={`text-sm ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}`}>{post.timestamp}</p>
      </div>
    </div>
    <p className={`mb-4 ${theme === 'escuro' ? 'text-slate-300' : 'text-slate-700'}`}>{post.text}</p>
    <img src={post.imageUrl} alt="Imagem do post" className="w-full rounded-lg" />
  </div>
);

// ATUALIZADO: Aceita 'theme' e reage
const PostCreator = ({ theme }) => {
    const handlePostTypeClick = (type) => { console.log(`'${type}' clicado.`); };
    return (
        <div className={`rounded-2xl p-4 flex items-start gap-4 ${
          theme === 'escuro' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white/70 border border-slate-200'
        }`}>
            <img src={userAvatarImg} alt="Seu avatar" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-3">
                <div className={`text-left font-semibold ${theme === 'escuro' ? 'text-violet-400' : 'text-violet-500'}`}>Sobre o que você quer postar hoje?</div>
                <div className="flex gap-2">
                    {/* Botões de gradiente não precisam de alteração */}
                    <button onClick={() => handlePostTypeClick('Sequência')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Sequência</button>
                    <button onClick={() => handlePostTypeClick('Meta')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Meta</button>
                    <button onClick={() => handlePostTypeClick('Versus')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Versus</button>
                </div>
            </div>
        </div>
    );
};

// ATUALIZADO: Aceita 'theme' e reage
const FeedTabs = ({ activeTab, onTabChange, theme }) => {
    const baseClasses = "px-8 py-3 rounded-full font-bold transition-all duration-300 ease-in-out";
    const activeClasses = "bg-pink-500 text-white shadow-lg shadow-pink-500/40 transform -translate-y-0.5";
    
    // Classes inativas agora reagem ao tema
    const inactiveClasses = theme === 'escuro' 
        ? 'bg-gray-700 text-pink-400 hover:bg-gray-600' 
        : 'bg-pink-100 text-pink-400 hover:bg-pink-200';
        
    return (
        <div className="flex justify-center mb-8 mt-2">
            <div className="flex gap-4">
                <button onClick={() => onTabChange('geral')} className={`${baseClasses} ${activeTab === 'geral' ? activeClasses : inactiveClasses}`}>Geral</button>
                <button onClick={() => onTabChange('amigos')} className={`${baseClasses} ${activeTab === 'amigos' ? activeClasses : inactiveClasses}`}>Amigos</button>
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL DA PÁGINA DE FEED ---
export default function FeedPage() {
    // 2. LER O TEMA DO CONTEXTO
    const { theme } = useSettings(); 
    
    const [activeTab, setActiveTab] = useState('geral');
    const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter');
    const [exitAnimationClass, setExitAnimationClass] = useState('');

    const handleTabChange = (newTab) => {
        if (newTab === activeTab) return; 

        setEnterAnimationClass('');
        setExitAnimationClass('anim-exit'); 

        setTimeout(() => {
            setActiveTab(newTab); 
            setExitAnimationClass('');
            setEnterAnimationClass('anim-enter');
        }, 800); 
    };

    return (
        // 3. APLICAR TEMA AO FUNDO PRINCIPAL
        <div className={`font-poppins relative min-h-screen flex flex-col ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
        }`}>
            <style>{`
                .btn-gradient-purple {
                    background-image: linear-gradient(90deg, #c084fc, #a855f7);
                    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
                }
            `}</style>
            
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow flex flex-col">
                    {/* 4. PASSAR O TEMA PARA OS SUB-COMPONENTES */}
                    <FeedTabs activeTab={activeTab} onTabChange={handleTabChange} theme={theme} />
                    
                    <div className="flex-grow flex flex-col">
                        <PostCreator theme={theme} />
                        
                        {/* 5. ATUALIZAR O HR (LINHA) */}
                        <hr className={`my-6 ${theme === 'escuro' ? 'border-gray-700' : 'border-teal-200'}`} />
                        
                        <div className={`content-box flex-grow flex flex-col ${enterAnimationClass} ${exitAnimationClass}`}>
                            {activeTab === 'geral' && (
                                <div className="space-y-6">
                                    {postsData.map(post => <PostCard key={post.id} post={post} theme={theme} />)}
                                </div>
                            )}
                            
                            {activeTab === 'amigos' && (
                                <div className="flex-grow flex items-center justify-center">
                                    {/* 6. ATUALIZAR TEXTO PLACEHOLDER */}
                                    <p className={`text-center ${theme === 'escuro' ? 'text-slate-400' : 'text-slate-500'}`}>
                                      O feed de amigos ainda está em construção!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}