import React, { useState, useEffect } from 'react';
// Importa o hook useSettings para acessar o contexto do tema (claro/escuro)
import { useSettings } from './SettingsContext'; 

/**
 * Estrutura de dados para o alfabeto.
 * Cada letra contém:
 * - char: A letra (ex: 'A')
 * - imgSrc: O caminho para o PNG estático (usado nos cards)
 * - gifSrc: O caminho para o GIF animado (usado no modal)
 */
const alphabetData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
  char: letter,
  // O PNG estático da pasta 'alfabeto'
  imgSrc: new URL(`../assets/alfabeto/${letter.toLowerCase()}.png`, import.meta.url).href,
  // O GIF animado da pasta 'AlfabetoRespostas'
  gifSrc: new URL(`../assets/AlfabetoRespostas/${letter.toUpperCase()}.gif`, import.meta.url).href 
}));


/**
 * Componente: GifModal
 * Exibe um modal flutuante (overlay) com o GIF animado da letra selecionada.
 * Recebe a 'letter' (objeto), a função 'onClose' e o 'theme'.
 */
const GifModal = ({ letter, onClose, theme }) => (
  <div 
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    onClick={onClose} // Fecha o modal clicando no fundo
  >
    <div 
      className={`p-6 rounded-3xl border-2 ${theme === 'escuro' ? 'bg-gray-800 border-purple-600' : 'bg-white border-purple-400'}`}
      onClick={(e) => e.stopPropagation()} // Impede que o clique DENTRO do modal o feche
      style={{ boxShadow: '0 0 50px rgba(176, 129, 255, 0.6)' }} // Efeito de brilho
    >
      {/* A letra em destaque */}
      <h2 className={`text-6xl font-bold text-center mb-4 ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`}>
        {letter.char}
      </h2>
      {/* O GIF animado */}
      <img 
        src={letter.gifSrc} 
        alt={`Sinal animado para a letra ${letter.char}`} 
        className="w-64 h-64 object-contain rounded-2xl bg-white" // Fundo branco para garantir a visibilidade
      />
    </div>
  </div>
);


/**
 * Componente: LetterCard
 * Exibe o card individual de cada letra na grade.
 * Recebe a 'letter' (objeto) e a função 'onClick'.
 */
const LetterCard = ({ letter, onClick }) => (
    <div 
      onClick={() => onClick(letter)} // Ao clicar, chama a função passando os dados da letra
      className="flex flex-col items-center justify-center w-32 h-36 bg-[#D9D1FF] rounded-3xl border-b-8 border-[#B4A9E8] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      {/* Imagem estática (PNG) */}
      <img 
        src={letter.imgSrc} 
        alt={`Sinal para a letra ${letter.char}`} 
        className="w-20 h-20 object-contain"
      />
      {/* Texto da letra */}
      <span className="text-2xl font-bold text-[#8A7DC9] mt-1">
        {letter.char}
      </span>
    </div>
);


/**
 * Componente Principal: AlphabetContent
 * Renderiza a página completa do alfabeto, incluindo a grade de cards e o modal.
 */
export default function AlphabetContent() {
  // Estado para a animação de entrada da página
  const [animationClass, setAnimationClass] = useState('');
  
  // Estado para controlar qual letra está selecionada (e, portanto, qual modal abrir)
  // 'null' = modal fechado.
  const [selectedLetter, setSelectedLetter] = useState(null);
  
  // Puxa o tema atual (claro/escuro) do contexto
  const { theme } = useSettings(); 

  // Ativa a animação de entrada assim que o componente é montado
  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return (
    <>
      {/* Bloco de estilo para garantir a fonte Poppins. 
          (Idealmente, isso estaria no CSS global (index.css), mas ok) */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          * { box-sizing: border-box; }
      `}</style>
      
      <div className={`w-full content-box ${animationClass}`}>
          {/* Título da página (a cor muda com o tema) */}
          <h1 className={`text-4xl font-bold mb-12 font-poppins ${theme === 'escuro' ? 'text-purple-300' : 'text-[#8e6de3]'}`}>
              Alfabeto
          </h1>

          {/* Grade de letras */}
          <div className="flex flex-wrap justify-center gap-6">
              {/* Mapeia os dados do alfabeto para criar um LetterCard para cada letra */}
              {alphabetData.map(letter => (
                  <LetterCard 
                    key={letter.char} 
                    letter={letter} 
                    // Define a letra clicada como a 'selectedLetter', o que abre o modal
                    onClick={setSelectedLetter} 
                  />
              ))}
          </div>
      </div>

      {/* Renderização Condicional do Modal */}
      {/* O modal só é renderizado se 'selectedLetter' NÃO for 'null' */}
      {selectedLetter && (
        <GifModal 
          letter={selectedLetter} 
          // Para fechar o modal, ele seta 'selectedLetter' de volta para 'null'
          onClose={() => setSelectedLetter(null)} 
          theme={theme}
        />
      )}
    </>
  );
}