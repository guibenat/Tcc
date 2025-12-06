import React from 'react';

// Assets
import robotImage from '../assets/robot-nerd.png';
import liresLogoImage from '../assets/logo-lires.png';

// Animação de flutuação para o robô
const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

// Componente da tela "Descubra seu Nível
function DescubraNivel1() {
  return (
    // Wrapper principal da tela
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 text-gray-800 font-poppins">
      
      {/* Conteúdo da Página  */}
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full h-full box-border text-center flex flex-col">
        
        {/* Header com a logo */}
        <div className="flex flex-col flex-shrink-0">
          <div className="pb-2 flex justify-start">
            <img src={liresLogoImage} alt="Lires Logo" className="h-24" />
          </div>
          <hr className="my-0 mb-4" />
        </div>

        {/* Área de conteúdo principal */}
        <div className="flex-grow flex items-center justify-center">
        </div>
      </div>

      {/* Modal de Nivelamento */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        
        {/* Card do Modal */}
        <div 
          className="bg-white p-8 rounded-2xl border-2 border-blue-400 flex items-center gap-8 max-w-2xl"
          style={{
            boxShadow: '0 0 50px rgba(90, 177, 255, 0.6)',
          }}
        >
          {/* Textos e Botão */}
          <div className="flex-grow text-left">
            {/* Título com gradiente */}
            <p className="text-xl font-semibold" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Vamos descobrir seu nível em Libras.
            </p>
            {/* Subtítulo */}
            <p className="text-xl font-semibold text-gray-600 mt-2 mb-4">
              Responda algumas perguntas e faça um teste rápido.
            </p>
            
            {/* Botão de Ação */}
            <button
              className="mt-4 text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
              }}
            >
              Começar Teste
            </button>
          </div>

          {/* Lado Direito: Imagem do Robô */}
          <div className="flex-shrink-0 w-48">
            <img 
              src={robotImage} 
              alt="Robô Amigável" 
              className="w-full robot-float" 
              style={{
                // Aplica a animação de flutuação
                animation: 'float 3s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Injeta a string da animação */}
      <style>{floatAnimation}</style>
    </div>
  );
}

export default DescubraNivel1;