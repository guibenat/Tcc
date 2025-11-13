import React, { useState, useEffect } from 'react'; // 1. Importar useState e useEffect

// --- DADOS DO ALFABETO ---
// MODIFICAÇÃO: Usando 'new URL(..., import.meta.url)'
// Isto diz ao Vite para encontrar e processar corretamente cada imagem
const alphabetData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
  char: letter,
  imgSrc: new URL(`../assets/alfabeto/${letter.toLowerCase()}.png`, import.meta.url).href
}));


// --- COMPONENTE PARA CADA LETRA ---
// MODIFICAÇÃO: Cores escurecidas para melhor contraste
const LetterCard = ({ letter }) => (
    <div className="flex flex-col items-center justify-center w-32 h-36 bg-[#D9D1FF] rounded-3xl border-b-8 border-[#B4A9E8] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
        <img 
          src={letter.imgSrc} 
          alt={`Sinal para a letra ${letter.char}`} 
          className="w-20 h-20 object-contain"
        />
        <span className="text-2xl font-bold text-[#8A7DC9] mt-1">
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