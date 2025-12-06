import React from 'react';
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// Assets
// Carregando os vídeos da lição
const videoA = new URL('../assets/AlfabetoVideo/A.mp4', import.meta.url).href;
const videoE = new URL('../assets/AlfabetoVideo/E.mp4', import.meta.url).href;
const videoI = new URL('../assets/AlfabetoVideo/I.mp4', import.meta.url).href;
const videoO = new URL('../assets/AlfabetoVideo/O.mp4', import.meta.url).href;
const videoU = new URL('../assets/AlfabetoVideo/U.mp4', import.meta.url).href;

// Carregando os Gifs das respostas (Vogais)
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifE = new URL('../assets/AlfabetoRespostas/E.gif', import.meta.url).href;
const gifI = new URL('../assets/AlfabetoRespostas/I.gif', import.meta.url).href;
const gifO = new URL('../assets/AlfabetoRespostas/O.gif', import.meta.url).href;
const gifU = new URL('../assets/AlfabetoRespostas/U.gif', import.meta.url).href;

// Gifs "distratores" (Consoantes: B, C, D) para as perguntas
const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;
const gifD = new URL('../assets/AlfabetoRespostas/D.gif', import.meta.url).href;

export const alfabetoLetraALesson = {
  id: 'alfabeto-letra-a',
  title: 'Alfabeto Manual',
  subtitle: 'Vogais - Parte 1',
  
  steps: [
    // 1. Modal Inicial
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Vamos começar a aprender o alfabeto manual em Libras! Hoje você vai dominar as letras A, E, I, O, U." /> 
    },
    
    // 2. Lição A
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoA} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra A?" options={[gifA, gifE, gifI, gifO, gifU]} />, 
      correctAnswer: 0 // gifA
    },
    
    // 3. Lição E
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoE} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra E?" options={[gifI, gifB, gifE, gifA, gifO]} />, 
      correctAnswer: 2 // gifE
    },
    
    // 4. Lição I
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoI} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra I?" options={[gifA, gifI, gifC, gifU, gifD]} />, 
      correctAnswer: 1 // gifI
    },
    
    // 5. Lição O
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoO} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra O?" options={[gifU, gifE, gifB, gifA, gifO]} />, 
      correctAnswer: 4 // gifO
    },
    
    // 6. Lição U (Última)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoU} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra U?" options={[gifO, gifE, gifA, gifU, gifI]} />, 
      correctAnswer: 3 // gifU
    }
  ]
};