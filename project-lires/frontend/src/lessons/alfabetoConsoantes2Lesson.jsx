// CAMINHO: src/lessons/alfabetoConsoantes2Lesson.jsx

import React from 'react';
// Importo meus componentes de UI reutilizáveis (Modal de Início, Tela de Vídeo, Tela de Pergunta)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// --- Assets (Vídeos e Gifs) ---
// Carregando os vídeos da lição (J, K, L, M, N)
const videoJ = new URL('../assets/AlfabetoVideo/J.mp4', import.meta.url).href;
const videoK = new URL('../assets/AlfabetoVideo/K.mp4', import.meta.url).href;
const videoL = new URL('../assets/AlfabetoVideo/L.mp4', import.meta.url).href;
const videoM = new URL('../assets/AlfabetoVideo/M.mp4', import.meta.url).href;
const videoN = new URL('../assets/AlfabetoVideo/N.mp4', import.meta.url).href;

// Carregando os Gifs das respostas (J, K, L, M, N)
const gifJ = new URL('../assets/AlfabetoRespostas/J.gif', import.meta.url).href;
const gifK = new URL('../assets/AlfabetoRespostas/K.gif', import.meta.url).href;
const gifL = new URL('../assets/AlfabetoRespostas/L.gif', import.meta.url).href;
const gifM = new URL('../assets/AlfabetoRespostas/M.gif', import.meta.url).href;
const gifN = new URL('../assets/AlfabetoRespostas/N.gif', import.meta.url).href;

// Gifs "distratores" (A, B, C) para as perguntas
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;

/**
 * Pacote de Lição: Alfabeto Consoantes - Parte 2
 * * Este objeto define a estrutura da lição 'alfabeto-consoantes-2'.
 * * O componente Lesson.jsx vai ler este objeto e renderizar os
 * * passos (steps) na ordem correta.
 */
export const alfabetoConsoantes2Lesson = {
  id: 'alfabeto-consoantes-2',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 2',
  
  // 'steps' é o array que define cada tela da lição
  steps: [
    // 1. Modal Inicial
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Vamos continuar as consoantes! Você vai dominar: J, K, L, M, N." /> 
    },
    
    // 2. Lição J
    { 
      type: 'video', // Tela de vídeo
      component: (props) => <StepVideo {...props} videoSrc={videoJ} /> 
    },
    { 
      type: 'pergunta', // Tela de pergunta
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra J?" options={[gifK, gifJ, gifL, gifM, gifN]} />, 
      correctAnswer: 1 // O índice da resposta correta (gifJ)
    },
    
    // 3. Lição K
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoK} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra K?" options={[gifM, gifL, gifA, gifK, gifB]} />, 
      correctAnswer: 3 // gifK
    },
    
    // 4. Lição L
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoL} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra L?" options={[gifL, gifC, gifJ, gifK, gifN]} />, 
      correctAnswer: 0 // gifL
    },
    
    // 5. Lição M
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoM} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra M?" options={[gifK, gifN, gifM, gifL, gifA]} />, 
      correctAnswer: 2 // gifM
    },
    
    // 6. Lição N (Última)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoN} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra N?" options={[gifB, gifL, gifJ, gifK, gifN]} />, 
      correctAnswer: 4 // gifN
    }
    // O Lesson.jsx vai identificar que este é o último passo e mostrar "Finalizar"
  ]
};