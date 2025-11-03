import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Para o modal de conclusão

export default function ActivityPlayer() {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Pega os dados da lição enviados pelo MainContent
    const { lesson } = location.state;

    // 2. Controla o estado da atividade
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [lives, setLives] = useState(5); // Exemplo de vidas
    
    const totalSteps = lesson.steps.length;

    // 3. Funções para avançar ou lidar com respostas
    const handleNext = () => {
        const nextStepIndex = currentStepIndex + 1;
        if (nextStepIndex < totalSteps) {
            setCurrentStepIndex(nextStepIndex);
        } else {
            // Terminou a lição!
            Swal.fire({
                title: 'Parabéns!',
                text: 'Você completou a lição.',
                icon: 'success',
                confirmButtonText: 'Voltar ao Início',
                customClass: {
                    popup: 'font-poppins rounded-2xl',
                    confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                }
            }).then(() => {
                navigate('/'); // ou para /dashboard
            });
        }
    };

    const handleCheckAnswer = (selectedAnswer) => {
        const currentStep = lesson.steps[currentStepIndex];
        
        // Simples verificação (você pode incrementar isso)
        if (selectedAnswer === currentStep.correctAnswer) {
            // Lógica de acerto
            console.log("Resposta correta!");
            handleNext();
        } else {
            // Lógica de erro
            console.log("Resposta errada!");
            setLives(prevLives => prevLives - 1);
            if (lives - 1 <= 0) {
                 Swal.fire('Fim de jogo', 'Você perdeu todas as vidas.', 'error')
                    .then(() => navigate('/')); // Volta ao início
            }
        }
    };
    
    // 4. Calcula o progresso
    const progress = (currentStepIndex / (totalSteps - 1)) * 100;

    // 5. Renderiza o componente do passo atual
    const CurrentStepComponent = lesson.steps[currentStepIndex].component;
    const currentStepData = lesson.steps[currentStepIndex];

    return (
        <CurrentStepComponent 
            // Props que os seus componentes de passo (Step1, StepVideo, StepPergunta) esperam
            onNext={handleNext}
            onCheckAnswer={handleCheckAnswer}
            
            // Props para a UI (ProgressBar, Vidas, Título)
            progress={progress}
            lives={lives}
            lessonTitle={lesson.title}
            lessonSubtitle={lesson.subtitle}

            // Props específicas de Pergunta
            isFinal={currentStepIndex === totalSteps - 1}
            // (Você precisará adicionar onSelectAnswer, selectedAnswer, etc., se quiser feedback visual antes de checar)
        />
    );
}