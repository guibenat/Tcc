import React, { useState } from 'react';
import robotImage from '../assets/robot.png';
import diversaoIcon from '../assets/diversao.png';
import comunicacaoIcon from '../assets/comunicacao.png';
import profissionalIcon from '../assets/profissional.png';
import educacaoIcon from '../assets/educacao.png';
import liresLogoImage from '../assets/logo-lires.png';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Diversão');
  const categories = ['Diversão', 'Comunicação', 'Profissional', 'Educação'];

  const handleContinue = () => {
    // Esta linha já reconhece a opção e a imprime.
    console.log(`Você escolheu a categoria: ${selectedCategory}`);
  };

  const categoryIcons = {
    'Diversão': diversaoIcon,
    'Comunicação': comunicacaoIcon,
    'Profissional': profissionalIcon,
    'Educação': educacaoIcon,
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 text-gray-800 font-poppins">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full h-full box-border text-center flex flex-col">

        {/* === Seção superior estática: Cabeçalho com a Imagem do Logo e a linha divisória === */}
        <div className="flex flex-col flex-shrink-0">
          <div className="pb-2 flex justify-start">
            <img src={liresLogoImage} alt="Lires Logo" className="h-24" />
          </div>
          <hr className="my-0 mb-4" />
        </div>

        {/* === Seção central rolável: Área das Perguntas e Ícone do Robô === */}
        <div className="flex-grow overflow-y-auto flex flex-col items-center mt-5">
          <h1
            className="text-4xl font-semibold mb-5"
            style={{
              backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Escolha como começar
          </h1>

          <div className="w-1/2 mx-auto mb-10 h-2 bg-gray-200 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full"
              style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', width: '25%' }}
            ></div>
          </div>

          <div className="flex justify-center items-center gap-12 mb-10 md:flex-row flex-col">
            <div className="w-48">
              <img src={robotImage} alt="Robô Amigável" className="w-full" />
            </div>
            <div className="flex flex-col gap-4 w-72">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`
                    text-base font-semibold py-4 px-8 border-none rounded-3xl cursor-pointer
                    bg-white shadow-md text-gray-700 text-left transition transform duration-200
                    hover:-translate-y-0.5 hover:shadow-lg
                    ${selectedCategory === category ? 'text-white' : ''}
                  `}
                  style={selectedCategory === category ?
                    { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)' } :
                    {}
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  <img
                    src={categoryIcons[category]}
                    alt={`Ícone de ${category}`}
                    className="inline-block w-6 h-6 align-middle mr-2"
                  />
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* === Seção inferior estática: Botão de Continuar === */}
        <div className="pt-4 flex justify-end flex-shrink-0">
          <button
            className="text-lg font-semibold py-4 px-12 border-none rounded-3xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
            style={{
              backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
              boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
            }}
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;