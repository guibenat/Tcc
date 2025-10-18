import React, { useState } from 'react';
import robotImage from '../assets/robot.png';
import diversaoIcon from '../assets/diversao.png';
import comunicacaoIcon from '../assets/comunicacao.png';
import profissionalIcon from '../assets/profissional.png';
import educacaoIcon from '../assets/educacao.png';
import liresLogoImage from '../assets/logo-lires.png';
import calendarioIcon from '../assets/icone-calendario.png';
import lupaIcon from '../assets/icone-lupa.png';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Começar do zero');
  const categories = ['Começar do zero', 'Descubra seu nível'];

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
              style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', width: '80%' }}
            ></div>
          </div>

          <div className="flex justify-center items-center gap-12 mb-10 md:flex-row flex-col">
            <div className="w-48">
              <img src={robotImage} alt="Robô Amigável" className="w-full" />
            </div>
            <div className="flex flex-col gap-4 w-96">
              <button
                key="Começar do zero"
                className={`
                  text-lg font-semibold py-6 px-12 border-none rounded-3xl cursor-pointer
                  bg-white shadow-md text-gray-700 text-left transition transform duration-200
                  hover:-translate-y-0.5 hover:shadow-lg
                  ${selectedCategory === 'Começar do zero' ? 'text-white' : ''}
                `}
                style={selectedCategory === 'Começar do zero' ?
                  { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)' } :
                  {}
                }
                onClick={() => setSelectedCategory('Começar do zero')}
              >
                <div className="flex items-center">
                  <img src={calendarioIcon} alt="Ícone de calendário" className="w-8 h-8 mr-6 flex-shrink-0"/>
                  <div className="flex-grow text-left">
                    <span className="block font-semibold">Começar do zero</span>
                    <span className="block text-sm">comece a praticar libras</span>
                  </div>
                </div>
              </button>
              <button
                key="Descubra seu nível"
                className={`
                  text-lg font-semibold py-6 px-12 border-none rounded-3xl cursor-pointer
                  bg-white shadow-md text-gray-700 text-left transition transform duration-200
                  hover:-translate-y-0.5 hover:shadow-lg
                  ${selectedCategory === 'Descubra seu nível' ? 'text-white' : ''}
                `}
                style={selectedCategory === 'Descubra seu nível' ?
                  { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)' } :
                  {}
                }
                onClick={() => setSelectedCategory('Descubra seu nível')}
              >
                <div className="flex items-center">
                  <img src={lupaIcon} alt="Ícone de lupa" className="w-8 h-8 mr-6 flex-shrink-0"/>
                  <div className="flex-grow text-left">
                    <span className="block font-semibold">Descubra seu nível</span>
                    <span className="block text-sm">descubra seu nível em libras</span>
                  </div>
                </div>
              </button>
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
