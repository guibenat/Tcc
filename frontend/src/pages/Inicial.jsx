import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
// Puxo os setters do meu contexto para persistir as escolhas finais
import { useSettings } from '../components/SettingsContext'; 

// --- Imports de Assets ---
import logoLiresClaraImg from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png'; 
import robotImage from '../assets/robot.png';
import diversaoIcon from '../assets/diversao.png';
import comunicacaoIcon from '../assets/comunicacao.png';
import profissionalIcon from '../assets/profissional.png';
import educacaoIcon from '../assets/educacao.png';
import inicianteIcon from '../assets/iniciante-icon.png';
import intermediarioIcon from '../assets/intermediario-icon.png';
import avancadoIcon from '../assets/avancado-icon.png';
import expertIcon from '../assets/expert-icon.png';
import calendarioIcon from '../assets/icone-calendario.png';
import lupaIcon from '../assets/icone-lupa.png';

/**
 * Componente: Inicial
 * Gerencia a experiência interativa de Onboarding de 4 passos para novos usuários.
 */
function Inicial() {
    // Puxo os setters do meu Contexto (para o final do Onboarding)
    const { theme, setHasOnboarded, setOnboardingSelections } = useSettings(); 
    const navigate = useNavigate(); 

    // --- Estados da Máquina de Estados ---
    const [step, setStep] = useState(1); // 1 a 4
    const [selections, setSelections] = useState({ // Guarda as escolhas do usuário
        category: '',
        time: '',
        level: '',
        choice: ''
    });
    
    // Estados para o efeito visual de digitação do robô
    const [showBubble, setShowBubble] = useState(true);
    const [typedText, setTypedText] = useState('');
    
    // Estados para controlar as animações de transição
    const [exitAnimationClass, setExitAnimationClass] = useState('');
    const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter'); 

    // Mensagens do Robô (Keyed by Step)
    const messages = {
        1: 'Me fale mais sobre você.',
        2: 'Em qual área você quer focar?',
        3: 'Quanto tempo você tem para dedicar?',
        4: 'Para começar, escolha uma das opções.'
    };

    // --- Efeito de Digitação do Robô ---
    useEffect(() => {
        setTypedText('');
        const currentMessage = messages[step];
        if (!currentMessage) return; 
        let i = 0;
        // Usa setInterval para adicionar uma letra a cada 50ms
        const typing = setInterval(() => {
            if (i < currentMessage.length) {
                setTypedText(currentMessage.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);

        return () => clearInterval(typing); // Cleanup
    }, [step]); // Roda toda vez que o 'step' muda

    // --- Lookup Maps para as Opções ---
    const allLevels = ['Iniciante', 'Intermediário', 'Avançado', 'Expert'];
    const allCategories = ['Diversão', 'Comunicação', 'Profissional', 'Educação'];
    const allTimes = ['5min/dia', '10min/dia', '15min/dia', '20min/dia'];
    const allChoices = ['Começar do zero', 'Descubra seu nível'];

    const levelIcons = { 'Iniciante': inicianteIcon, 'Intermediário': intermediarioIcon, 'Avançado': avancadoIcon, 'Expert': expertIcon };
    const categoryIcons = { 'Diversão': diversaoIcon, 'Comunicação': comunicacaoIcon, 'Profissional': profissionalIcon, 'Educação': educacaoIcon };
    const choiceIcons = { 'Começar do zero': calendarioIcon, 'Descubra seu nível': lupaIcon };

    // Handler para salvar a seleção no estado local
    const handleSelection = (type, value) => {
        setSelections(prev => ({ ...prev, [type]: value }));
    };

    /**
     * Lógica de Avançar (com validação e animação)
     */
    const handleNextStep = () => {
        const currentSelectionKeyMap = { 1: 'level', 2: 'category', 3: 'time', 4: 'choice' };
        const currentSelectionKey = currentSelectionKeyMap[step];

        // 1. Validação (garante que uma opção foi selecionada)
        if (currentSelectionKey && !selections[currentSelectionKey]) {
            const messageText = messages[step] || "Por favor, selecione uma opção para continuar.";
            alert(messageText); 
            return;
        }

        // 2. Inicia a Animação de Saída
        setEnterAnimationClass(''); 
        setExitAnimationClass('anim-exit'); 

        if (step < 4) {
            // Se não é a última etapa, avança o step
            setTimeout(() => {
                setStep(prev => prev + 1); 
                setExitAnimationClass(''); 
                setEnterAnimationClass('anim-enter'); 
            }, 800); 
        } else {
            // 3. Fim do Onboarding (Persistência e Navegação)
            
            console.log('Final Selections:', selections);
            // Salvo o status e as seleções no contexto global (que persiste no localStorage)
            setHasOnboarded(true);
            setOnboardingSelections(selections);
            
            setTimeout(() => {
                if (selections.choice === 'Começar do zero') {
                    // Direciono o usuário para a primeira lição
                    navigate('/lesson/comecar-do-zero');
                } else if (selections.choice === 'Descubra seu nível') {
                    // TODO: Navegar para a tela de nivelamento
                    alert('Navegação para "Descubra seu nível" ainda não implementada.');
                    setExitAnimationClass(''); 
                    setEnterAnimationClass('anim-enter'); 
                }
            }, 800); 
        }
    };

    // Lógica para Voltar (com animação)
    const handlePrevStep = () => {
        if (step > 1) {
            setEnterAnimationClass(''); 
            setExitAnimationClass('anim-exit'); 
            setTimeout(() => {
                setStep(prev => prev - 1); 
                setExitAnimationClass(''); 
                setEnterAnimationClass('anim-enter'); 
            }, 800); 
        }
    };

    // Calcula a largura da barra de progresso (25%, 50%, 75%, 100%)
    const getProgressWidth = () => { 
        switch (step) {
            case 1: return '25%';
            case 2: return '50%';
            case 3: return '75%';
            case 4: return '100%';
            default: return '0%';
        }
    };

    // Classes CSS dinâmicas para os botões de opção
    const buttonBaseClasses = `text-lg font-semibold py-6 px-12 border-none rounded-3xl cursor-pointer text-left transition transform duration-200 hover:-translate-y-0.5 hover:shadow-lg`;
    
    const getButtonClasses = (type, value) => {
        const isSelected = selections[type] === value;
        
        // Estilo selecionado é injetado via prop 'style' no JSX (mais fácil de gerenciar)
        const unselectedClasses = theme === 'escuro' 
            ? 'bg-gray-700 text-slate-200 shadow-md border border-gray-600' 
            : 'bg-white text-gray-700 shadow-md border border-gray-100'; 
        
        // Retorno as classes base + o estilo de não-selecionado
        return `${buttonBaseClasses} ${isSelected ? '' : unselectedClasses}`;
    };

    return (
        <div className={`flex flex-col justify-center items-center h-screen w-screen font-poppins ${
            theme === 'escuro' ? 'bg-gray-900 text-slate-300' : 'bg-gray-100 text-gray-800'
        }`}>
            {/* Bloco de Estilos CSS Injetados */}
            <style>{`
                .content-box {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 800ms ease, transform 800ms ease;
                }
                
                @keyframes anim-enter {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .anim-enter {
                    animation: anim-enter 800ms ease both;
                }
        
                .anim-exit {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                @keyframes float { 0% { transform: translatey(0px); } 50% { transform: translatey(-10px); } 100% { transform: translatey(0px); } }
                .float { animation: float 3s ease-in-out infinite; }
                .speech-bubble { position: relative; background: linear-gradient(90deg, #f9a5ff, #c3a1ff); border-radius: 1rem; padding: 1rem; box-shadow: 0 4px 15px rgba(181, 130, 255, 0.4); color: white; }
                .speech-bubble:after { content: ''; position: absolute; top: 50%; right: -10px; width: 0; height: 0; border-style: solid; border-width: 10px 0 10px 10px; border-color: transparent transparent transparent #f9a5ff; transform: translateY(-50%); }
                .styled-scrollbar::-webkit-scrollbar { width: 8px; }
                .styled-scrollbar::-webkit-scrollbar-track { background: ${theme === 'escuro' ? '#374151' : '#f0f0f0'}; border-radius: 10px; } 
                .styled-scrollbar::-webkit-scrollbar-thumb { background-image: linear-gradient(180deg, #b081ff, #59b1ff); border-radius: 10px; }
            `}</style>
    
            <div className={`shadow-lg rounded-2xl p-10 w-full h-full box-border text-center flex flex-col ${
                theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
            }`}>
                {/* Header */}
                <div className="flex flex-col flex-shrink-0">
                    <div className="pb-2 flex justify-start">
                        <img 
                            src={theme === 'escuro' ? logoLiresEscuraImg : logoLiresClaraImg} 
                            alt="Lires Logo" 
                            className="h-24" 
                        />
                    </div>
                    <hr className={`my-0 mb-4 ${theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'}`} /> 
                </div>
        
                {/* Título + Barra de progresso */}
                <h1
                    className="text-4xl font-semibold mb-5 flex-shrink-0" 
                    style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    Escolha como começar
                </h1>
                <div
                    className="flex-shrink-0" 
                    style={{ 
                        width: '100%', maxWidth: '800px', margin: '0 auto 40px auto', height: '14px', 
                        backgroundColor: theme === 'escuro' ? '#4b5563' : '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' 
                    }}
                >
                    <div style={{ width: getProgressWidth(), height: '100%', backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', transition: 'all 0.5s ease' }}></div>
                </div>
        
                {/* Main Content */}
                <div className="flex-grow overflow-y-auto flex flex-col items-center mt-5 styled-scrollbar">
                    <div className={`w-full flex justify-center items-center gap-12 mb-10 md:flex-row flex-col content-box ${enterAnimationClass} ${exitAnimationClass}`}>
                        {/* Robô e Balão de Fala */}
                        <div className="w-48 relative flex-shrink-0"> 
                            <img src={robotImage} alt="Robô Amigável" className="w-full float" />
                            {showBubble && (
                                <div className="absolute top-1/2 transform -translate-y-1/2 -left-48 w-48 text-left float">
                                    <div className="speech-bubble">{typedText}</div>
                                </div>
                            )}
                        </div>
        
                        {/* Bloco de Opções */}
                        <div className="flex flex-col gap-4 w-96">
                            {/* Nível */}
                            {step === 1 && allLevels.map(level => ( 
                                <button 
                                    key={level} 
                                    className={getButtonClasses('level', level)} 
                                    style={selections.level === level ? { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)', color: 'white' } : {}} 
                                    onClick={() => handleSelection('level', level)}
                                >
                                    <div className="flex items-center">
                                        <img src={levelIcons[level]} alt={`Ícone de ${level}`} className="w-8 h-8 mr-6 flex-shrink-0" />
                                        <span className="block font-semibold">{level}</span>
                                    </div>
                                </button>
                            ))}
                            {/* Categoria */}
                            {step === 2 && allCategories.map(category => ( 
                                <button 
                                    key={category} 
                                    className={getButtonClasses('category', category)} 
                                    style={selections.category === category ? { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)', color: 'white' } : {}} 
                                    onClick={() => handleSelection('category', category)}
                                >
                                    <div className="flex items-center">
                                        <img src={categoryIcons[category]} alt={`Ícone de ${category}`} className="w-8 h-8 mr-6 flex-shrink-0" />
                                        <span className="block font-semibold">{category}</span>
                                    </div>
                                </button>
                            ))}
                            {/* Tempo */}
                            {step === 3 && allTimes.map(time => ( 
                                <button 
                                    key={time} 
                                    className={getButtonClasses('time', time)} 
                                    style={selections.time === time ? { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)', color: 'white' } : {}} 
                                    onClick={() => handleSelection('time', time)}
                                >
                                    <div className="flex items-center">
                                        <span className="block font-semibold">{time}</span>
                                    </div>
                                </button>
                            ))}
                            {/* Escolha Final */}
                            {step === 4 && allChoices.map(choice => ( 
                                <button 
                                    key={choice} 
                                    className={getButtonClasses('choice', choice)} 
                                    style={selections.choice === choice ? { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)', color: 'white' } : {}} 
                                    onClick={() => handleSelection('choice', choice)}
                                >
                                    <div className="flex items-center">
                                        <img src={choiceIcons[choice]} alt={`Ícone de ${choice}`} className="w-8 h-8 mr-6 flex-shrink-0" />
                                        <div className="flex-grow text-left">
                                            <span className="block font-semibold">{choice}</span>
                                            <span className={`block text-sm ${ selections.choice === choice ? 'text-white/80' : (theme === 'escuro' ? 'text-gray-400' : 'text-gray-500')}`}>{choice === 'Começar do zero' ? 'comece a praticar libras' : 'descubra seu nível em libras'}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
        
                {/* Footer */}
                <hr className={`my-0 mb-4 ${theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'}`} />
                <div className={`pt-4 flex items-center flex-shrink-0 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
                    {/* Botão Voltar */}
                    {step > 1 && (
                        <button
                            className="text-lg font-semibold py-4 px-12 border-none rounded-3xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
                            style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}
                            onClick={handlePrevStep} 
                        >
                            Voltar
                        </button>
                    )}
                    {/* Botão Continuar */}
                    <button
                        className={`text-lg font-semibold py-4 px-12 border-none rounded-3xl cursor-pointer text-white transition transform duration-200 hover:scale-105 ${
                            ((step === 1 && !selections.level) || (step === 2 && !selections.category) || (step === 3 && !selections.time) || (step === 4 && !selections.choice)) 
                            ? 'opacity-50 cursor-not-allowed' 
                            : ''
                        }`}
                        style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}
                        onClick={handleNextStep} 
                        disabled={ // Desabilita se a seleção atual estiver vazia
                            (step === 1 && !selections.level) ||
                            (step === 2 && !selections.category) ||
                            (step === 3 && !selections.time) ||
                            (step === 4 && !selections.choice)
                        }
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Inicial;