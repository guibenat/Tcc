import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';

// --- MUDANÇA 1: Importar o mapa de lições e o contexto ---
import { lessonMap } from '../lessons/lessonMap'; // Importa o novo mapa de lições
import { useSettings } from './SettingsContext'; // Importa o contexto

// (Caminhos dos assets originais)
import checkIconImg from '../assets/check-icon.png';
import diamondIconImg from '../assets/coroa.png';
import lockIconImg from '../assets/locked-Achievement.png';

// --- COMPONENTE DO BLOCO DE LIÇÃO (MODIFICADO) ---
// Adicionamos 'isUnlocked' para saber se o bloco está clicável
const LessonBlock = ({ status, progress, iconSrc, lessonId, isUnlocked }) => {
    const navigate = useNavigate();
    const { theme } = useSettings(); // Pega o tema para o popup
    const baseLayout = "rounded-3xl w-48 h-48 flex flex-col items-center justify-center p-4 transition-transform border-b-8";
    
    let content;
    let colorStyles; 

    const handleLessonClick = () => {
        // --- MUDANÇA 2: Lógica de clique atualizada ---

        // 1. Verifica se está bloqueado (e não foi concluído)
        if (!isUnlocked && status !== 'completed') {
            Swal.fire({
                title: 'Bloqueado!',
                text: 'Complete as lições anteriores para desbloquear.',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                    title: `${theme === 'escuro' ? 'text-purple-300' : 'text-slate-800'}`,
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            });
            return;
        }

        // 2. Verifica se já está concluído
        if (status === 'completed') {
            Swal.fire({
                title: 'Concluído!',
                text: 'Você já completou esta lição.',
                icon: 'success',
                confirmButtonText: 'OK',
            	 customClass: {
                	 popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                	 title: `${theme === 'escuro' ? 'text-purple-300' : 'text-slate-800'}`,
                	 confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
            	 }
            });
            return; 
        }

        // 3. Se tiver um ID de lição, navega para a lição
        if (lessonId) {
            // Navega para a URL com parâmetro, ex: /lesson/comecar-do-zero
            navigate(`/lesson/${lessonId}`); 
            return;
        }
        
        // 4. Se for clicável mas não tiver ID (ex: o diamante), mostra o progresso
        if (status === 'in-progress') {
            Swal.fire({
                title: 'Progresso do Capítulo',
                text: `Você completou ${progress} passos neste capítulo.`,
                icon: 'info',
                confirmButtonText: 'Entendi',
            	 customClass: {
                	 popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-700 text-slate-200' : ''}`,
                	 title: `${theme === 'escuro' ? 'text-purple-300' : 'text-slate-800'}`,
                	 confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
            	 }
            });
        }
    };

    // --- Lógica de Estilo (Atualizada para usar 'status' e 'theme') ---
    switch (status) {
        case 'completed':
            content = <img src={checkIconImg} alt="Concluído" className="w-20 h-20" />;
            colorStyles = `bg-purple-500 border-purple-700 ${theme === 'escuro' ? 'bg-purple-800 border-purple-600' : ''} cursor-pointer`;
            break;
        case 'in-progress':
            content = iconSrc ? 
                <img src={iconSrc} alt="Ícone" className="w-20 h-20" /> : 
                <span className={`font-bold text-4xl ${theme === 'escuro' ? 'text-purple-300' : 'text-[#A195E1]'}`}>{progress}</span>;
            colorStyles = `bg-[#E9E4FF] border-[#C6BFF7] ${theme === 'escuro' ? 'bg-gray-800 border-purple-700' : ''} cursor-pointer`;
            break;
        case 'locked':
        default:
            content = <img src={lockIconImg} alt="Cadeado" className="w-20 h-20 opacity-60" />;
            colorStyles = `bg-[#E9E4FF] border-[#C6BFF7] ${theme === 'escuro' ? 'bg-gray-700 border-gray-600' : ''} opacity-60 cursor-not-allowed`;
            break;
    }
    
    // Adiciona o estilo de hover apenas se for clicável
    const finalClasses = `${baseLayout} ${colorStyles} ${isUnlocked ? 'hover:-translate-y-2' : ''}`;
    return <div onClick={handleLessonClick} className={finalClasses}>{content}</div>;
};

