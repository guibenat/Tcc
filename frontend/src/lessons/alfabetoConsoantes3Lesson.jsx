// CAMINHO: src/lessons/alfabetoConsoantes3Lesson.jsx

import React from 'react';
// Importo meus componentes de UI reutilizáveis (Modal de Início, Tela de Vídeo, Tela de Pergunta)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// --- Assets (Vídeos e Gifs) ---
// Carregando os vídeos da lição (P, R, S, T)
const videoP = new URL('../assets/AlfabetoVideo/P.mp4', import.meta.url).href;
// O vídeo para 'Q.mp4' não existe, então pulamos a importação dele
const videoR = new URL('../assets/AlfabetoVideo/R.mp4', import.meta.url).href;
const videoS = new URL('../assets/AlfabetoVideo/S.mp4', import.meta.url).href;
const videoT = new URL('../assets/AlfabetoVideo/T.mp4', import.meta.url).href;

// Carregando os Gifs das respostas (P, Q, R, S, T)
const gifP = new URL('../assets/AlfabetoRespostas/P.gif', import.meta.url).href;
const gifQ = new URL('../assets/AlfabetoRespostas/Q.gif', import.meta.url).href;
const gifR = new URL('../assets/AlfabetoRespostas/R.gif', import.meta.url).href;
const gifS = new URL('../assets/AlfabetoRespostas/S.gif', import.meta.url).href;
const gifT = new URL('../assets/AlfabetoRespostas/T.gif', import.meta.url).href;

// Gifs "distratores" (A, E, O) para as perguntas
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifE = new URL('../assets/AlfabetoRespostas/E.gif', import.meta.url).href;
const gifO = new URL('../assets/AlfabetoRespostas/O.gif', import.meta.url).href;

/**
 * Pacote de Lição: Alfabeto Consoantes - Parte 3
 * * Define a estrutura da lição 'alfabeto-consoantes-3'.
 */
export const alfabetoConsoantes3Lesson = {
  id: 'alfabeto-consoantes-3',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 3',
  
  // 'steps' é o array que define cada tela da lição
  steps: [
    // 1. Modal Inicial
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Quase lá! Agora vamos dominar as letras: P, Q, R, S, T." /> 
    },
    
    // 2. Lição P
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoP} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra P?" options={[gifA, gifP, gifQ, gifR, gifS]} />, 
      correctAnswer: 1 // gifP
    },
    
    // 3. Lição Q (Sem vídeo, direto para a pergunta)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra Q?" options={[gifR, gifT, gifO, gifQ, gifP]} />, 
      correctAnswer: 3 // gifQ
    },
    
    // 4. Lição R
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoR} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra R?" options={[gifR, gifS, gifT, gifA, gifE]} />, 
      correctAnswer: 0 // gifR
    },
    
    // 5. Lição S
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoS} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra S?" options={[gifT, gifA, gifS, gifP, gifQ]} />, 
      correctAnswer: 2 // gifS
    },
    
    // 6. Lição T (Última)
    { 
      type: 'video', 
      component: (props) => <StepVideo {...props} videoSrc={videoT} /> 
    },
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra T?" options={[gifP, gifS, gifE, gifA, gifT]} />, 
      correctAnswer: 4 // gifT
    }
  ]
};