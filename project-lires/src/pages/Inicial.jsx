import React, { useState, useEffect } from 'react';
import robotImage from '../assets/robot.png';
import diversaoIcon from '../assets/diversao.png';
import comunicacaoIcon from '../assets/comunicacao.png';
import profissionalIcon from '../assets/profissional.png';
import educacaoIcon from '../assets/educacao.png';
import liresLogoImage from '../assets/logo-lires.png';
import inicianteIcon from '../assets/iniciante-icon.png';
import intermediarioIcon from '../assets/intermediario-icon.png';
import avancadoIcon from '../assets/avancado-icon.png';
import expertIcon from '../assets/expert-icon.png';
import calendarioIcon from '../assets/icone-calendario.png';
import lupaIcon from '../assets/icone-lupa.png';

function App() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    category: '',
    time: '',
    level: '',
    choice: ''
  });
  const [showBubble, setShowBubble] = useState(true);
  const [typedText, setTypedText] = useState('');

  const messages = {
    1: 'Me fale mais sobre você.',
    2: 'Em qual área você quer focar?',
    3: 'Quanto tempo você tem para dedicar?',
    4: 'Para começar, escolha uma das opções.'
  };

  useEffect(() => {
    setTypedText('');
    const currentMessage = messages[step];
    let i = 0;
    const typing = setInterval(() => {
      if (i < currentMessage.length) {
        setTypedText(currentMessage.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [step]);

  const allLevels = ['Iniciante', 'Intermediário', 'Avançado', 'Expert'];
  const allCategories = ['Diversão', 'Comunicação', 'Profissional', 'Educação'];
  const allTimes = ['5min/dia', '10min/dia', '15min/dia', '20min/dia'];
  const allChoices = ['Começar do zero', 'Descubra seu nível'];

  const levelIcons = {
    'Iniciante': inicianteIcon,
    'Intermediário': intermediarioIcon,
    'Avançado': avancadoIcon,
    'Expert': expertIcon,
  };

  const categoryIcons = {
    'Diversão': diversaoIcon,
    'Comunicação': comunicacaoIcon,
    'Profissional': profissionalIcon,
    'Educação': educacaoIcon,
  };
  
  const choiceIcons = {
    'Começar do zero': calendarioIcon,
    'Descubra seu nível': lupaIcon,
  };

  const handleSelection = (type, value) => {
    setSelections(prev => ({ ...prev, [type]: value }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      console.log('Final Selections:', selections);
      alert('Cadastro finalizado! Cheque o console para ver suas escolhas.');
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const getProgressWidth = () => {
    switch (step) {
      case 1: return '25%';
      case 2: return '50%';
      case 3: return '75%';
      case 4: return '100%';
      default: return '0%';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 text-gray-800 font-poppins">
      <style>
        {`
          @keyframes float {
            0% { transform: translatey(0px); }
            50% { transform: translatey(-10px); }
            100% { transform: translatey(0px); }
          }
          .float {
            animation: float 3s ease-in-out infinite;
          }
          .speech-bubble {
            position: relative;
            background: linear-gradient(90deg, #f9a5ff, #c3a1ff);
            border-radius: 1rem;
            padding: 1rem;
            box-shadow: 0 4px 15px rgba(181, 130, 255, 0.4);
            color: white;
          }
          .speech-bubble:after {
            content: '';
            position: absolute;
            top: 50%;
            right: -10px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 10px 0 10px 10px;
            border-color: transparent transparent transparent #f9a5ff;
            transform: translateY(-50%);
          }
          .styled-scrollbar::-webkit-scrollbar { width: 8px; }
          .styled-scrollbar::-webkit-scrollbar-track { background: #f0f0f0; border-radius: 10px; }
          .styled-scrollbar::-webkit-scrollbar-thumb { background-image: linear-gradient(180deg, #b081ff, #59b1ff); border-radius: 10px; }
        `}
      </style>

      <div className="bg-white shadow-lg rounded-2xl p-10 w-full h-full box-border text-center flex flex-col">
        {/* === Header === */}
        <div className="flex flex-col flex-shrink-0">
          <div className="pb-2 flex justify-start">
            <img src={liresLogoImage} alt="Lires Logo" className="h-24" />
          </div>
          <hr className="my-0 mb-4" />
        </div>

        {/* === Título + Barra de progresso (fora do scroll) === */}
        <h1
          className="text-4xl font-semibold mb-5"
          style={{
            backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Escolha como começar
        </h1>

        <div
          style={{
            width: '100%',
            maxWidth: '800px',   // comprimento máximo maior
            margin: '0 auto 40px auto',
            height: '14px',      // barra mais grossa
            backgroundColor: '#e5e7eb',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: getProgressWidth(),
              height: '100%',
              backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
              transition: 'all 0.5s ease',
            }}
          ></div>
        </div>

        {/* === Main Content (com scroll se necessário) === */}
        <div className="flex-grow overflow-y-auto flex flex-col items-center mt-5 styled-scrollbar">
          <div className="flex justify-center items-center gap-12 mb-10 md:flex-row flex-col">
            <div className="w-48 relative">
              <img src={robotImage} alt="Robô Amigável" className="w-full float" />
              {showBubble && (
                <div className="absolute top-1/2 transform -translate-y-1/2 -left-48 w-48 text-left float">
                  <div className="speech-bubble">{typedText}</div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 w-96">
              {step === 1 && allLevels.map(level => (
                <button
                  key={level}
                  className={`
                    text-lg font-semibold py-6 px-12 border-none rounded-3xl cursor-pointer
                    bg-white shadow-md text-gray-700 text-left transition transform duration-200
                    hover:-translate-y-0.5 hover:shadow-lg
                    ${selections.level === level ? 'text-white' : ''}
                  `}
                  style={selections.level === level
                    ? { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)' }
                    : {}
                  }
                  onClick={() => handleSelection('level', level)}
                >
                  <div className="flex items-center">
                    <img src={levelIcons[level]} alt={`Ícone de ${level}`} className="w-8 h-8 mr-6 flex-shrink-0" />
                    <span className="block font-semibold">{level}</span>
                  </div>
                </button>
              ))}

              {step === 2 && allCategories.map(category => (
                <button
                  key={category}
                  className={`
                    text-lg font-semibold py-6 px-12 border-none rounded-3xl cursor-pointer
                    bg-white shadow-md text-gray-700 text-left transition transform duration-200
                    hover:-translate-y-0.5 hover:shadow-lg
                    ${selections.category === category ? 'text-white' : ''}
                  `}
                  style={selections.category === category
                    ? { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)' }
                    : {}
                  }
                  onClick={() => handleSelection('category', category)}
                >
                  <div className="flex items-center">
                    <img src={categoryIcons[category]} alt={`Ícone de ${category}`} className="w-8 h-8 mr-6 flex-shrink-0" />
                    <span className="block font-semibold">{category}</span>
                  </div>
                </button>
              ))}

              {step === 3 && allTimes.map(time => (
                <button
                  key={time}
                  className={`
                    text-lg font-semibold py-6 px-12 border-none rounded-3xl cursor-pointer
                    bg-white shadow-md text-gray-700 text-left transition transform duration-200
                    hover:-translate-y-0.5 hover:shadow-lg
                    ${selections.time === time ? 'text-white' : ''}
                  `}
                  style={selections.time === time
                    ? { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)' }
                    : {}
                  }
                  onClick={() => handleSelection('time', time)}
                >
                  <div className="flex items-center">
                    <span className="block font-semibold">{time}</span>
                  </div>
                </button>
              ))}

              {step === 4 && allChoices.map(choice => (
                <button
                  key={choice}
                  className={`
                    text-lg font-semibold py-6 px-12 border-none rounded-3xl cursor-pointer
                    bg-white shadow-md text-gray-700 text-left transition transform duration-200
                    hover:-translate-y-0.5 hover:shadow-lg
                    ${selections.choice === choice ? 'text-white' : ''}
                  `}
                  style={selections.choice === choice
                    ? { backgroundImage: 'linear-gradient(90deg, #f9a5ff, #c3a1ff)', boxShadow: '0 4px 15px rgba(181, 130, 255, 0.4)' }
                    : {}
                  }
                  onClick={() => handleSelection('choice', choice)}
                >
                  <div className="flex items-center">
                    <img src={choiceIcons[choice]} alt={`Ícone de ${choice}`} className="w-8 h-8 mr-6 flex-shrink-0" />
                    <div className="flex-grow text-left">
                      <span className="block font-semibold">{choice}</span>
                      <span className="block text-sm">
                        {choice === 'Começar do zero'
                          ? 'comece a praticar libras'
                          : 'descubra seu nível em libras'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* === Footer === */}
        <hr className="my-0 mb-4" />
        <div className={`pt-4 flex items-center flex-shrink-0 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
          {step > 1 && (
            <button
              className="text-lg font-semibold py-4 px-12 border-none rounded-3xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
              }}
              onClick={handlePrevStep}
            >
              Voltar
            </button>
          )}
          <button
            className="text-lg font-semibold py-4 px-12 border-none rounded-3xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
            style={{
              backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
              boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
              marginLeft: step > 1 ? 'auto' : '0'
            }}
            onClick={handleNextStep}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