// --- COMPONENTE DO TÍTULO DA SEÇÃO (Atualizado com 'theme') ---
const SectionTitle = ({ children }) => {
    const { theme } = useSettings();
    return (
        <div className="relative my-10 flex justify-center items-center">
            <div className={`absolute w-full h-0.5 ${theme === 'escuro' ? 'bg-gray-700' : 'bg-slate-200'}`}></div>
      	     <h2 className="relative bg-gradient-to-r from-indigo-300 to-purple-400 text-white font-bold py-4 px-12 sm:px-16 rounded-full text-xl sm:text-2xl text-center shadow-2xl shadow-purple-600/40 z-10">
            	   {children}
            </h2>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL (MODIFICADO) ---
export default function MainContent() {
  
  const { lessonProgress, theme } = useSettings(); 
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []);
  
  // --- LÓGICA DE DEFINIR AS LIÇÕES E SEU STATUS (DINÂMICA) ---
  
  // 1. Pega todas as lições da Unidade 1 (do lessonMap.js)
  const chapter1Lessons = lessonMap.filter(lesson => lesson.unit === 1);

  // 2. Calcula o progresso total para o "bloco de diamante"
  const chapter1TotalSteps = chapter1Lessons.reduce((acc, lesson) => acc + lesson.totalSteps, 0);
  const chapter1CompletedSteps = chapter1Lessons.reduce((acc, lesson) => {
    return acc + (lessonProgress[lesson.id]?.completed || 0);
  }, 0);
  const chapter1ProgressString = `${chapter1CompletedSteps}/${chapter1TotalSteps}`;

  // 3. Constrói os blocos para o "Primeiros passos"
  let previousLessonWasCompleted = true; // A primeira lição está sempre desbloqueada
  const chapter1Blocks = chapter1Lessons.map(lesson => {
    const prog = lessonProgress[lesson.id];
    const isLessonCompleted = prog?.completed === lesson.totalSteps;
    const isUnlocked = previousLessonWasCompleted;

    // Prepara para o próximo loop: A próxima lição só estará desbloqueada se esta estiver completa
    previousLessonWasCompleted = isLessonCompleted; 

    // Se for um "checkpoint" (coroa), usa o ícone
    const icon = lesson.isCheckpoint ? diamondIconImg : null; // (Seu original usava o diamante para "checkpoint")
    
    return {
      status: isLessonCompleted ? 'completed' : (isUnlocked ? 'in-progress' : 'locked'),
      progress: `${prog?.completed || 0}/${lesson.totalSteps}`, 
      lessonId: lesson.id,
      isUnlocked: isUnlocked,
      icon: isLessonCompleted ? null : icon, 
    };
  });
  
  // 4. Adiciona o Bloco de Diamante (progresso geral)
  chapter1Blocks.push({ 
    status: (chapter1CompletedSteps === chapter1TotalSteps) ? 'completed' : 'in-progress',
    progress: chapter1ProgressString, 
    icon: diamondIconImg, 
    isUnlocked: true // O diamante está sempre "clicável" para mostrar o progresso
  });
  
  // Agora, construímos o array de dados final
  const lessonsData = [
    {
        title: 'Primeiros passos',
        blocks: chapter1Blocks
    },
    // (Outros capítulos permanecem bloqueados, como no seu original)
    { 
      title: 'Alfabeto Manual', 
      blocks: [ 
        { status: 'locked', progress: '0/4', isUnlocked: false }, 
        { status: 'locked', progress: '0/4', isUnlocked: false }, 
        { status: 'locked', progress: '0/4', isUnlocked: false } 
      ] 
    },
    { 
      title: 'Saudações e Cumprimentos', 
      blocks: [ 
        { status: 'locked', progress: '0/4', isUnlocked: false }, 
        { status: 'locked', progress: '0/4', isUnlocked: false }, 
        { status: 'locked', progress: '0/4', isUnlocked: false } 
      ] 
    },
  ];
  // --- FIM DA SEÇÃO DINÂMICA ---


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
        .content-box.anim-enter {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 800ms ease, transform 800ms ease;
        }
        .content-box {
            opacity: 0;
            transform: translateY(20px);
        }
      `}</style>

      <main className={`px-4 sm:px-8 content-box ${animationClass}`}>
        <div 
          className="p-8 rounded-2xl text-white mb-12 relative h-40 flex flex-col justify-center shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient"
        >
          <h1 className="text-3xl md:text-4xl font-bold" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Bem vindo a experiência Lires</h1>
          <p className="text-md md:text-lg" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Se divirta aprendendo!</p>
      	</div>

    	 	{/* O 'map' agora usa o 'lessonsData' dinâmico */}
      	{lessonsData.map((section, index) => (
        	<section key={index}>
          	<SectionTitle>{section.title}</SectionTitle>
          	
          	{/* --- MUDANÇA 5: CORREÇÃO DO LAYOUT --- */}
          	{/* Voltamos para 'grid-cols-1' como no seu original */}
      	 	<div className="grid grid-cols-1 gap-8 justify-items-center">
          	 	{section.blocks.map((block, blockIndex) => (
            	 	<LessonBlock 
              	 	key={blockIndex}
              	 	status={block.status}
              	 	progress={block.progress}
s               	iconSrc={block.icon}
              		lessonId={block.lessonId}
            	 		isUnlocked={block.isUnlocked} // Passa o status de desbloqueio
            	 	/>
            	))}
      	 		</div>
      	 	</section>
    	))}

    	 	<section>
    	 		<SectionTitle>Nível 2</SectionTitle>
      	 	<div className={`flex flex-col items-center justify-center p-10 rounded-3xl border-2 border-dashed ${theme === 'escuro' ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-300'}`}>
        	 		<img src={lockIconImg} alt="Cadeado" className="w-20 h-20 mb-4 opacity-40" />
        	 		<h3 className={`text-3xl font-bold ${theme === 'escuro' ? 'text-gray-600' : 'text-slate-400'}`}>BLOQUEADO</h3>
    	 		</div>
    	 	</section>
  	 	</main>
  	</>
  );
}