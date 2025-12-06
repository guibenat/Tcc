import React from 'react';
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI'; 

// Assets de Vídeo
// Vídeos para o checkpoint (Oi, Bom Dia, Obrigado)
const videoOi = new URL('../assets/PrimeirosPassosVideo/Oi.mp4', import.meta.url).href;
const videoBomDia = new URL('../assets/PrimeirosPassosVideo/BomDia.mp4', import.meta.url).href;
const videoObrigado = new URL('../assets/PrimeirosPassosVideo/Obrigado.mp4', import.meta.url).href;

// Assets de Alternativas 
// Gifs para as perguntas
const gifOi = new URL('../assets/PrimeirosPassos/Oi.gif', import.meta.url).href;
const gifTchau = new URL('../assets/PrimeirosPassos/Tchau.gif', import.meta.url).href;
const gifObrigado = new URL('../assets/PrimeirosPassos/Obrigado.gif', import.meta.url).href;
const gifBomDia = new URL('../assets/PrimeirosPassos/Bom dia.gif', import.meta.url).href;
const gifBoaTarde = new URL('../assets/PrimeirosPassos/Boa tarde.gif', import.meta.url).href;

export const checkpoint1Lesson = {
  id: 'checkpoint-1',
  title: 'Desafio Final',
  subtitle: 'Revisão da Unidade 1',
  
  steps: [
    // 1. Modal Inicial
    {
      type: 'modal-inicio',
      component: (props) => <Step1 {...props} text="Parabéns por chegar até aqui! Agora vamos revisar tudo que você aprendeu nas lições anteriores." />
    },
    
    // 2. Revisão Oi (Vídeo)
    {
      type: 'video',
      component: (props) => <StepVideo {...props} videoSrc={videoOi} />
    },
    // 3. Revisão Oi (Pergunta)
    {
      type: 'pergunta',
      component: (props) => <StepPergunta {...props} 
        questionText="Revisão: Qual sinal significa 'Oi'?" 
        options={[gifTchau, gifOi, gifBomDia, gifBoaTarde, gifObrigado]}
      />,
      correctAnswer: 1 // gifOi
    },
    
    // 4. Revisão Bom Dia (Vídeo)
    {
      type: 'video',
      component: (props) => <StepVideo {...props} videoSrc={videoBomDia} />
    },
    // 5. Revisão Bom Dia (Pergunta)
    {
      type: 'pergunta',
      component: (props) => <StepPergunta {...props} 
        questionText="Revisão: Qual sinal significa 'Bom dia'?" 
        options={[gifOi, gifTchau, gifBomDia, gifBoaTarde, gifObrigado]}
      />,
      correctAnswer: 2 // gifBomDia
    },
    
    // 6. Revisão Obrigado (Vídeo)
    {
      type: 'video',
      component: (props) => <StepVideo {...props} videoSrc={videoObrigado} />
    },
    // 7. Revisão Obrigado (Pergunta - Último passo)
    {
      type: 'pergunta',
      component: (props) => <StepPergunta {...props} 
        questionText="Revisão: Qual sinal significa 'Obrigado'?" 
        options={[gifObrigado, gifOi, gifTchau, gifBoaTarde, gifBomDia]}
      />,
      correctAnswer: 0 // gifObrigado
    }
  ]
};