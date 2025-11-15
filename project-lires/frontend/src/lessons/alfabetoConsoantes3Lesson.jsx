// CAMINHO: src/lessons/alfabetoConsoantes3Lesson.jsx
import React from 'react';
// Importa os componentes de UI reutilizáveis (CAMINHO CORRIGIDO)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// --- Assets (Consoantes 3) ---
const videoP = new URL('../assets/AlfabetoVideo/P.mp4', import.meta.url).href;
// Q.mp4 não existe
const videoR = new URL('../assets/AlfabetoVideo/R.mp4', import.meta.url).href;
const videoS = new URL('../assets/AlfabetoVideo/S.mp4', import.meta.url).href;
const videoT = new URL('../assets/AlfabetoVideo/T.mp4', import.meta.url).href;

const gifP = new URL('../assets/AlfabetoRespostas/P.gif', import.meta.url).href;
const gifQ = new URL('../assets/AlfabetoRespostas/Q.gif', import.meta.url).href;
const gifR = new URL('../assets/AlfabetoRespostas/R.gif', import.meta.url).href;
const gifS = new URL('../assets/AlfabetoRespostas/S.gif', import.meta.url).href;
const gifT = new URL('../assets/AlfabetoRespostas/T.gif', import.meta.url).href;
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifE = new URL('../assets/AlfabetoRespostas/E.gif', import.meta.url).href;
const gifO = new URL('../assets/AlfabetoRespostas/O.gif', import.meta.url).href;

// --- Pacote de Lição ---
export const alfabetoConsoantes3Lesson = {
  id: 'alfabeto-consoantes-3',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 3',
  steps: [
    { type: 'modal-inicio', component: (props) => <Step1 {...props} text="Quase lá! Agora vamos dominar as letras: P, Q, R, S, T." /> },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoP} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra P?" options={[gifA, gifP, gifQ, gifR, gifS]} />, correctAnswer: 1 },
    // Sem vídeo para Q, conforme solicitado
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra Q?" options={[gifR, gifT, gifO, gifQ, gifP]} />, correctAnswer: 3 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoR} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra R?" options={[gifR, gifS, gifT, gifA, gifE]} />, correctAnswer: 0 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoS} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra S?" options={[gifT, gifA, gifS, gifP, gifQ]} />, correctAnswer: 2 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoT} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra T?" options={[gifP, gifS, gifE, gifA, gifT]} />, correctAnswer: 4 }
  ]
};