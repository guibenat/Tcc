import React from 'react';
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// Assets
// Carregando os vídeos da lição
const videoB = new URL('../assets/AlfabetoVideo/B.mp4', import.meta.url).href;
const videoC = new URL('../assets/AlfabetoVideo/C.mp4', import.meta.url).href;
const videoD = new URL('../assets/AlfabetoVideo/D.mp4', import.meta.url).href;
const videoF = new URL('../assets/AlfabetoVideo/F.mp4', import.meta.url).href;
const videoG = new URL('../assets/AlfabetoVideo/G.mp4', import.meta.url).href;
const videoH = new URL('../assets/AlfabetoVideo/H.mp4', import.meta.url).href;

// Carregando os Gifs das respostas
const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;
const gifD = new URL('../assets/AlfabetoRespostas/D.gif', import.meta.url).href;
const gifF = new URL('../assets/AlfabetoRespostas/F.gif', import.meta.url).href;
const gifG = new URL('../assets/AlfabetoRespostas/G.gif', import.meta.url).href;
const gifH = new URL('../assets/AlfabetoRespostas/H.gif', import.meta.url).href;

// Gifs "distratores" (Vogais: A, E, I) para as perguntas
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifE = new URL('../assets/AlfabetoRespostas/E.gif', import.meta.url).href;
const gifI = new URL('../assets/AlfabetoRespostas/I.gif', import.meta.url).href;

export const alfabetoConsoantesLesson = {
  id: 'alfabeto-consoantes',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 1',
  
  steps: [
    // 1. Modal Inicial
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Agora vamos aprender algumas consoantes! Você vai dominar: B, C, D, F, G, H." /> 
    },
    
    // 2. Lição B
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoB} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra B?" options={[gifA, gifB, gifC, gifD, gifE]} />, 
      correctAnswer: 1 // gifB
    },
    
    // 3. Lição C
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoC} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra C?" options={[gifE, gifF, gifG, gifC, gifI]} />, 
      correctAnswer: 3 // gifC
    },
    
    // 4. Lição D
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoD} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra D?" options={[gifD, gifC, gifB, gifG, gifH]} />, 
      correctAnswer: 0 // gifD
    },
    
    // 5. Lição F
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoF} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra F?" options={[gifC, gifH, gifF, gifD, gifA]} />, 
      correctAnswer: 2 // gifF
    },
    
    // 6. Lição G
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoG} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra G?" options={[gifF, gifE, gifB, gifH, gifG]} />, 
      correctAnswer: 4 // gifG
    },
    
    // 7. Lição H (Última)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoH} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra H?" options={[gifG, gifH, gifA, gifC, gifF]} />, 
      correctAnswer: 1 // gifH
    }
  ]
};