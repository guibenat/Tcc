import React, { useState } from 'react'; // Import useEffect
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';

// --- Ícones e Imagens de Exemplo ---
const userAvatarImg = '../src/assets/perfil.png';
const postImage1 = '../src/assets/feed-image-1.png';
const postImage2 = '../src/assets/feed-image-2.png';

// --- DADOS DE EXEMPLO ---
const postsData = [
  { id: 1, avatar: userAvatarImg, username: '@cauasilva_2006', timestamp: 'há 1 hora atrás', text: 'Hoje eu consegui bater a meta de 65 dias acumulados', imageUrl: postImage1 },
  { id: 2, avatar: userAvatarImg, username: '@gustavorocha_2007', timestamp: 'há 2 horas atrás', text: 'Minha meta diária de 10 minutos por dia está sendo um sucesso', imageUrl: postImage2 },
];

// --- SUB-COMPONENTES DA PÁGINA ---
const PostCard = ({ post }) => (
  <div className="bg-white/70 border border-slate-200 rounded-2xl p-6">
    <div className="flex items-center mb-4">
      <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
      <div>
        <p className="font-bold text-slate-800">{post.username}</p>
        <p className="text-sm text-slate-500">{post.timestamp}</p>
      </div>
    </div>
    <p className="text-slate-700 mb-4">{post.text}</p>
    <img src={post.imageUrl} alt="Imagem do post" className="w-full rounded-lg" />
  </div>
);

const PostCreator = () => {
    const handlePostTypeClick = (type) => { console.log(`'${type}' clicado.`); };
    return (
        <div className="bg-white/70 border border-slate-200 rounded-2xl p-4 flex items-start gap-4">
            <img src={userAvatarImg} alt="Seu avatar" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-3">
                <div className="text-left font-semibold text-violet-500">Sobre o que você quer postar hoje?</div>
                <div className="flex gap-2">
                    <button onClick={() => handlePostTypeClick('Sequência')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Sequência</button>
                    <button onClick={() => handlePostTypeClick('Meta')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Meta</button>
                    <button onClick={() => handlePostTypeClick('Versus')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Versus</button>
                </div>
            </div>
        </div>
    );
};

// ALTERADO: FeedTabs agora recebe onTabChange em vez de setActiveTab
const FeedTabs = ({ activeTab, onTabChange }) => {
    const baseClasses = "px-8 py-3 rounded-full font-bold transition-all duration-300 ease-in-out";
    const activeClasses = "bg-pink-500 text-white shadow-lg shadow-pink-500/40 transform -translate-y-0.5";
    const inactiveClasses = "bg-pink-100 text-pink-400";
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
    const [activeTab, setActiveTab] = useState('geral');
    
    // NOVO: Estados para controlar as classes de animação
    const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter'); // Animação de entrada inicial
    const [exitAnimationClass, setExitAnimationClass] = useState('');

    // NOVO: Função para controlar a troca de abas com animação
    const handleTabChange = (newTab) => {
        if (newTab === activeTab) return; // Não faz nada se clicar na aba que já está ativa

        setEnterAnimationClass('');
        setExitAnimationClass('anim-exit'); // Aplica a animação de saída

        setTimeout(() => {
            setActiveTab(newTab); // Troca o conteúdo (a aba)
            setExitAnimationClass('');
            setEnterAnimationClass('anim-enter'); // Aplica a animação de entrada
        }, 800); // Tempo da animação (deve ser igual ao do index.css)
    };

    return (
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins relative min-h-screen flex flex-col">
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
                    {/* ALTERADO: Passa a nova função handleTabChange */}
                    <FeedTabs activeTab={activeTab} onTabChange={handleTabChange} />
                    
                    {/* O div 'space-y-6' foi movido para dentro da div 'geral' */}
                    <div className="flex-grow flex flex-col">
                        <PostCreator />
                        <hr className="border-teal-200 my-6" /> {/* Adicionado my-6 para espaçamento */}
                        
                        {/* NOVO: Wrapper 'content-box' para o conteúdo que será animado */}
                        <div className={`content-box flex-grow flex flex-col ${enterAnimationClass} ${exitAnimationClass}`}>
                            {activeTab === 'geral' && (
                                <div className="space-y-6">
                                    {postsData.map(post => <PostCard key={post.id} post={post} />)}
                                </div>
                            )}
                            
                            {activeTab === 'amigos' && (
                                <div className="flex-grow flex items-center justify-center">
                                    <p className="text-center text-slate-500">O feed de amigos ainda está em construção!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}