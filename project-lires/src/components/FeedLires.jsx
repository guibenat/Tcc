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

// Caixa para criar um novo post
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
                    <button onClick={() => handlePostTypeClick('Sequência')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Sequência</button>
                    <button onClick={() => handlePostTypeClick('Meta')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Meta</button>
                    <button onClick={() => handlePostTypeClick('Versus')} className="btn-gradient-purple text-white font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg">Versus</button>
                </div>
            </div>
        </div>
    );
};

// Abas de filtro "Geral" e "Amigos"
const FeedTabs = ({ activeTab, setActiveTab }) => (
    <div className="flex justify-center mb-6">
        <div className="flex gap-4">
            <button
                onClick={() => setActiveTab('geral')}
                className={`px-8 py-2 rounded-full font-bold text-white transition-all duration-300 shadow-lg ${activeTab === 'geral' ? 'bg-pink-400 shadow-pink-300/60' : 'bg-pink-300 shadow-pink-200/50 opacity-80'}`}
            >
                Geral
            </button>
            <button
                onClick={() => setActiveTab('amigos')}
                className={`px-8 py-2 rounded-full font-bold text-white transition-all duration-300 shadow-lg ${activeTab === 'amigos' ? 'bg-pink-400 shadow-pink-300/60' : 'bg-pink-300 shadow-pink-200/50 opacity-80'}`}
            >
                Amigos
            </button>
        </div>
    </div>
);


// --- COMPONENTE PRINCIPAL DA PÁGINA DE FEED ---
export default function FeedPage() {
    const [activeTab, setActiveTab] = useState('geral');

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

            <div className="w-full lg:pl-48 lg:pr-96 flex-grow flex flex-col">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="space-y-6">
                        <PostCreator />
                        <hr className="border-teal-200" />
                        
                        {activeTab === 'geral' && postsData.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                        
                        {activeTab === 'amigos' && (
                            <div className="text-center text-slate-500">O feed de amigos ainda está em construção!</div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}