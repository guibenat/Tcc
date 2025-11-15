import React, { useState, useEffect } from 'react';
// 1. Importar o useSettings para o tema
import { useSettings } from './SettingsContext'; 

// --- DADOS DO ALFABETO ---
// 2. ATUALIZADO: Agora inclui 'gifSrc' que aponta para a pasta AlfabetoRespostas
const alphabetData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
  char: letter,
  // O 'imgSrc' (PNG) para o card estático (da pasta 'alfabeto')
  imgSrc: new URL(`../assets/alfabeto/${letter.toLowerCase()}.png`, import.meta.url).href,
  // O 'gifSrc' (GIF) para o modal (da pasta 'AlfabetoRespostas')
  gifSrc: new URL(`../assets/AlfabetoRespostas/${letter.toUpperCase()}.gif`, import.meta.url).href 
}));


// --- 3. NOVO COMPONENTE: MODAL DO GIF ---
const GifModal = ({ letter, onClose, theme }) => (
  <div 
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    onClick={onClose} // Fecha ao clicar fora
  >
    <div 
      className={`p-6 rounded-3xl border-2 ${theme === 'escuro' ? 'bg-gray-800 border-purple-600' : 'bg-white border-purple-400'}`}
      onClick={(e) => e.stopPropagation()} // Impede que clicar no modal o feche
      style={{ boxShadow: '0 0 50px rgba(176, 129, 255, 0.6)' }}
    >
      <h2 className={`text-6xl font-bold text-center mb-4 ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`}>
        {letter.char}
      </h2>
      <img 
        src={letter.gifSrc} // Mostra o GIF
        alt={`Sinal animado para a letra ${letter.char}`} 
        className="w-64 h-64 object-contain rounded-2xl bg-white" // Fundo branco para o GIF
      />
    </div>
  </div>
);


// --- 4. COMPONENTE DO CARD (Atualizado com onClick) ---
const LetterCard = ({ letter, onClick }) => (
    <div 
      onClick={() => onClick(letter)} // Adicionado onClick
      className="flex flex-col items-center justify-center w-32 h-36 bg-[#D9D1FF] rounded-3xl border-b-8 border-[#B4A9E8] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
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


// --- CONTEÚDO PRINCIPAL DA PÁGINA (Atualizado com State) ---
export default function AlphabetContent() {
  const [animationClass, setAnimationClass] = useState('');
  
  // --- 5. ADICIONADO STATE PARA O MODAL ---
  const [selectedLetter, setSelectedLetter] = useState(null);
  const { theme } = useSettings(); // Puxa o tema

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
      
      <div className={`w-full content-box ${animationClass}`}>
          {/* Cor do título agora reage ao tema */}
          <h1 className={`text-4xl font-bold mb-12 font-poppins ${theme === 'escuro' ? 'text-purple-300' : 'text-[#8e6de3]'}`}>
              Alfabeto
          </h1>

          <div className="flex flex-wrap justify-center gap-6">
              {alphabetData.map(letter => (
                  <LetterCard 
                    key={letter.char} 
                    letter={letter} 
                    onClick={setSelectedLetter} // Passa a função de "abrir modal"
                  />
              ))}
          </div>
      </div>

      {/* --- 6. RENDERIZA O MODAL (se uma letra for selecionada) --- */}
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