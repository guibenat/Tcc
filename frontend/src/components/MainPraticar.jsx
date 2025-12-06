import React from 'react';
import Robo from '../assets/RoboMascoteRosa.png';
import DedoAP from '../assets/DedoApontando.png';

export default function MainPraticar() {

  const handleRelembreClick = () => {
    console.log("Clicou em Relembre");
  };

  const handleAlfabetoClick = () => {
    console.log("Clicou em Alfabeto");
  };

  const handleVlibrasClick = () => {
    console.log("Clicou em VLibras");
  };

  return (
    // Container principal: 
    <main className="flex-1 flex flex-col items-center p-4 md:p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">
      
      <div className="flex flex-col items-center w-full max-w-4xl gap-12">
        <header className="flex flex-col md:flex-row-reverse items-center justify-between bg-gradient-to-b from-pink-300 to-purple-400 rounded-2xl p-6 w-full shadow-lg">
          
          {/* Imagem do Robô */}
          <img 
            src={Robo} 
            alt='Mascote Lires' 
            className="w-48 h-48 md:w-64 md:h-64 object-contain flex-shrink-0" 
          />
          
          {/* Conteúdo de Texto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left p-4">
            {/* Texto responsivo */}
            <h2 className="text-white font-bold text-3xl md:text-5xl">
              Veja o que você <br /> Aprendeu hoje
            </h2>
            <button 
              onClick={handleRelembreClick}
              className="mt-6 px-12 py-3 bg-purple-300 text-white font-semibold rounded-full shadow hover:bg-purple-400 transition text-lg"
            >
              Relembre
            </button>
          </div>
        </header>
        
        {/* Botão "Alfabeto" */}
        <button 
          onClick={handleAlfabetoClick}
          className='w-full p-6 bg-purple-300 text-white font-semibold rounded-2xl shadow hover:bg-purple-400 transition flex flex-row items-center justify-between'
        >
          <h2 className='text-white font-bold text-3xl md:text-5xl'>Alfabeto</h2>
          
          <img 
            src={DedoAP} 
            alt='Ícone de dedo apontando' 
            className='w-16 h-16 md:w-20 md:h-20 object-contain'
          />
        </button>
  
        {/* Botão "Vlibras" */}
        <button 
          onClick={handleVlibrasClick}
          className='w-full p-6 bg-purple-300 text-white font-semibold rounded-2xl shadow hover:bg-purple-400 transition flex flex-row items-center justify-between'
        >
          <h2 className='text-white font-bold text-3xl md:text-5xl'>VLibras</h2>
          
          <img 
            src={DedoAP} 
            alt='Ícone de dedo apontando' 
            className='w-16 h-16 md:w-20 md:h-20 object-contain'
          />
        </button>
          
      </div>
    </main>
  );
}