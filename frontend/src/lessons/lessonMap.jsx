import { comecarDoZeroLesson } from './comecarDoZeroLesson.jsx';
import { saudacoesAvancadasLesson } from './saudacoesAvancadasLesson.jsx'; 
import { checkpoint1Lesson } from './checkpoint1Lesson.jsx';
import { alfabetoLetraALesson } from './alfabetoLetraALesson.jsx';
import { alfabetoConsoantesLesson } from './alfabetoConsoantesLesson.jsx';
import { alfabetoConsoantes2Lesson } from './alfabetoConsoantes2Lesson.jsx';
import { alfabetoConsoantes3Lesson } from './alfabetoConsoantes3Lesson.jsx';
import { alfabetoConsoantes4Lesson } from './alfabetoConsoantes4Lesson.jsx';
import { alfabetoRevisaoLesson } from './alfabetoRevisaoLesson.jsx';

/**
 * Função utilitária: Conta quantos passos "interativos" (perguntas) uma lição possui.
 * Isso define o 'totalSteps' que usamos na barra de progresso.
 * @param {Array} steps - O array steps da lição.
 * @returns {number} O número de perguntas.
 */
const countInteractiveSteps = (steps) => {
  return steps.filter(step => step.type === 'pergunta').length;
};


export const lessonMap = [
  // Saudações e Primeiros Passos 
  {
    id: 'comecar-do-zero',
    unit: 1, 
    title: 'Começar do Zero',
    totalSteps: countInteractiveSteps(comecarDoZeroLesson.steps), // 3 perguntas
  },
  {
    id: 'saudacoes-avancadas',
    unit: 1,
    title: 'Saudações Avançadas',
    totalSteps: countInteractiveSteps(saudacoesAvancadasLesson.steps), // 4 perguntas
  },
  {
    id: 'checkpoint-1',
    unit: 1,
    title: 'Desafio da Unidade 1',
    totalSteps: countInteractiveSteps(checkpoint1Lesson.steps), // 3 perguntas
    isCheckpoint: true, // Flag para indicar que é um desafio/revisão
  },
  
  // Unidade 2: Alfabeto Manual 
  {
    id: 'alfabeto-letra-a',
    unit: 2, 
    title: 'Vogais - Parte 1',
    totalSteps: countInteractiveSteps(alfabetoLetraALesson.steps), // 5 perguntas
  },
  {
    id: 'alfabeto-consoantes',
    unit: 2, 
    title: 'Consoantes - Parte 1',
    totalSteps: countInteractiveSteps(alfabetoConsoantesLesson.steps), // 6 perguntas
  },
  {
    id: 'alfabeto-consoantes-2',
    unit: 2, 
    title: 'Consoantes - Parte 2',
    totalSteps: countInteractiveSteps(alfabetoConsoantes2Lesson.steps), // 5 perguntas
  },
  {
    id: 'alfabeto-consoantes-3',
    unit: 2, 
    title: 'Consoantes - Parte 3',
    totalSteps: countInteractiveSteps(alfabetoConsoantes3Lesson.steps), // 5 perguntas
  },
  {
    id: 'alfabeto-consoantes-4',
    unit: 2, 
    title: 'Consoantes - Parte 4 (Final)',
    totalSteps: countInteractiveSteps(alfabetoConsoantes4Lesson.steps), // 1 pergunta
  },
  {
    id: 'alfabeto-revisao',
    unit: 2, 
    title: 'Desafio do Alfabeto',
    totalSteps: countInteractiveSteps(alfabetoRevisaoLesson.steps), // 9 perguntas
    isCheckpoint: true,
  },
];

export const lessonLookup = lessonMap.reduce((acc, lesson) => {
  const lessonDefinition = 
    (lesson.id === 'comecar-do-zero' && comecarDoZeroLesson) ||
    (lesson.id === 'checkpoint-1' && checkpoint1Lesson) ||
    (lesson.id === 'alfabeto-letra-a' && alfabetoLetraALesson) ||
    (lesson.id === 'alfabeto-consoantes' && alfabetoConsoantesLesson) ||
    (lesson.id === 'alfabeto-consoantes-2' && alfabetoConsoantes2Lesson) ||
    (lesson.id === 'alfabeto-consoantes-3' && alfabetoConsoantes3Lesson) ||
    (lesson.id === 'alfabeto-consoantes-4' && alfabetoConsoantes4Lesson) ||
    (lesson.id === 'alfabeto-revisao' && alfabetoRevisaoLesson);
  
  if (lessonDefinition) {
    acc[lesson.id] = { ...lesson, ...lessonDefinition };
  } else {
    acc[lesson.id] = { ...lesson, steps: [] }; 
  }
  return acc;
}, {});