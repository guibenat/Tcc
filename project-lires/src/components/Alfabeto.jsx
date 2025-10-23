import React, { useState, useEffect } from 'react'; // 1. Importar useState e useEffect

// --- DADOS DO ALFABETO ---
const alphabetData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
  char: letter,
  imgSrc: `../assets/libras-gifs/${letter.toLowerCase()}.gif`
}));


// --- COMPONENTE PARA CADA LETRA ---
const LetterCard = ({ letter }) => (
    <div className="flex flex-col items-center justify-center w-32 h-36 bg-[#E9E4FF] rounded-3xl border-b-8 border-[#C6BFF7] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
        <img 
          src={letter.imgSrc} 
          alt={`Sinal para a letra ${letter.char}`} 
          className="w-20 h-20 object-contain"
        />
        <span className="text-2xl font-bold text-[#A195E1] mt-1">
          {letter.char}
        </span>
    </div>
);


// --- CONTEÚDO PRINCIPAL DA PÁGINA ---
export default function AlphabetContent() {
  // 2. Adicionar estado para a classe de animação
  const [animationClass, setAnimationClass] = useState('');

  // 3. Adicionar useEffect para aplicar a classe na montagem
  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []); // Array vazio garante que rode apenas uma vez

  return (
    <>
      {/* O <style> pode ser removido se a fonte já é global */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          * { box-sizing: border-box; }
      `}</style>
      
      {/* 4. Aplicar a classe de animação e 'content-box' ao container principal */}
      <div className={`w-full content-box ${animationClass}`}>
          <h1 className="text-4xl font-bold text-[#8e6de3] mb-12 font-poppins">
              Alfabeto
          </h1>

          <div className="flex flex-wrap justify-center gap-6">
              {alphabetData.map(letter => (
                  <LetterCard key={letter.char} letter={letter} />
              ))}
          </div>
      </div>
    </>
  );
}