import React from 'react';
import liresLogoImage from '../assets/logo-lires.png';
import coracaoImage from '../assets/coracaoo.png';

// Placeholder para o ícone de play
const PlayIconPlaceholder = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-16 h-16 text-white opacity-90"
    >
        <path fillRule="evenodd" d="M4.5 5.653c0-1.082 1.397-1.786 2.37-1.272l12.72 6.848c.974.522.974 1.942 0 2.464L6.87 20.62c-.973.514-2.37-.19-2.37-1.272V5.653z" clipRule="evenodd" />
    </svg>
);

function App() {
  return (
    // Alterado 'justify-center' para 'justify-start' para permitir a rolagem
    <div className="flex flex-col justify-start items-center h-screen w-screen bg-gray-100 text-gray-800 font-poppins">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full h-full box-border text-center flex flex-col">

        {/* === Seção superior estática: Cabeçalho com a Imagem do Logo e a linha divisória === */}
        <div className="flex flex-col flex-shrink-0">
          <div className="pb-2 flex justify-start">
            <img src={liresLogoImage} alt="Lires Logo" className="h-24" />
          </div>
          <hr className="my-0 mb-4" />
        </div>

        {/* === Seção central: Área da Aula Prática (agora com rolagem) === */}
        <div className="flex-grow flex flex-col items-center overflow-y-auto">
          
          {/* Título e subtítulo com o coração */}
          <div className="flex flex-col items-center text-center w-full mb-8">
            <div className="flex justify-between items-center w-full px-4">
              <h1 className="text-4xl font-bold" style={{ color: '#4b3670' }}>
                Primeira Aula Prática
              </h1>
              <div className="flex items-center gap-1">
                <img src={coracaoImage} alt="Corações" className="w-8 h-8" />
                <span className="text-lg font-bold text-red-500">5</span>
              </div>
            </div>
            <p className="text-lg font-medium mb-4 self-start pl-4" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Saudações
            </p>
          </div>

          {/* Barra de progresso */}
          <div className="w-full max-w-lg h-2 bg-gray-200 rounded-full overflow-hidden mb-8" style={{ boxShadow: '0 0 10px rgba(90, 177, 255, 0.2)' }}>
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: '25%', 
                backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)' 
              }}
            ></div>
          </div>

          {/* Container do player de vídeo */}
          <div 
            className="w-full max-w-lg aspect-video p-1 cursor-pointer" 
            style={{ 
              backgroundImage: 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)', 
              borderRadius: '1.5rem', 
              boxShadow: '0 0 50px rgba(181, 130, 255, 0.6)',
            }}
          >
            <div className="relative w-full h-full rounded-2xl flex justify-center items-center" style={{ backgroundColor: '#f0e0ff' }}>
              <PlayIconPlaceholder />
            </div>
          </div>

          {/* --- Barra de separação --- */}
          <hr className="w-full max-w-lg my-6 border-gray-200" />
          
          {/* Botões de navegação */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Botão Pular com borda de gradiente */}
            <button 
              className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer text-gray-600 transition transform duration-200 hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)',
                padding: '2px',
              }}
            >
              <span className="block px-7 py-2 rounded-xl bg-white text-gray-600">Pular</span>
            </button>

            {/* Botão Próximo com gradiente de fundo */}
            <button
              className="text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
              }}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
      
      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(200, 200, 200, 0.3);
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #b081ff, #59b1ff);
            border-radius: 10px;
          }

          /* Compatibilidade com Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: #59b1ff #f1f1f1;
          }
        `}
      </style>
    </div>
  );
}

export default App;