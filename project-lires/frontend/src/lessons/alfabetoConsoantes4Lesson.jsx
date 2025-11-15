// CAMINHO: src/lessons/alfabetoConsoantes4Lesson.jsx
import React from 'react';
// Importa os componentes de UI reutilizáveis (CAMINHO CORRIGIDO)
import { Step1, StepVideo, StepPergunta } from '../components/LessonUI';

// --- Assets (Consoantes 4) ---
// (Apenas 'V' existe nos assets, W, X, Y, Z não)
const videoV = new URL('../assets/AlfabetoVideo/V.mp4', import.meta.url).href;

const gifV = new URL('../assets/AlfabetoRespostas/V.gif', import.meta.url).href;
// Distratores
const gifA = new URL('../assets/AlfabetoRespostas/A.gif', import.meta.url).href;
const gifB = new URL('../assets/AlfabetoRespostas/B.gif', import.meta.url).href;
const gifC = new URL('../assets/AlfabetoRespostas/C.gif', import.meta.url).href;
const gifD = new URL('../assets/AlfabetoRespostas/D.gif', import.meta.url).href;


// --- Pacote de Lição ---
export const alfabetoConsoantes4Lesson = {
  id: 'alfabeto-consoantes-4',
  title: 'Alfabeto Manual',
  subtitle: 'Consoantes - Parte 4 (Final)',
  steps: [
    { type: 'modal-inicio', component: (props) => <Step1 {...props} text="Última parte das consoantes! Vamos aprender a letra V." /> },
    { type: 'video', component: (props) => <StepVideo {...props} videoSrc={videoV} /> },
    { type: 'pergunta', component: (props) => <StepPergunta {...props} questionText="Qual sinal representa a letra V?" options={[gifA, gifV, gifC, gifB, gifD]} />, correctAnswer: 1 },
    // W, X, Y, Z removidos por falta de assets
  ]
};