import React, { useState } from 'react';
import liresLogoImage from '../assets/logo-lires.png';
import coracaoImage from '../assets/coracaoo.png';

function App() {
  const [selectedBox, setSelectedBox] = useState(null);

  // NOVO: Função para lidar com o clique no botão Próximo
  const handleNext = () => {
    if (selectedBox !== null) {
      // Aqui o sistema sabe qual caixa foi selecionada (pelo seu índice)
      console.log(`Caixa selecionada: ${selectedBox}`);
      // Você pode adicionar sua lógica de navegação ou envio de dados aqui
    } else {
      console.log('Por favor, selecione uma caixa primeiro.');
      // Você pode exibir uma mensagem de erro na tela para o usuário aqui
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen w-screen bg-gray-100 text-gray-800 font-poppins">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full h-full box-border text-center flex flex-col">

        {/* === Seção superior estática: Cabeçalho com a Imagem do Logo e a linha divisória === */}
        <div className="flex flex-col flex-shrink-0">
          <div className="pb-2 flex justify-start">
            <img src={liresLogoImage} alt="Lires Logo" className="h-24" />
          </div>
          <hr className="my-0 mb-4" />
        </div>

        {/* --- Conteúdo do meio com rolagem --- */}
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

          {/* Conteúdo da pergunta e caixas interativas */}
          <div className="w-full max-w-lg text-left px-4 mb-8">
            <p className="text-xl font-semibold mb-6" style={{ color: '#4b3670' }}>
              Qual desses sinais significa Oi?
            </p>
            <div className="flex justify-center gap-8 w-full"> 
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedBox(index)}
                  className={`
                    w-24 h-24 flex justify-center items-center rounded-2xl p-1 cursor-pointer flex-shrink-0
                    transition transform duration-200 hover:scale-105
                  `}
                  style={{ 
                    backgroundImage: selectedBox === index 
                      ? 'linear-gradient(to bottom right, #59b1ff, #b081ff)'
                      : 'linear-gradient(to bottom right, #e0b0ff, #c0d8ff)', 
                    boxShadow: selectedBox === index 
                      ? '0 0 30px rgba(90, 177, 255, 0.8)'
                      : '0 0 20px rgba(181, 130, 255, 0.3)',
                  }}
                >
                  <div 
                    className="w-full h-full rounded-xl" 
                    style={{ backgroundColor: selectedBox === index ? '#c0d8ff' : '#f0e0ff' }}
                  >
                    {/* Aqui iriam as imagens dos sinais */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Barra de separação --- */}
        <hr className="w-full max-w-lg my-6 border-gray-200" />
        
        {/* Botões de navegação */}
        <div className="flex justify-center items-center gap-4 mt-8 flex-shrink-0">
          <button 
            className="text-lg font-semibold py-3 px-8 rounded-2xl cursor-pointer text-gray-600 transition transform duration-200 hover:scale-105"
            style={{
              backgroundImage: 'linear-gradient(to right, #b081ff, #59b1ff)',
              padding: '2px',
            }}
          >
            <span className="block px-7 py-2 rounded-xl bg-white text-gray-600">Pular</span>
          </button>
          <button
            onClick={handleNext} // Adicionado o evento onClick ao botão
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
  );
}

export default App;