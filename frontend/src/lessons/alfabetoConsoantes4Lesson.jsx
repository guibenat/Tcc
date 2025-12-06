import React from 'react';
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// Assets 
// Só temos o 'V' por enquanto. W, X, Y, Z estão faltando.
const videoV = new URL('../assets/AlfabetoVideo/V.mp4', import.meta.url).href;

// Gif de resposta
const gifV = new URL('../assets/AlfabetoRespostas/V.gif', import.meta.url).href;
// Gifs "distratores" para a pergunta
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;
const gifD = new URL('../assets/AlfabetoRespostas/D.gif', import.meta.url).href;


export const alfabetoConsoantes4Lesson = {
  id: 'alfabeto-consoantes-4',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 4 (Final)',

  steps: [
    // 1. Modal Inicial
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Última parte das consoantes! Vamos aprender a letra V." /> 
    },
    
    // 2. Lição V
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoV} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra V?" options={[gifA, gifV, gifC, gifB, gifD]} />, 
      correctAnswer: 1 // gifV
    },
  ]
};