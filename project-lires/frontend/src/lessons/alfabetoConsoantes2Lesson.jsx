// CAMINHO: src/lessons/alfabetoConsoantes2Lesson.jsx
import React from 'react';
// Importa os componentes de UI reutilizáveis (CAMINHO CORRIGIDO)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// --- Assets (Consoantes 2) ---
const videoJ = new URL('../assets/AlfabetoVideo/J.mp4', import.meta.url).href;
const videoK = new URL('../assets/AlfabetoVideo/K.mp4', import.meta.url).href;
const videoL = new URL('../assets/AlfabetoVideo/L.mp4', import.meta.url).href;
const videoM = new URL('../assets/AlfabetoVideo/M.mp4', import.meta.url).href;
const videoN = new URL('../assets/AlfabetoVideo/N.mp4', import.meta.url).href;

const gifJ = new URL('../assets/AlfabetoRespostas/J.gif', import.meta.url).href;
const gifK = new URL('../assets/AlfabetoRespostas/K.gif', import.meta.url).href;
const gifL = new URL('../assets/AlfabetoRespostas/L.gif', import.meta.url).href;
const gifM = new URL('../assets/AlfabetoRespostas/M.gif', import.meta.url).href;
const gifN = new URL('../assets/AlfabetoRespostas/N.gif', import.meta.url).href;
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;

// --- Pacote de Lição ---
export const alfabetoConsoantes2Lesson = {
  id: 'alfabeto-consoantes-2',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 2',
  steps: [
    { type: 'modal-inicio', component: (props) => <Step1 {...props} text="Vamos continuar as consoantes! Você vai dominar: J, K, L, M, N." /> },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoJ} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra J?" options={[gifK, gifJ, gifL, gifM, gifN]} />, correctAnswer: 1 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoK} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra K?" options={[gifM, gifL, gifA, gifK, gifB]} />, correctAnswer: 3 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoL} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra L?" options={[gifL, gifC, gifJ, gifK, gifN]} />, correctAnswer: 0 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoM} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra M?" options={[gifK, gifN, gifM, gifL, gifA]} />, correctAnswer: 2 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoN} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra N?" options={[gifB, gifL, gifJ, gifK, gifN]} />, correctAnswer: 4 }
  ]
};