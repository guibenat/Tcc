// CAMINHO: src/lessons/comecarDoZeroLesson.jsx
import React from 'react';
// Importa os componentes de UI reutilizáveis (CAMINHO CORRIGIDO)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI'; 

// --- 1. IMPORTAR ASSETS DE VÍDEO (MP4) ---
const videoOi = new URL('../assets/PrimeirosPassosVideo/Oi.mp4', import.meta.url).href;
const videoTchau = new URL('../assets/PrimeirosPassosVideo/Tchau.mp4', import.meta.url).href;
const videoObrigado = new URL('../assets/PrimeirosPassosVideo/Obrigado.mp4', import.meta.url).href;

// --- 2. IMPORTAR ASSETS DE ALTERNATIVAS (GIF) ---
const gifOi = new URL('../assets/PrimeirosPassos/Oi.gif', import.meta.url).href;
const gifTchau = new URL('../assets/PrimeirosPassos/Tchau.gif', import.meta.url).href;
const gifObrigado = new URL('../assets/PrimeirosPassos/Obrigado.gif', import.meta.url).href;
const gifBomDia = new URL('../assets/PrimeirosPassos/Bom dia.gif', import.meta.url).href;
const gifBoaTarde = new URL('../assets/PrimeirosPassos/Boa tarde.gif', import.meta.url).href;

// --- O "Pacote de Lição" ---
export const comecarDoZeroLesson = {
  id: 'comecar-do-zero',
  title: 'Primeira Aula Prática',
  subtitle: 'Saudações',
  steps: [
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Você vai começar do básico em Libras. Prepare-se para sua primeira aula!" />
    },
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoOi} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa Oi?" 
        options={[gifTchau, gifOi, gifBomDia, gifBoaTarde, gifObrigado]}
      />,
      correctAnswer: 1 
    },
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoTchau} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa Tchau?" 
        options={[gifOi, gifBomDia, gifObrigado, gifTchau, gifBoaTarde]}
      />,
      correctAnswer: 3
    },
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoObrigado} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa Obrigado?" 
        options={[gifObrigado, gifTchau, gifBoaTarde, gifOi, gifBomDia]}
      />,
      correctAnswer: 0
    }
  ]
};