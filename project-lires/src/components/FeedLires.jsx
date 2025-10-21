import React, { useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';

// --- Ícones e Imagens de Exemplo ---
const userAvatarImg = '../src/assets/perfil.png';
const postImage1 = '../src/assets/feed-image-1.png';
const postImage2 = '../src/assets/feed-image-2.png';

// --- DADOS DE EXEMPLO PARA O FEED "GERAL" ---
const postsData = [
  {
    id: 1,
    avatar: userAvatarImg,
    username: '@cauasilva_2006',
    timestamp: 'há 1 hora atrás',
    text: 'Hoje eu consegui bater a meta de 65 dias acumulados',
    imageUrl: postImage1,
  },
  {
    id: 2,
    avatar: userAvatarImg,
    username: '@gustavorocha_2007',
    timestamp: 'há 2 horas atrás',
    text: 'Minha meta diária de 10 minutos por dia está sendo um sucesso',
    imageUrl: postImage2,
  },
];

// --- SUB-COMPONENTES DA PÁGINA ---

// Card de um único Post
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

// Caixa para criar um novo post (COM CLASSES TAILWIND ATUALIZADAS)
const PostCreator = () => {
    const handlePostTypeClick = (type) => {
        console.log(`Botão de postagem '${type}' clicado.`);
    };

    return (
        <div className="bg-white/70 border border-slate-200 rounded-2xl p-4 flex items-start gap-4">
            <img src={userAvatarImg} alt="Seu avatar" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-3">
                <div className="text-left font-semibold text-violet-500">Sobre o que você quer postar hoje?</div>
                <div className="flex gap-2">
                    {/* Botões com gradiente e sombra aplicados via Tailwind */}
                    <button onClick={() => handlePostTypeClick('Sequência')} className="bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg shadow-purple-500/30">Sequência</button>
                    <button onClick={() => handlePostTypeClick('Meta')} className="bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg shadow-purple-500/30">Meta</button>
                    <button onClick={() => handlePostTypeClick('Versus')} className="bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg shadow-purple-500/30">Versus</button>
                </div>
            </div>
        </div>
    );
};

// Abas de filtro "Geral" e "Amigos" (COM NOVO ESTILO)
const FeedTabs = ({ activeTab, setActiveTab }) => {
    // Classes base para ambos os botões
    const baseClasses = "px-8 py-3 rounded-full font-bold transition-all duration-300 ease-in-out";
    
    // Classes para o botão ATIVO
    const activeClasses = "bg-pink-500 text-white shadow-lg shadow-pink-500/40 transform -translate-y-0.5";
    
    // Classes para o botão INATIVO
    const inactiveClasses = "bg-pink-100 text-pink-400";

    return (
        <div className="flex justify-center mb-8 mt-2"> {/* Aumentei um pouco a margem */}
            <div className="flex gap-4">
                <button
                    onClick={() => setActiveTab('geral')}
                    className={`${baseClasses} ${activeTab === 'geral' ? activeClasses : inactiveClasses}`}
                >
                    Geral
                </button>
                <button
                    onClick={() => setActiveTab('amigos')}
                    className={`${baseClasses} ${activeTab === 'amigos' ? activeClasses : inactiveClasses}`}
                >
                    Amigos
                </button>
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL DA PÁGINA DE FEED ---
export default function FeedPage() {
    const [activeTab, setActiveTab] = useState('geral');

    return (
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins relative min-h-screen flex flex-col">
            
            <SidebarLeft />
            <SidebarRight />

            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow flex flex-col">
                    <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    
                    <div className="space-y-6 flex-grow flex flex-col">
                        <PostCreator />
                        <hr className="border-teal-200" />
                        
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
                </main>
            </div>
        </div>
    );
}