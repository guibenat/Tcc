import React from 'react';
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI'; 

// Assets de Vídeo
// Vídeos para a lição (Oi, Tchau, Obrigado)
const videoOi = new URL('../assets/PrimeirosPassosVideo/Oi.mp4', import.meta.url).href;
const videoTchau = new URL('../assets/PrimeirosPassosVideo/Tchau.mp4', import.meta.url).href;
const videoObrigado = new URL('../assets/PrimeirosPassosVideo/Obrigado.mp4', import.meta.url).href;

// Assets de Alternativas 
const gifOi = new URL('../assets/PrimeirosPassos/Oi.gif', import.meta.url).href;
const gifTchau = new URL('../assets/PrimeirosPassos/Tchau.gif', import.meta.url).href;
const gifObrigado = new URL('../assets/PrimeirosPassos/Obrigado.gif', import.meta.url).href;
const gifBomDia = new URL('../assets/PrimeirosPassos/Bom dia.gif', import.meta.url).href;
const gifBoaTarde = new URL('../assets/PrimeirosPassos/Boa tarde.gif', import.meta.url).href;

export const comecarDoZeroLesson = {
  id: 'comecar-do-zero',
  title: 'Primeira Aula Prática',
  subtitle: 'Saudações',
  
  steps: [
    // 1. Modal Inicial
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Você vai começar do básico em Libras. Prepare-se para sua primeira aula!" />
    },
    
    // 2. Lição Oi (Vídeo)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoOi} /> 
    },
    // 3. Lição Oi (Pergunta)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa Oi?" 
        options={[gifTchau, gifOi, gifBomDia, gifBoaTarde, gifObrigado]}
      />,
      correctAnswer: 1 // gifOi
    },
    
    // 4. Lição Tchau (Vídeo)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoTchau} /> 
    },
    // 5. Lição Tchau (Pergunta)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa Tchau?" 
        options={[gifOi, gifBomDia, gifObrigado, gifTchau, gifBoaTarde]}
      />,
      correctAnswer: 3 // gifTchau
    },
    
    // 6. Lição Obrigado (Vídeo)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoObrigado} /> 
    },
    // 7. Lição Obrigado (Pergunta - Último passo)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa Obrigado?" 
        options={[gifObrigado, gifTchau, gifBoaTarde, gifOi, gifBomDia]}
      />,
      correctAnswer: 0 // gifObrigado
    }
  ]
};