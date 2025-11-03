import React, { useState, useEffect } from 'react'; // Importar useState e useEffect
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// --- Placeholders para as imagens ---
const checkIconImg = '../src/assets/check-icon.png';
const diamondIconImg = '../src/assets/diamond-icon.png';
const lockIconImg = '../src/assets/locked-Achievement.png';

// Componente reutilizável para os blocos de lição
const LessonBlock = ({ status, progress, iconSrc }) => {
    const baseLayout = "rounded-3xl w-48 h-48 flex flex-col items-center justify-center p-4 transition-transform hover:-translate-y-2 cursor-pointer border-b-8";
    
    let content;
    let colorStyles; 

    const handleLessonClick = () => {
        if (status === 'in-progress') {
            Swal.fire({
                title: 'Em Breve!',
                text: "Esta funcionalidade ainda não foi implementada.",
                icon: 'info',
                confirmButtonText: 'Entendi',
                customClass: {
                    popup: 'font-poppins rounded-2xl',
                    title: 'text-slate-800',
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            });
        }
    };

    switch (status) {
        case 'completed':
            content = <img src={checkIconImg} alt="Concluído" className="w-20 h-20" />;
            colorStyles = "bg-purple-500 border-purple-700";
            break;
        case 'in-progress':
            content = <span className="font-bold text-4xl text-[#A195E1]">{progress}</span>;
            colorStyles = "bg-[#E9E4FF] border-[#C6BFF7]";
            break;
        case 'locked':
        default:
            content = <span className="font-bold text-4xl text-[#A195E1]">{progress}</span>;
            colorStyles = "bg-[#E9E4FF] border-[#C6BFF7] opacity-60 cursor-not-allowed";
            break;
    }
    
    return <div onClick={handleLessonClick} className={`${baseLayout} ${colorStyles}`}>{content}</div>;
};

// Componente para o título da seção
const SectionTitle = ({ children }) => (
    <div className="relative my-10 flex justify-center items-center">
        <div className="absolute w-full h-0.5 bg-slate-200"></div>
        <h2 className="relative bg-gradient-to-r from-indigo-300 to-purple-400 text-white font-bold py-4 px-12 sm:px-16 rounded-full text-xl sm:text-2xl text-center shadow-2xl shadow-purple-600/40 z-10">
            {children}
        </h2>
    </div>
);

// A lista completa de lições
const lessonsData = [
    {
        title: 'Primeiros passos',
        blocks: [
            { status: 'completed' },
            { status: 'in-progress', progress: '0/4', icon: diamondIconImg },
            { status: 'locked', progress: '0/4' }
        ]
    },
    { title: 'Alfabeto Manual', blocks: [ { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' } ] },
    { title: 'Saudações e Cumprimentos', blocks: [ { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' } ] },
    { title: 'Números e Quantidades', blocks: [ { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' } ] },
    { title: 'Família e Pessoas', blocks: [ { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' } ] }
];

export default function MainContent() {
  
  // Adicionado estado para a classe de animação
  const [animationClass, setAnimationClass] = useState('');

  // Adicionado useEffect para aplicar a classe na montagem
  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []); // Array vazio garante que rode apenas uma vez

  return (
    <>
      <style>{`
        .btn-gradient-glow {
          background-image: linear-gradient(90deg, #b081ff, #59b1ff);
          box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient-animation 15s ease infinite;
        }
      `}</style>

      {/* Aplicar as classes 'content-box' e a classe de animação */}
      <main className={`px-4 sm:px-8 content-box ${animationClass}`}>
        {/* Welcome Banner */}
        <div 
          className="p-8 rounded-2xl text-white mb-12 relative h-40 flex flex-col justify-center shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient"
        >
          <h1 className="text-3xl md:text-4xl font-bold" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Bem vindo a experiência Lires</h1>
          <p className="text-md md:text-lg" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Se divirta aprendendo!</p>
        </div>

        {/* Renderiza as seções de lições na grade */}
        {lessonsData.map((section, index) => (
          <section key={index}>
              <SectionTitle>{section.title}</SectionTitle>
              {/* ALTERADO: Grade de volta para 'grid-cols-1' */}
              <div className="grid grid-cols-1 gap-8 justify-items-center">
                  {section.blocks.map((block, blockIndex) => (
                      <LessonBlock 
                          key={blockIndex}
                          status={block.status}
                          progress={block.progress}
                          iconSrc={block.icon}
                      />
                  ))}
              </div>
          </section>
        ))}

        {/* Seção "Nível 2 Bloqueado" no final da página */}
        <section>
          <SectionTitle>Nível 2</SectionTitle>
          <div className="flex flex-col items-center justify-center p-10 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300">
              <img src={lockIconImg} alt="Cadeado" className="w-20 h-20 mb-4 opacity-40" />
              <h3 className="text-3xl font-bold text-slate-400">BLOQUEADO</h3>
          </div>
        </section>
      </main>
    </>
  );
}