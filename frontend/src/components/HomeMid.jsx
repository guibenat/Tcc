import React from 'react';
import GarotaNotebook from '../assets/GarotaNotebook.png';
import RoboPessoas from '../assets/RoboPessoas.png';
import LoginLogo from '../assets/LoginLogo.png';

// HomeMid

export default function HomeMid() {

  const handleNavigateRegister = () => {
    console.log("Navegando para a página de registro...");
  };
  
  const handleNavigateLogin = () => {
    console.log("Navegando para a página de login...");
  };

  return (
    // Container principal da seção. 
    <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">

      {/* Seção Principal */}
      {/* Layout responsivo: */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl my-12 text-center md:text-left">
        
        {/* Imagem do mascote/logo */}
        <img 
          className='h-64 w-64 md:h-80 md:w-80' 
          src={LoginLogo} 
          alt="Logo Lires com mascote" 
        />
        
        {/* Coluna de Texto */}
        <div className='flex flex-col gap-5'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#9CD6C8] leading-tight'>
            Aprender libras ficou mais facil e divertido com a gente!
          </h1>
          
          {/* Botão Primário */}
          <button 
            onClick={handleNavigateRegister}
            className="text-xl px-9 py-2 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full w-full md:w-auto"
          >
            Começe Agora
          </button>
          
          {/* Botão Secundário */}
          <button 
            onClick={handleNavigateLogin}
            className="text-xl px-9 py-2 bg-white transition-all duration-300 text-[#F6B8FF] font-bold rounded-full border border-[#9CD6C8] w-full md:w-auto"
          >
            Já tenho uma conta
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mt-16">
        <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#9CD6C8]">
                Acessível, Inclusivo e Transformador.
            </h2>
            <p className="mt-4 text-pink-400 font-medium text-lg">
                Aprender Libras com o Lires abre um mundo de comunicação e conexão! 
                Com aulas claras e interativas, você descobre como construir pontes 
                e promover a verdadeira inclusão. Comece sua jornada transformadora hoje mesmo!
            </p>
        </div>
        <img 
            src={RoboPessoas} 
            alt="Robô com pessoas" 
            className="rounded-lg w-full md:w-80"
        />
      </div>
  
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mt-16">
        <img 
            src={GarotaNotebook} 
            alt="Garota usando notebook" 
            className="rounded-lg w-full md:w-80"
        />
        <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#9CD6C8]">
                Mantenha a conexão
            </h2>
            <p className="mt-4 text-pink-400 font-medium text-lg">
                É simples criar o hábito de se comunicar em Libras com recursos visuais claros, 
                atividades interativas e a inspiração da nossa comunidade de aprendizes no Lires.
            </p>
        </div>
      </div>
      
      {/* Slogan Final */}
      <h3 className="mt-20 text-3xl font-bold text-[#9CD6C8] text-center">
        Aprenda libras <br /> com Lires
      </h3>
      
    </main>
  );
}