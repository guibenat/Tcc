import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';
import { comecarDoZeroLesson } from '../lessons/comecarDoZeroLesson.jsx';
// 1. IMPORTAR O 'useSettings'
import { useSettings } from '../components/SettingsContext';

// (Caminhos dos assets que já corrigimos)
import checkIconImg from '../assets/check-icon.png';
import diamondIconImg from '../assets/diamond-icon.png';
import lockIconImg from '../assets/locked-Achievement.png';

// --- COMPONENTE DO BLOCO DE LIÇÃO (MODIFICADO) ---
const LessonBlock = ({ status, progress, iconSrc, lessonId }) => {
    const navigate = useNavigate();
    const baseLayout = "rounded-3xl w-48 h-48 flex flex-col items-center justify-center p-4 transition-transform hover:-translate-y-2 border-b-8";
    
    let content;
    let colorStyles; 

    // 2. LÓGICA DE CLIQUE ATUALIZADA (PARA BLOQUEAR CONCLUÍDOS)
    const handleLessonClick = () => {
        // --- GOAL 1: Bloquear lições concluídas ---
        if (status === 'completed') {
            Swal.fire({
                title: 'Concluído!',
                text: 'Você já completou esta lição.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'font-poppins rounded-2xl',
                    title: 'text-slate-800',
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            });
            return; // Não faz mais nada
        }

        // Se não estiver concluído, a lógica antiga de navegação funciona
        if (lessonId) {
            navigate('/activity', { state: { lessonId: lessonId } }); 
            return;
        }
        
        // Alerta "Em Breve" para blocos sem lessonId
        if (status === 'in-progress' || status === 'locked') {
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

    // --- Lógica de Estilo (Atualizada para usar 'status') ---
    switch (status) {
        case 'completed':
            content = <img src={checkIconImg} alt="Concluído" className="w-20 h-20" />;
            colorStyles = "bg-purple-500 border-purple-700 cursor-pointer"; // Ainda é clicável (para o alerta)
            break;
        case 'in-progress':
            content = iconSrc ? 
                <img src={iconSrc} alt="Ícone" className="w-20 h-20" /> : 
                <span className="font-bold text-4xl text-[#A195E1]">{progress}</span>;
            colorStyles = "bg-[#E9E4FF] border-[#C6BFF7] cursor-pointer";
            break;
        case 'locked':
        default:
            content = <span className="font-bold text-4xl text-[#A195E1]">{progress}</span>;
            colorStyles = "bg-[#E9E4FF] border-[#C6BFF7] opacity-60 cursor-not-allowed";
            break;
    }
    
    return <div onClick={handleLessonClick} className={`${baseLayout} ${colorStyles}`}>{content}</div>;
};

// --- COMPONENTE DO TÍTULO DA SEÇÃO (Sem alteração) ---
const SectionTitle = ({ children }) => (
    <div className="relative my-10 flex justify-center items-center">
        <div className="absolute w-full h-0.5 bg-slate-200"></div>
        <h2 className="relative bg-gradient-to-r from-indigo-300 to-purple-400 text-white font-bold py-4 px-12 sm:px-16 rounded-full text-xl sm:text-2xl text-center shadow-2xl shadow-purple-600/40 z-10">
            {children}
        </h2>
    </div>
);


// --- COMPONENTE PRINCIPAL (MODIFICADO) ---
export default function MainContent() {
  
  // 3. PEGAR O PROGRESSO DO CONTEXTO
  const { completedLessons } = useSettings();
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []);

  // --- 4. TORNAR 'lessonsData' DINÂMICO ---
  
  // Primeiro, definimos a estrutura do capítulo
  // (Estamos assumindo 4 lições para o "Primeiros passos", onde só a 1ª existe)
  const chapter1Lessons = [
    'comecar-do-zero', // O ID da sua primeira lição
    'pp-lesson-2',     // ID de uma lição futura
    'pp-lesson-3',     // ID de uma lição futura
    'pp-lesson-4'      // ID de uma lição futura
  ];

  // Calculamos quantas foram concluídas
  const chapter1CompletedCount = chapter1Lessons.filter(
    id => completedLessons[id] === true
  ).length;

  // Criamos o string de progresso (ex: "1/4")
  const chapter1Progress = `${chapter1CompletedCount}/${chapter1Lessons.length}`;

  // Verificamos o status da lição 1
  const isLesson1Complete = completedLessons['comecar-do-zero'] === true;

  // (No futuro, você desbloquearia a lição 2 aqui)
  // const isLesson2Locked = !isLesson1Complete; 

  // Agora, construímos o array de dados dinamicamente
  const lessonsData = [
    {
        title: 'Primeiros passos',
        blocks: [
            // Bloco 1: A Lição "Começar do Zero"
            { 
              status: isLesson1Complete ? 'completed' : 'in-progress', 
              lessonId: 'comecar-do-zero' 
            },
            
            // Bloco 2: O "Diamond Icon" (GOAL 2)
            { 
              status: 'in-progress', // Este bloco está sempre ativo
              progress: chapter1Progress, // Exibe "1/4"
              icon: diamondIconImg 
            },

            // Bloco 3: A Próxima Lição (ainda bloqueada)
            { 
              status: 'locked', 
              progress: '0/4',
              // lessonId: 'pp-lesson-2' // Você adicionaria isso quando a lição 2 existir
            }
        ]
    },
    // (Outros capítulos permanecem bloqueados por enquanto)
    { title: 'Alfabeto Manual', blocks: [ { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' } ] },
    { title: 'Saudações e Cumprimentos', blocks: [ { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' }, { status: 'locked', progress: '0/4' } ] },
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
              <div className="grid grid-cols-1 gap-8 justify-items-center">
                  {section.blocks.map((block, blockIndex) => (
                      <LessonBlock 
                          key={blockIndex}
                          status={block.status}
                          progress={block.progress}
                          iconSrc={block.icon}
                          lessonId={block.lessonId}
                      />
                  ))}
              </div>
          </section>
        ))}

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