import React from 'react';

// Puxando as imagens que vou usar nessa seção
import GarotaNotebook from '../assets/GarotaNotebook.png';
import RoboPessoas from '../assets/RoboPessoas.png';
import LoginLogo from '../assets/LoginLogo.png';
// Removi as imports 'Brasil' e 'Lires' que não estavam sendo usadas no componente.

/**
 * Componente: HomeMid
 * Esta é a seção principal (conteúdo do meio) da landing page,
 * focada em apresentar o Lires e dar os botões de CTA (Call to Action).
 */
export default function HomeMid() {
  
  // Funções de placeholder para os botões. 
  // TODO: Ligar isso ao react-router (navigate)
  const handleNavigateRegister = () => {
    console.log("Navegando para a página de registro...");
    // navigate('/register');
  };
  
  const handleNavigateLogin = () => {
    console.log("Navegando para a página de login...");
    // navigate('/login');
  };

  return (
    // Container principal da seção. 
    // `flex-1` faz ele ocupar o espaço disponível no layout principal.
    <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">

      {/* --- Seção Hero (Principal) --- */}
      {/* Layout responsivo: 
        - Mobile (default): `flex-col` (stackado) e `text-center`
        - Desktop (`md:`): `flex-row` (lado a lado) e `text-left`
      */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl my-12 text-center md:text-left">
        
        {/* Imagem do mascote/logo */}
        <img 
          className='h-64 w-64 md:h-80 md:w-80' // Tamanho responsivo
          src={LoginLogo} 
          alt="Logo Lires com mascote" 
        />
        
        {/* Coluna de Texto e Botões CTA */}
        <div className='flex flex-col gap-5'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#9CD6C8] leading-tight'>
            Aprender libras ficou mais facil e divertido com a gente!
          </h1>
          
          {/* Botão Primário (CTA Principal) */}
          <button 
            onClick={handleNavigateRegister}
            className="text-xl px-9 py-2 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full w-full md:w-auto"
          >
            Começe Agora
          </button>
          
          {/* Botão Secundário (Login) */}
          <button 
            onClick={handleNavigateLogin}
            className="text-xl px-9 py-2 bg-white transition-all duration-300 text-[#F6B8FF] font-bold rounded-full border border-[#9CD6C8] w-full md:w-auto"
          >
            Já tenho uma conta
          </button>
        </div>
      </div>

      {/* --- Bloco 1: Feature "Acessível" --- */}
      {/* Layout padrão: (Texto | Imagem) no desktop, (Texto / Imagem) no mobile */}
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mt-16">
        <div className="flex-1">
            {/* Aumentei o título para 3xl para dar mais destaque */}
            <h2 className="text-3xl font-bold text-[#9CD6C8]">
                Acessível, Inclusivo e Transformador.
            </h2>
            {/* Aumentei o texto da fonte para 'text-lg' (18px) para legibilidade */}
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
      
      {/* --- Bloco 2: Feature "Conexão" --- */}
      {/* Layout invertido: (Imagem | Texto) no desktop, (Imagem / Texto) no mobile */}
      {/* A ordem no HTML (img primeiro) já garante o layout invertido naturalmente */}
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
      
      {/* --- Slogan Final --- */}
      <h3 className="mt-20 text-3xl font-bold text-[#9CD6C8] text-center">
        Aprenda libras <br /> com Lires
      </h3>
      
    </main>
  );
}