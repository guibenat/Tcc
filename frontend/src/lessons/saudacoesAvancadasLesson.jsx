import React from 'react';
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI'; 

// Assets de Vídeo 
const videoBomDia = new URL('../assets/PrimeirosPassosVideo/BomDia.mp4', import.meta.url).href;
const videoBoaTarde = new URL('../assets/PrimeirosPassosVideo/BoaTarde.mp4', import.meta.url).href;
const videoBoaNoite = new URL('../assets/PrimeirosPassosVideo/BoaNoite.mp4', import.meta.url).href;
const videoAteLogo = new URL('../assets/PrimeirosPassosVideo/AteLogo.mp4', import.meta.url).href;

// Assets de Alternativas
const gifOi = new URL('../assets/PrimeirosPassos/Oi.gif', import.meta.url).href;
const gifTchau = new URL('../assets/PrimeirosPassos/Tchau.gif', import.meta.url).href;
const gifObrigado = new URL('../assets/PrimeirosPassos/Obrigado.gif', import.meta.url).href;
const gifBomDia = new URL('../assets/PrimeirosPassos/Bom dia.gif', import.meta.url).href;
const gifBoaTarde = new URL('../assets/PrimeirosPassos/Boa tarde.gif', import.meta.url).href;
const gifBoaNoite = new URL('../assets/PrimeirosPassos/Boa noite.gif', import.meta.url).href;
const gifAteLogo = new URL('../assets/PrimeirosPassos/Até logo.gif', import.meta.url).href;

export const saudacoesAvancadasLesson = {
  id: 'saudacoes-avancadas',
  title: 'Primeira Aula Prática',
  subtitle: 'Saudações - Parte 2',
  
  steps: [
    // 1. Modal Inicial
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Vamos aprender algumas saudações mais complexas." />
    },
    
    // 2. Lição Bom Dia (Vídeo)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoBomDia} /> 
    },
    // 3. Lição Bom Dia (Pergunta)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa 'Bom dia'?" 
        options={[gifBomDia, gifOi, gifTchau, gifBoaTarde, gifObrigado]}
      />,
      correctAnswer: 0 // gifBomDia
    },
    
    // 4. Lição Boa Tarde (Vídeo)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoBoaTarde} /> 
    },
    // 5. Lição Boa Tarde (Pergunta)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa 'Boa tarde'?" 
        options={[gifOi, gifBomDia, gifBoaTarde, gifAteLogo, gifBoaNoite]}
      />,
      correctAnswer: 2 // gifBoaTarde
    },
    
    // 6. Lição Boa Noite (Vídeo)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoBoaNoite} /> 
    },
    // 7. Lição Boa Noite (Pergunta)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa 'Boa noite'?" 
        options={[gifAteLogo, gifBoaNoite, gifTchau, gifOi, gifBomDia]}
      />,
      correctAnswer: 1 // gifBoaNoite
    },
    
    // 8. Lição Até Logo (Vídeo)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoAteLogo} /> 
    },
    // 9. Lição Até Logo (Pergunta - Último passo)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} 
        questionText="Qual desses sinais significa 'Até logo'?" 
        options={[gifOi, gifObrigado, gifTchau, gifAteLogo, gifBomDia]}
      />,
      correctAnswer: 3 // gifAteLogo
    }
  ]
};