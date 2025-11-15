// CAMINHO: src/lessons/alfabetoConsoantesLesson.jsx
import React from 'react';
// Importa os componentes de UI reutilizáveis (CAMINHO CORRIGIDO)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// --- Assets (Consoantes 1) ---
const videoB = new URL('../assets/AlfabetoVideo/B.mp4', import.meta.url).href;
const videoC = new URL('../assets/AlfabetoVideo/C.mp4', import.meta.url).href;
const videoD = new URL('../assets/AlfabetoVideo/D.mp4', import.meta.url).href;
const videoF = new URL('../assets/AlfabetoVideo/F.mp4', import.meta.url).href;
const videoG = new URL('../assets/AlfabetoVideo/G.mp4', import.meta.url).href;
const videoH = new URL('../assets/AlfabetoVideo/H.mp4', import.meta.url).href;

const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;
const gifD = new URL('../assets/AlfabetoRespostas/D.gif', import.meta.url).href;
const gifF = new URL('../assets/AlfabetoRespostas/F.gif', import.meta.url).href;
const gifG = new URL('../assets/AlfabetoRespostas/G.gif', import.meta.url).href;
const gifH = new URL('../assets/AlfabetoRespostas/H.gif', import.meta.url).href;
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifE = new URL('../assets/AlfabetoRespostas/E.gif', import.meta.url).href;
const gifI = new URL('../assets/AlfabetoRespostas/I.gif', import.meta.url).href;

// --- Pacote de Lição ---
export const alfabetoConsoantesLesson = {
  id: 'alfabeto-consoantes',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 1',
  steps: [
    { type: 'modal-inicio', component: (props) => <Step1 {...props} text="Agora vamos aprender algumas consoantes! Você vai dominar: B, C, D, F, G, H." /> },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoB} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra B?" options={[gifA, gifB, gifC, gifD, gifE]} />, correctAnswer: 1 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoC} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra C?" options={[gifE, gifF, gifG, gifC, gifI]} />, correctAnswer: 3 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoD} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra D?" options={[gifD, gifC, gifB, gifG, gifH]} />, correctAnswer: 0 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoF} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra F?" options={[gifC, gifH, gifF, gifD, gifA]} />, correctAnswer: 2 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoG} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra G?" options={[gifF, gifE, gifB, gifH, gifG]} />, correctAnswer: 4 },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoH} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra H?" options={[gifG, gifH, gifA, gifC, gifF]} />, correctAnswer: 1 }
  ]
};