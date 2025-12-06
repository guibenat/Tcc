import React, { useState, useEffect } from 'react';
import { useSettings } from './SettingsContext'; 


const alphabetData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
  char: letter,
  // O png estático 
  imgSrc: new URL(`../assets/alfabeto/${letter.toLowerCase()}.png`, import.meta.url).href,
  // O gif animado 
  gifSrc: new URL(`../assets/AlfabetoRespostas/${letter.toUpperCase()}.gif`, import.meta.url).href 
}));



//aqui vai exibir o modal com o gif
const GifModal = ({ letter, onClose, theme }) => (
  <div 
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    onClick={onClose} 
  >
    <div 
      className={`p-6 rounded-3xl border-2 ${theme === 'escuro' ? 'bg-gray-800 border-purple-600' : 'bg-white border-purple-400'}`}
      onClick={(e) => e.stopPropagation()} 
      style={{ boxShadow: '0 0 50px rgba(176, 129, 255, 0.6)' }} // Efeito de brilho
    >
      {/* letra em destaque */}
      <h2 className={`text-6xl font-bold text-center mb-4 ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`}>
        {letter.char}
      </h2>
      {/* o gif animado */}
      <img 
        src={letter.gifSrc} 
        alt={`Sinal animado para a letra ${letter.char}`} 
        className="w-64 h-64 object-contain rounded-2xl bg-white" //fundo branco
      />
    </div>
  </div>
);


//aqui vai exibir o card individual de cada letra na grade
const LetterCard = ({ letter, onClick }) => (
    <div 
      onClick={() => onClick(letter)} 
      className="flex flex-col items-center justify-center w-32 h-36 bg-[#D9D1FF] rounded-3xl border-b-8 border-[#B4A9E8] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      {/* imagem estática */}
      <img 
        src={letter.imgSrc} 
        alt={`Sinal para a letra ${letter.char}`} 
        className="w-20 h-20 object-contain"
      />
      {/* texto da letra */}
      <span className="text-2xl font-bold text-[#8A7DC9] mt-1">
        {letter.char}
      </span>
    </div>
);



export default function AlphabetContent() {
  // Estado para a animação de entrada da página
  const [animationClass, setAnimationClass] = useState('');
  
  // Estado para controlar qual letra está selecionada
  const [selectedLetter, setSelectedLetter] = useState(null);
  
  // Puxa o tema atual 
  const { theme } = useSettings(); 

  // Ativa a animação de entrada 
  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []); 

  return (
    <>
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          * { box-sizing: border-box; }
      `}</style>
      
      <div className={`w-full content-box ${animationClass}`}>
          {/* título da página */}
          <h1 className={`text-4xl font-bold mb-12 font-poppins ${theme === 'escuro' ? 'text-purple-300' : 'text-[#8e6de3]'}`}>
              Alfabeto
          </h1>

          {/* grade de letras */}
          <div className="flex flex-wrap justify-center gap-6">
              {/* Mapeia os dados do alfabeto para criar um LetterCard para cada letra */}
              {alphabetData.map(letter => (
                  <LetterCard 
                    key={letter.char} 
                    letter={letter} 
                    onClick={setSelectedLetter} 
                  />
              ))}
          </div>
      </div>

      {/* Renderização Condicional do Modal */}
      {selectedLetter && (
        <GifModal 
          letter={selectedLetter} 
          onClose={() => setSelectedLetter(null)} 
          theme={theme}
        />
      )}
    </>
  );
}