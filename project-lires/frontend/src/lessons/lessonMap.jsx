// src/lessons/lessonMap.js

// --- 1. IMPORTAR TODAS AS LIÇÕES ---
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
  // --- UNIDADE 1 ---
  {
    id: 'comecar-do-zero',
    unit: 1, // Unidade 1
    title: 'Começar do Zero',
    totalSteps: countInteractiveSteps(comecarDoZeroLesson.steps), // 3
  },
  {
    id: 'saudacoes-avancadas',
    unit: 1,
    title: 'Saudações Avançadas',
    totalSteps: countInteractiveSteps(saudacoesAvancadasLesson.steps), // 4
  },
  {
    id: 'checkpoint-1',
    unit: 1,
    title: 'Desafio da Unidade 1',
    totalSteps: countInteractiveSteps(checkpoint1Lesson.steps), // 3
    isCheckpoint: true, // Para mostrar a coroa
  },
  
  // --- 2. ADICIONAR TODAS AS LIÇÕES DA UNIDADE 2 ---
  {
    id: 'alfabeto-letra-a',
    unit: 2, // Unidade 2
    title: 'Vogais - Parte 1',
    totalSteps: countInteractiveSteps(alfabetoLetraALesson.steps), // 5
  },
  {
    id: 'alfabeto-consoantes',
    unit: 2, // Unidade 2
    title: 'Consoantes - Parte 1',
    totalSteps: countInteractiveSteps(alfabetoConsoantesLesson.steps), // 6
  },
  {
    id: 'alfabeto-consoantes-2',
    unit: 2, // Unidade 2
    title: 'Consoantes - Parte 2',
    totalSteps: countInteractiveSteps(alfabetoConsoantes2Lesson.steps), // 5
  },
  {
    id: 'alfabeto-consoantes-3',
    unit: 2, // Unidade 2
    title: 'Consoantes - Parte 3',
    totalSteps: countInteractiveSteps(alfabetoConsoantes3Lesson.steps), // 5
  },
  {
    id: 'alfabeto-consoantes-4',
    unit: 2, // Unidade 2
    title: 'Consoantes - Parte 4 (Final)',
    totalSteps: countInteractiveSteps(alfabetoConsoantes4Lesson.steps), // 5
  },
  {
    id: 'alfabeto-revisao',
    unit: 2, // Unidade 2
    title: 'Desafio do Alfabeto',
    totalSteps: countInteractiveSteps(alfabetoRevisaoLesson.steps), // 11
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