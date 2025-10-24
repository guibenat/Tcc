import React, { useState, useEffect } from "react";

// --- IMAGENS BANNER ---
import robotPremiumImg from '../assets/robot-premium.png'; 
import liresMasterLogo from '../assets/lires-master-logo.png'; 

// --- IMAGENS LCOINS ---
import lcoinIconImg from '../assets/lcoin.png'; // Ícone do título
import coinChestImg from '../assets/coin-chest.png'; // Imagem para 1200
import coinBarrelImg from '../assets/coin-barrel.png'; // Imagem para 3000
import coinCartImg from '../assets/coin-cart.png'; // Imagem para 6500


export default function LojaContent() {
    
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []); 

    // Classe base para os cards
    const baseCardClass = "flex flex-col items-center p-4 rounded-xl shadow-lg transition-all transform cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20";

    return (
        <div className={`flex flex-col gap-8 w-full content-box ${animationClass}`}> 
    
            {/* BANNER PREMIUM (sem alteração) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 overflow-hidden">
                <div className="flex-1 text-center md:text-left z-10">
                    <img 
                        src={liresMasterLogo} 
                        alt="Líres Master Logo" 
                        className="w-auto h-8 mb-3 mx-auto md:mx-0 object-contain"
                    />
                    <h2 className="text-3xl font-bold mb-2">
                        Aprenda Libras <span className="text-yellow-300">SEM LIMITES!</span>
                    </h2>
                    <p className="text-blue-100 text-base mb-6 max-w-md mx-auto md:mx-0">
                        Mais conteúdo, mais prática e recursos exclusivos para acelerar seu aprendizado.
                    </p>
    
                    <div className="inline-block bg-gradient-to-r from-lime-300 via-yellow-300 to-lime-400 p-[3px] rounded-full shadow-lg">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-10 rounded-full w-full transition-colors text-lg">
                        	Assinar agora
                        </button>
                    </div>
                </div>
    
                <div className="flex-shrink-0">
                    <img 
                    	src={robotPremiumImg} 
                    	alt="Mascote Lires Master" 
                    	className="w-72 h-72 object-contain" 
                    />
                </div>
    
            </div>

            {/* LCOINS ATUALIZADO (SEÇÃO TOTALMENTE LIMPA) */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <img src={lcoinIconImg} alt="Lcoins" className="w-8 h-8" />
                    <span className="text-xl font-semibold text-purple-700">Lcoins</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Pacote 1 (1200) - Limpo */}
                    <div className={`${baseCardClass} bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-blue-300`}>
                        <img src={coinChestImg} alt="1200 Lcoins" className="w-36 h-36 mb-2 object-contain" />
                        <span className="font-bold text-2xl text-yellow-300">1200</span>
                      	<span className="text-base text-white/90 font-medium">R$ 17,90</span>
                    </div>
    
                    {/* Pacote 2 (3000) - Limpo */}
                    <div className={`${baseCardClass} bg-gradient-to-br from-blue-500 to-indigo-700 border-2 border-blue-400`}>
                        <img src={coinBarrelImg} alt="3000 Lcoins" className="w-36 h-36 mb-2 object-contain" />
                      	<span className="font-bold text-2xl text-yellow-300">3000</span>
                        <span className="text-base text-white/90 font-medium">R$ 34,00</span>
                 </div>
    
                  	{/* Pacote 3 (6500) - Limpo */}
                  	<div className={`${baseCardClass} bg-gradient-to-br from-blue-700 to-indigo-900 border-2 border-indigo-400`}>
                  	 	<img src={coinCartImg} alt="6500 Lcoins" className="w-36 h-36 mb-2 object-contain" />
                        <span className="font-bold text-2xl text-yellow-300">6500</span>
                    	<span className="text-base text-white/90 font-medium">R$ 51,20</span>
            	</div>
                
            	</div>
        	</div>
  	</div>
  );
}