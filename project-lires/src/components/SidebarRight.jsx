import React from 'react';

// --- Imagens ---
const userAvatarImg = '../src/assets/perfil.png';
const moneyBagImg = '../src/assets/bolsinha-dinheiro.png';
const fireIconImg = '../src/assets/foguinho.png';
const lcoinIconImg = '../src/assets/lcoin.png';
const heartIconImg = '../src/assets/coracaoo.png';
const liresMasterLogoImg = '../src/assets/lires-master-logo.png'; 
const robotMascotImg = '../src/assets/robot-mascot.png';     
const AdImage = '../assets/anuncio.png';

const UserStat = ({ iconSrc, value, color }) => (
    <div className="flex items-center gap-3">
        <img src={iconSrc} alt="Ícone de Status" className="w-8 h-8" />
        <span className={`font-bold text-xl ${color}`}>{value}</span>
    </div>
);

export default function SidebarRight() {
  return (
    // ALTERADO: Adicionada a borda à esquerda para separar do conteúdo principal
    <aside className="w-96 p-6 space-y-6 fixed top-0 right-0 h-screen overflow-y-auto bg-[#F9F8FF] border-l border-slate-200">
      {/* User Stats */}
      <div className="flex justify-around items-center bg-slate-50 p-2 rounded-xl">
        <UserStat iconSrc={fireIconImg} value="1" color="text-orange-500" />
        <UserStat iconSrc={lcoinIconImg} value="50" color="text-amber-500" />
        <UserStat iconSrc={heartIconImg} value="5" color="text-red-500" />
      </div>

      {/* Lires Master Card */}
      <div className="p-1 rounded-[24px] bg-gradient-to-br from-teal-200 to-blue-300">
        <div className="bg-gradient-to-br from-blue-800 via-indigo-900 to-black text-white rounded-[20px] relative overflow-hidden p-5">
            <div className="flex justify-between items-center">
                <div className="relative z-10">
                    <img src={liresMasterLogoImg} alt="Líres Master" className="w-32 mb-3" />
                    <p className="font-bold text-lg text-white mb-1">Seja MASTER agora!</p>
                    <p className="text-xs text-blue-200 mb-4 leading-snug">
                        Sem anuncios, vida ilimitada e<br/>skins gratis!
                    </p>
                    <button className="bg-gradient-to-r from-[#D7A3EB] to-[#9E57C3] text-white font-bold py-2 px-6 rounded-full w-fit shadow-lg hover:brightness-110 transition-all">
                        Assine agora
                    </button>
                </div>
                <div className="absolute right-[-25px] bottom-[-15px] w-40 h-40 z-0">
                    <img src={robotMascotImg} alt="Robô Mascote" className="w-full h-full object-contain" />
                </div>
            </div>
        </div>
      </div>

      {/* Card de Missões */}
      <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 space-y-4">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-purple-800">Missões</h3>
          <span className="text-sm text-purple-600">Complete para ganhar recompensas</span>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <img src={userAvatarImg} alt="Avatar do Usuário" className="w-12 h-12 rounded-full border-2 border-purple-200 p-1" />
          </div>
          <div className="flex-1 relative">
            <div className="bg-slate-200 rounded-full h-6 w-full">
              <div 
                className="bg-gradient-to-r from-purple-400 to-indigo-500 h-6 rounded-full" 
                style={{ width: '60%' }}
              ></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xs">150 / 250 XP</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-amber-600 text-sm">+50</span>
            <img src={moneyBagImg} alt="Recompensa em Lcoins" className="w-12 h-12" />
          </div>
        </div>
      </div>
      
      {/* Anúncio */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex-shrink-0">
        <h4 className="font-bold text-slate-500 mb-2">Anúncio</h4>
        <div className="bg-slate-800 rounded-lg h-32 flex items-center justify-center">
          <img src={AdImage} alt="Anúncio" className="h-full w-full object-cover rounded-lg"/>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-xs text-slate-500 text-center space-x-2 pt-4 flex-shrink-0">
        <a href="#" className="hover:underline">Sobre</a>
        <a href="#" className="hover:underline">Loja</a>
        <a href="#" className="hover:underline">Investidores</a>
        <a href="#" className="hover:underline">Privacidade</a>
        <a href="#" className="hover:underline">Termos de uso</a>
      </footer>
    </aside>
  );
}