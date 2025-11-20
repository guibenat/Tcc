// CAMINHO: src/lessons/comecarDoZeroLesson.jsx

import React from 'react';
// Importo meus componentes de UI reutilizáveis (Modal de Início, Tela de Vídeo, Tela de Pergunta)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI'; 

// --- Assets de Vídeo (MP4) ---
// Vídeos para a lição (Oi, Tchau, Obrigado)
const videoOi = new URL('../assets/PrimeirosPassosVideo/Oi.mp4', import.meta.url).href;
const videoTchau = new URL('../assets/PrimeirosPassosVideo/Tchau.mp4', import.meta.url).href;
const videoObrigado = new URL('../assets/PrimeirosPassosVideo/Obrigado.mp4', import.meta.url).href;

// --- Assets de Alternativas (GIF) ---
// Gifs para as perguntas (respostas e distratores)
const gifOi = new URL('../assets/PrimeirosPassos/Oi.gif', import.meta.url).href;
const gifTchau = new URL('../assets/PrimeirosPassos/Tchau.gif', import.meta.url).href;
const gifObrigado = new URL('../assets/PrimeirosPassos/Obrigado.gif', import.meta.url).href;
const gifBomDia = new URL('../assets/PrimeirosPassos/Bom dia.gif', import.meta.url).href;
const gifBoaTarde = new URL('../assets/PrimeirosPassos/Boa tarde.gif', import.meta.url).href;

/**
 * Pacote de Lição: Começar do Zero (Primeira Aula)
 * * Define a estrutura da lição 'comecar-do-zero'.
 * * Focada nas saudações básicas.
 */
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