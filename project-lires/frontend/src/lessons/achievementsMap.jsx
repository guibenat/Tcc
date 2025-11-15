// src/lessons/achievementsMap.jsx
// Este arquivo define as conquistas do app.
// Ele mapeia o ID da lição (do lessonMap.js) para o emblema de conquista
// que o usuário recebe ao completá-la.

export const achievementsMap = [
    {
      id: 'comecar-do-zero', // 1ª Conquista (primeira lição)
      title: 'Pioneiro',
      description: 'Você completou a sua primeira lição!'
    },
    {
      id: 'checkpoint-1', // 2ª Conquista (final da Unidade 1)
      title: 'Revisão da Unidade 1',
      description: 'Você completou o desafio da Unidade 1!'
    },
    {
      id: 'alfabeto-revisao', // 3ª Conquista (final da Unidade 2)
      title: 'Mestre do Alfabeto',
      description: 'Você completou a Unidade 2!'
    },
    // Adicionei 4 placeholders para preencher os 7 slots da barra de progresso
    { 
      id: 'placeholder-4', 
      title: 'Em Breve...', 
      description: 'Complete a Unidade 4' 
    },
    { 
      id: 'placeholder-5', 
      title: 'Em Breve...', 
      description: 'Complete a Unidade 5' 
    },
    { 
      id: 'placeholder-6', 
      title: 'Em Breve...', 
      description: 'Complete a Unidade 6' 
    },
    { 
      id: 'placeholder-7', 
      title: 'Em Breve...', 
      description: 'Complete a Unidade 7' 
    }
  ];