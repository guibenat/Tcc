// src/lessons/lessonMap.js

// Importamos a definição da sua primeira lição
import { comecarDoZeroLesson } from './comecarDoZeroLesson.jsx';

/**
 * Conta quantos passos "interativos" (perguntas) uma lição possui.
 */
const countInteractiveSteps = (steps) => {
  return steps.filter(step => step.type === 'pergunta').length;
};

/**
 * Este é o "mapa" principal de todas as lições do seu curso.
 * O MainContent vai ler isso para desenhar os cards.
 */
export const lessonMap = [
  {
    id: 'comecar-do-zero',
    unit: 1, // Unidade 1
    title: 'Começar do Zero',
    // Contamos dinamicamente quantos passos de "pergunta" existem
    totalSteps: countInteractiveSteps(comecarDoZeroLesson.steps), // Isso dará 3
  },
  {
    id: 'saudacoes-avancadas',
    unit: 1,
    title: 'Saudações Avançadas',
    totalSteps: 4, // Exemplo
  },
  {
    id: 'checkpoint-1',
    unit: 1,
    title: 'Desafio da Unidade 1',
    totalSteps: 1, // Desafios (coroas) têm apenas 1 passo
    isCheckpoint: true, // Para mostrar a coroa
  },
  // Adicione mais lições aqui...
];

/**
 * Um objeto "lookup" para encontrar rapidamente uma lição pelo ID.
 * O ActivityPlayer usará isso.
 */
export const lessonLookup = lessonMap.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {});