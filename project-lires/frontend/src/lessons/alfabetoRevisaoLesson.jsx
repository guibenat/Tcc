// CAMINHO: src/lessons/alfabetoRevisaoLesson.jsx

import React from 'react';
// Importo meus componentes de UI reutilizáveis (Modal de Início e Tela de Pergunta)
import { Step1, StepPergunta } from '../components/LessonUI';

// --- Assets (Gifs para todas as letras revisadas) ---
// Importo todos os GIFs necessários para as perguntas de revisão
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;
const gifD = new URL('../assets/AlfabetoRespostas/D.gif', import.meta.url).href;
const gifE = new URL('../assets/AlfabetoRespostas/E.gif', import.meta.url).href;
const gifF = new URL('../assets/AlfabetoRespostas/F.gif', import.meta.url).href;
const gifG = new URL('../assets/AlfabetoRespostas/G.gif', import.meta.url).href;
const gifH = new URL('../assets/AlfabetoRespostas/H.gif', import.meta.url).href;
const gifI = new URL('../assets/AlfabetoRespostas/I.gif', import.meta.url).href;
const gifJ = new URL('../assets/AlfabetoRespostas/J.gif', import.meta.url).href;
const gifK = new URL('../assets/AlfabetoRespostas/K.gif', import.meta.url).href;
const gifL = new URL('../assets/AlfabetoRespostas/L.gif', import.meta.url).href;
const gifM = new URL('../assets/AlfabetoRespostas/M.gif', import.meta.url).href;
const gifN = new URL('../assets/AlfabetoRespostas/N.gif', import.meta.url).href;
// Corrigido (gifO)
const gifO = new URL('../assets/AlfabetoRespostas/O.gif', import.meta.url).href; 
const gifP = new URL('../assets/AlfabetoRespostas/P.gif', import.meta.url).href;
const gifQ = new URL('../assets/AlfabetoRespostas/Q.gif', import.meta.url).href;
const gifR = new URL('../assets/AlfabetoRespostas/R.gif', import.meta.url).href;
const gifS = new URL('../assets/AlfabetoRespostas/S.gif', import.meta.url).href;
const gifT = new URL('../assets/AlfabetoRespostas/T.gif', import.meta.url).href;
const gifU = new URL('../assets/AlfabetoRespostas/U.gif', import.meta.url).href;
// CORREÇÃO FINAL: Removido o 'new' duplicado que gerou o erro na linha 30
const gifV = new URL('../assets/AlfabetoRespostas/V.gif', import.meta.url).href; 

/**
 * Pacote de Lição: Revisão Final do Alfabeto
 * * Esta lição testa o conhecimento do usuário sobre todas as letras aprendidas.
 * * É composta apenas por passos de pergunta.
 */
export const alfabetoRevisaoLesson = {
  id: 'alfabeto-revisao',
  title: 'Alfabeto Manual',
  subtitle: 'Revisão Final',
  
  // 'steps' é o array que define cada tela da lição
  steps: [
    // 1. Modal Inicial
    { 
      type: 'modal-inicio', 
      component: (props) => <Step1 {...props} text="Parabéns por chegar até aqui! Vamos revisar tudo que você aprendeu sobre o alfabeto manual em Libras." /> 
    },
    
    // 2. Pergunta A
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra A?" options={[gifA, gifS, gifT, gifE, gifI]} />, 
      correctAnswer: 0 // gifA
    },
    
    // 3. Pergunta E
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra E?" options={[gifI, gifO, gifE, gifU, gifA]} />, 
      correctAnswer: 2 // gifE
    },
    
    // 4. Pergunta B
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra B?" options={[gifC, gifB, gifD, gifF, gifG]} />, 
      correctAnswer: 1 // gifB
    },
    
    // 5. Pergunta H
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra H?" options={[gifL, gifK, gifJ, gifH, gifG]} />, 
      correctAnswer: 3 // gifH
    },
    
    // 6. Pergunta L
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra L?" options={[gifL, gifM, gifN, gifA, gifB]} />, 
      correctAnswer: 0 // gifL
    },
    
    // 7. Pergunta M
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra M?" options={[gifP, gifQ, gifM, gifR, gifS]} />, 
      correctAnswer: 2 // gifM
    },
    
    // 8. Pergunta T
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra T?" options={[gifA, gifS, gifR, gifQ, gifT]} />, 
      correctAnswer: 4 // gifT
    },
    
    // 9. Pergunta V
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra V?" options={[gifV, gifI, gifE, gifA, gifU]} />, 
      correctAnswer: 0 // gifV
    },
    
    // 10. Pergunta Q (Última)
    { 
      type: 'pergunta', 
      component: (props) => <StepPergunta {...props} questionText="Revisão: Qual sinal representa a letra Q?" options={[gifR, gifQ, gifP, gifO, gifN]} />, 
      correctAnswer: 1 // gifQ
    }
    // O Lesson.jsx vai identificar que este é o último passo e mostrar "Finalizar"
  ]
};