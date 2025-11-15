// CAMINHO: src/lessons/checkpoint1Lesson.jsx
import React from 'react';
// Importa os componentes de UI reutilizáveis (CAMINHO CORRIGIDO)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI'; 

// --- 1. IMPORTAR ASSETS DE VÍDEO (MP4) ---
const videoOi = new URL('../assets/PrimeirosPassosVideo/Oi.mp4', import.meta.url).href;
const videoBomDia = new URL('../assets/PrimeirosPassosVideo/BomDia.mp4', import.meta.url).href;
const videoObrigado = new URL('../assets/PrimeirosPassosVideo/Obrigado.mp4', import.meta.url).href;

// --- 2. IMPORTAR ASSETS DE ALTERNATIVAS (GIF) ---
const gifOi = new URL('../assets/PrimeirosPassos/Oi.gif', import.meta.url).href;
const gifTchau = new URL('../assets/PrimeirosPassos/Tchau.gif', import.meta.url).href;
const gifObrigado = new URL('../assets/PrimeirosPassos/Obrigado.gif', import.meta.url).href;
const gifBomDia = new URL('../assets/PrimeirosPassos/Bom dia.gif', import.meta.url).href;
const gifBoaTarde = new URL('../assets/PrimeirosPassos/Boa tarde.gif', import.meta.url).href;

// --- O "Pacote de Lição" ---
export const checkpoint1Lesson = {
  id: 'checkpoint-1',
  title: 'Desafio Final',
  subtitle: 'Revisão da Unidade 1',
  steps: [
    {
      type: 'modal-inicio',
      component: (props) => <Step1 {...props} text="Parabéns por chegar até aqui! Agora vamos revisar tudo que você aprendeu nas lições anteriores." />
    },
    {
      type: 'video',
      component: (props) => <StepVideo {...props} videoSrc={videoOi} />
    },
    {
      type: 'pergunta',
      component: (props) => <StepPergunta {...props} 
        questionText="Revisão: Qual sinal significa 'Oi'?" 
        options={[gifTchau, gifOi, gifBomDia, gifBoaTarde, gifObrigado]}
      />,
      correctAnswer: 1
    },
    {
      type: 'video',
      component: (props) => <StepVideo {...props} videoSrc={videoBomDia} />
    },
    {
      type: 'pergunta',
      component: (props) => <StepPergunta {...props} 
        questionText="Revisão: Qual sinal significa 'Bom dia'?" 
        options={[gifOi, gifTchau, gifBomDia, gifBoaTarde, gifObrigado]}
      />,
      correctAnswer: 2
    },
    {
      type: 'video',
      component: (props) => <StepVideo {...props} videoSrc={videoObrigado} />
    },
    {
      type: 'pergunta',
      component: (props) => <StepPergunta {...props} 
        questionText="Revisão: Qual sinal significa 'Obrigado'?" 
        options={[gifObrigado, gifOi, gifTchau, gifBoaTarde, gifBomDia]}
      />,
      correctAnswer: 0
    }
  ]
};