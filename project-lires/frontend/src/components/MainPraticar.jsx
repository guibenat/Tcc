import React from 'react';
// Imports das imagens
import Robo from '../assets/RoboMascoteRosa.png';
import DedoAP from '../assets/DedoApontando.png';
// TODO: Adicionar o useNavigate para os botões funcionarem
// import { useNavigate } from 'react-router-dom';

/**
 * Componente: MainPraticar
 * Esta é a tela principal da aba "Praticar".
 * Ela foi refatorada para ser responsiva e usar classes do Tailwind de forma mais limpa.
 */
export default function MainPraticar() {
  // const navigate = useNavigate(); // Descomentar quando for ligar os botões

  // Funções de placeholder para os botões
  const handleRelembreClick = () => {
    console.log("Clicou em Relembre");
    // navigate('/praticar/relembrar'); // Exemplo
  };

  const handleAlfabetoClick = () => {
    console.log("Clicou em Alfabeto");
    // navigate('/alfabeto'); // Exemplo
  };

  const handleVlibrasClick = () => {
    console.log("Clicou em VLibras");
    // navigate('/vlibras'); // Exemplo
  };

  return (
    // Container principal: 
    // - 'flex-1' para ocupar o espaço disponível.
    // - 'p-8' para espaçamento interno.
    // - Removi o 'min-h-full', pois o layout flex pai já deve cuidar disso.
    <main className="flex-1 flex flex-col items-center p-4 md:p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">
      
      {/* Container dos cards. 
        - 'w-full' e 'max-w-4xl' controlam a largura máxima.
        - 'gap-8' ou 'gap-12' para espaçar os blocos.
      */}
      <div className="flex flex-col items-center w-full max-w-4xl gap-12">
            
        {/* Bloco do robô (Relembre) */}
        {/* Responsivo:
          - Mobile (default): 'flex-col' (empilhado)
          - Desktop ('md:'): 'flex-row-reverse' (lado-a-lado, imagem à direita)
        */}
        <header className="flex flex-col md:flex-row-reverse items-center justify-between bg-gradient-to-b from-pink-300 to-purple-400 rounded-2xl p-6 w-full shadow-lg">
          
          {/* Imagem do Robô */}
          <img 
            src={Robo} 
            alt='Mascote Lires' 
            // Tamanho responsivo e 'object-contain' para não distorcer
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
          {/* Texto do botão (responsivo).
            - 'order-1' (default) coloca o texto primeiro no mobile.
            - 'md:order-2' coloca o texto em segundo no desktop.
            (Isso é um truque se você quisesse a imagem à esquerda no desktop)
            Mas vamos manter simples: Texto à esquerda, imagem à direita.
          */}
          <h2 className='text-white font-bold text-3xl md:text-5xl'>Alfabeto</h2>
          
          <img 
            src={DedoAP} 
            alt='Ícone de dedo apontando' 
            // Tamanho fixo e responsivo para o ícone
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