// CAMINHO: src/lessons/alfabetoConsoantes4Lesson.jsx

import React from 'react';
// Componentes de UI da lição (Modal, Vídeo, Pergunta)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// --- Assets (Consoantes 4) ---
// Só temos o 'V' por enquanto. W, X, Y, Z estão faltando.
const videoV = new URL('../assets/AlfabetoVideo/V.mp4', import.meta.url).href;

// Gif de resposta
const gifV = new URL('../assets/AlfabetoRespostas/V.gif', import.meta.url).href;
// Gifs "distratores" para a pergunta
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;
const gifD = new URL('../assets/AlfabetoRespostas/D.gif', import.meta.url).href;


/**
 * Pacote de Lição: Alfabeto Consoantes - Parte 4 (Final)
 * * Define a estrutura da lição 'alfabeto-consoantes-4'.
 * Esta lição está incompleta (só tem o 'V') porque faltam os
 * assets (vídeos e gifs) para W, X, Y, Z.
 */
export const alfabetoConsoantes4Lesson = {
  id: 'alfabeto-consoantes-4',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 4 (Final)',
  
  // 'steps' é o array que define cada tela da lição
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
    
    // TODO: Adicionar os steps para W, X, Y, Z quando os vídeos e gifs estiverem prontos.
    // Por enquanto, a lição termina aqui.
  ]
};