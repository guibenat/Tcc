import React, { useState, useEffect } from 'react';
// 1. IMPORTAR O HOOK DE CONFIGURAÇÕES
import { useSettings } from '../components/SettingsContext';

// Importa a imagem do robô (com o nome correto dos seus assets)
import robotMasterImage from '../assets/robot-premium.png'; 

// Animação para o robô flutuante
const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
`;

// Animação de "brilho" (shine) que passa pelo card
const shineAnimation = `
  @keyframes shine {
    0% { transform: translateX(-100%) skewX(-25deg); }
    100% { transform: translateX(200%) skewX(-25deg); }
  }

  /* Classe para aplicar o efeito */
  .shine-effect::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0.6;
    transform: translateX(-100%) skewX(-25deg);
    animation: shine 4s infinite 2s; /* Animação de 4s, começa após 2s */
  }
`;


// --- Ícones SVG ---
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="12" cy="12" r="12" fill="url(#grad-check)"/>
    <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad-check" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="12" cy="12" r="12" fill="url(#grad-plus)"/>
    <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad-plus" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);


export default function Assinatura() {
  // 2. LER O TEMA DO CONTEXTO
  const { theme } = useSettings();

  // Animação de entrada
  const [animationClass, setAnimationClass] = useState('');
  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []);

  const beneficios = [
    "Sem anúncios",
    "Avatares e recompensas exclusivas",
    "Acesso a todos os módulos sem bloqueio",
    "Baixar lições e vídeos para estudar sem internet",
    "Conquistas exclusivas para assinantes"
  ];

  // --- Classes de Estilo Dinâmicas (Padronizadas) ---
  const mainTitleClasses = theme === 'escuro'
    ? 'text-purple-400 font-bold text-4xl md:text-5xl mb-8'
    : 'text-purple-600 font-bold text-4xl md:text-5xl mb-8';

  const cardClasses = theme === 'escuro'
    ? 'bg-gray-800 rounded-lg shadow-md p-6 md:p-10'
    : 'bg-white rounded-lg shadow-md p-6 md:p-10';

  const boxTitleClasses = theme === 'escuro'
    ? 'text-purple-400 font-bold text-xl md:text-2xl lg:text-3xl mb-4'
    : 'text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl mb-4';

  const dividerClasses = theme === 'escuro'
    ? 'w-full h-1 bg-gray-700 mb-6'
    : 'w-full h-1 bg-green-200 mb-6';

  const sectionTitleClasses = theme === 'escuro'
    ? 'text-purple-400 font-bold text-2xl md:text-3xl mb-6'
    : 'text-purple-600 font-bold text-2xl md:text-3xl mb-6';

  const benefitTextClasses = theme === 'escuro'
    ? 'text-gray-300 text-lg'
    : 'text-gray-700 text-lg';
  
  return (
    <div className={`content-box w-full ${animationClass}`}>
      {/* Adiciona as animações de float e shine */}
      <style>{floatAnimation}{shineAnimation}</style>
      
      <h1 className={mainTitleClasses}>
        Assinatura
      </h1>
      
      <div className={cardClasses}> 
        <h2 className={boxTitleClasses}>
          Escolha seu plano
        </h2>
        <div className={dividerClasses}></div>
        
        {/* --- Card LÍRES MASTER --- */}
        <div className="relative rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden shine-effect"
             style={{ background: 'linear-gradient(110deg, #4F46E5 0%, #A855F7 100%)', boxShadow: '0 10px 30px rgba(129, 93, 248, 0.4)' }}>
          
          {/* Conteúdo de Texto */}
          <div className="md:w-3/5 text-white text-center md:text-left z-10">
            <span className="inline-block bg-purple-900 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
              LÍRES MASTER
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
              Aprenda Libras <span className="underline decoration-yellow-300">SEM LIMITES!</span>
            </h3>
            <p className="text-lg text-purple-100 mb-6">
              Mais conteúdo, mais prática e recursos exclusivos para acelerar seu aprendizado.
            </p>
            <button 
              className="font-bold py-3 px-10 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 bg-white text-purple-700"
            >
              Assinar agora
            </button>
          </div>

          {/* Imagem do Robô (TAMANHO AUMENTADO) */}
          <div className="md:w-2/5 flex justify-center mt-8 md:mt-0 z-10">
            <img 
              src={robotMasterImage} 
              alt="Robô Lires Master" 
              className="w-56 h-56 lg:w-64 lg:h-64 object-contain" // object-contain para não esticar
              style={{ animation: 'float 3s ease-in-out infinite' }}
            />
          </div>
        </div> {/* Fim do Card LÍRES MASTER */}

        {/* --- Benefícios (DENTRO do box) --- */}
        {/* ESTA É A LINHA QUE ESTAVA CAUSANDO O BUG - O '_' FOI REMOVIDO */}
        <div className="mt-12">
          <h2 className={sectionTitleClasses}>
            Benefícios do plano LÍRES MASTER
          </h2>

          <ul className="space-y-4">
            {beneficios.map((beneficio) => (
              <li key={beneficio} className="flex items-center space-x-3">
                <CheckIcon />
                <span className={benefitTextClasses}>
                  {beneficio}
                </span>
              </li>
            ))}
            <li className="flex items-center space-x-3">
              <PlusIcon />
              <span className={benefitTextClasses}>
                E muito mais
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}