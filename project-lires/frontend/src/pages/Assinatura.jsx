import React, { useState, useEffect, Fragment } from 'react';
import { useSettings } from '../components/SettingsContext';

// Importa a imagem do robô (com o nome correto dos seus assets)
import robotMasterImage from '../assets/robo-premium2.png'; 
import liresMasterLogoImg from '../assets/lires-master-logo.png'; // Logo do card

// --- Animações (Sem alteração) ---
const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
`;
const shineAnimation = `
  @keyframes shine {
    0% { transform: translateX(-100%) skewX(-25deg); }
    100% { transform: translateX(200%) skewX(-25deg); }
  }
  .shine-effect::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0.6;
    transform: translateX(-100%) skewX(-25deg);
    animation: shine 4s infinite 2s;
  }
`;

// --- Ícones SVG (Sem alteração) ---
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="12" cy="12" r="12" fill="url(#grad-check)"/>
    <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad-check" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);
const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="12" cy="12" r="12" fill="url(#grad-plus)"/>
    <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad-plus" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

// --- INÍCIO DA MODIFICAÇÃO (Função de Copiar) ---
const copyToClipboard = (text, onSuccess) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; 
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            onSuccess();
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
    }
    document.body.removeChild(textArea);
};
// --- FIM DA MODIFICAÇÃO ---

// --- INÍCIO DA MODIFICAÇÃO (Modal de Pagamento PIX) ---
const SubscriptionModal = ({ isOpen, onClose, onPaymentSuccess, theme }) => {
    // --- ALTERADO: 'splash' é o padrão ---
    const [modalScreen, setModalScreen] = useState('splash'); // 'splash', 'plans', 'pix', 'success'
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    
    // Lista de benefícios (usada em 2 telas)
    const beneficiosMaster = [
        "Sem anúncios",
        "Avatares e recompensas exclusivas",
        "Acesso a todos os módulos sem bloqueio",
        "Baixar lições e vídeos para estudar sem internet",
        "Conquistas exclusivas para assinantes",
        "+ E muito mais"
    ];

    const handleClose = () => {
        onClose();
        setTimeout(() => setModalScreen('splash'), 300); // Reseta para a tela 'splash'
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setModalScreen('pix');
    };

    const handleCopy = () => {
        const pixCopiaECola = `00020126580014br.gov.bcb.pix0136caua.arthur2006@gmail.com5204000053039865405${selectedPlan.price.toFixed(2)}5802BR5910Caua Ramos6009SAO PAULO62070503***6304E5B9`;
        copyToClipboard(pixCopiaECola, () => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000); 
        });
    };

    const handleConfirmPayment = () => {
        console.log("Simulando verificação de pagamento...");
        onPaymentSuccess();
        setModalScreen('success');
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 font-poppins"
            onClick={handleClose}
        >
            {/* Fundo de Espaço */}
            <div 
                className="absolute inset-0 bg-blue-900 overflow-hidden"
                style={{
                    background: 'radial-gradient(circle at 10% 20%, rgb(39, 53, 131) 0%, rgb(18, 24, 73) 90%)'
                }}
            >
                {/* Planetas (como no protótipo) */}
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-800 rounded-full opacity-50"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-blue-800 rounded-full opacity-40"></div>
                <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-pink-500 rounded-full opacity-30"></div>
            </div>

            <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-white text-4xl font-bold opacity-70 hover:opacity-100 z-10"
            >
                &times;
            </button>

            {/* Conteúdo do Modal */}
            <div 
                className="relative z-10 w-full max-w-4xl text-white"
                onClick={e => e.stopPropagation()} 
            >
                
                {/* --- TELA 1: SPLASH (image_8d5a20.jpg) --- */}
                {modalScreen === 'splash' && (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-6">
                        {/* Robô */}
                        <div className="md:w-1/2">
                            <img 
                                src={robotMasterImage} 
                                alt="Robô Master"
                                className="w-full max-w-sm"
                                style={{ animation: 'float 3s ease-in-out infinite' }}
                            />
                        </div>
                        {/* Benefícios */}
                        <div className="md:w-1/2 flex flex-col items-center md:items-start">
                            <img src={liresMasterLogoImg} alt="Líres Master" className="w-48 mb-2" />
                            <h2 className="text-3xl font-bold mb-6">Aprenda Libras <span className="text-yellow-300">SEM LIMITES!</span></h2>
                            
                            <div className={`rounded-2xl p-6 mb-6 w-full max-w-sm ${theme === 'escuro' ? 'bg-blue-900/50' : 'bg-blue-800/80 backdrop-blur-sm'}`}>
                                <h3 className="font-bold text-xl mb-4 text-center">Benefícios</h3>
                                <ul className="space-y-2">
                                    {/* Mapeia os 5 benefícios + "e muito mais" */}
                                    {beneficiosMaster.map(b => (
                                        <li key={b} className="flex items-center gap-3">
                                            {b.startsWith('+') ? <PlusIcon /> : <CheckIcon />}
                                            <span className="text-sm">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <button 
                                onClick={() => setModalScreen('plans')}
                                className="font-bold py-3 px-10 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 bg-white text-purple-700"
                            >
                                Conheça os planos
                            </button>
                        </div>
                    </div>
                )}
                
                {/* --- TELA 2: PLANOS (image_8d59a9.jpg) --- */}
                {modalScreen === 'plans' && (
                    <div className="flex flex-col items-center">
                        <img src={liresMasterLogoImg} alt="Líres Master" className="w-48 mb-4" />
                        <h2 className="text-3xl font-bold mb-8">Planos de assinatura</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <PlanCard 
                                title="Mensal"
                                price="19,90"
                                benefits={["Sem anúncios", "Avatares e recompensas", "Conquistas exclusivas"]}
                                onSelect={() => handlePlanSelect({ name: 'Mensal', price: 19.90 })}
                                theme={theme}
                            />
                            <PlanCard 
                                title="Trimestral"
                                price="49,90"
                                priceSubtitle="(R$16,90/mês)"
                                benefits={["Tudo do plano mensal", "+ Baixar lições e vídeos", "+ 1 personalização de avatar"]}
                                onSelect={() => handlePlanSelect({ name: 'Trimestral', price: 49.90 })}
                                theme={theme}
                            />
                            <PlanCard 
                                title="Anual"
                                price="109,90"
                                priceSubtitle="(R$14,10/mês)"
                                benefits={["Tudo do plano trimestral", "+ Certificado digital", "+ Conquistas raras", "+ Acesso antecipado"]}
                                onSelect={() => handlePlanSelect({ name: 'Anual', price: 109.90 })}
                                theme={theme}
                                isFeatured={true}
                            />
                        </div>
                    </div>
                )}
                
                {/* --- TELA 3: PAGAMENTO PIX --- */}
                {modalScreen === 'pix' && (
                    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white text-gray-900">
                        <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">
                            Pagamento PIX ({selectedPlan.name})
                        </h2>
                        <div className="flex flex-col items-center">
                            <img 
                                src={`https://placehold.co/250x250/ffffff/333333?text=QR+Code+PIX\n(Simula%C3%A7%C3%A3o)&font=roboto`}
                                alt="QR Code PIX Simulado"
                                className="w-48 h-48 rounded-lg"
                            />
                            <p className="mt-4 font-semibold text-gray-600">
                                Chave E-mail: <span className='font-bold text-purple-700'>caua.arthur2006@gmail.com</span>
                            </p>

                            <div className="w-full mt-4">
                                <textarea
                                    readOnly
                                    value={`00020126580014br.gov.bcb.pix0136caua.arthur2006@gmail.com5204000053039865405${selectedPlan.price.toFixed(2)}5802BR5910Caua Ramos6009SAO PAULO62070503***6304E5B9`}
                                    className="w-full p-2 rounded-lg border text-sm resize-none bg-gray-100 border-gray-300 text-gray-700"
                                    rows={3}
                                />
                                <button
                                    onClick={handleCopy}
                                    className={`w-full mt-2 font-semibold py-2 px-4 rounded-lg transition-colors ${
                                        copySuccess 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-purple-500 text-white hover:bg-purple-600'
                                    }`}
                                >
                                    {copySuccess ? 'Copiado! ✓' : 'Copiar Chave'}
                                </button>
                                <button
                                    onClick={handleConfirmPayment}
                                    className="w-full mt-4 bg-green-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-600 transition-colors"
                                >
                                    Já paguei
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* --- TELA 4: SUCESSO --- */}
                {modalScreen === 'success' && (
                    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white text-gray-900 text-center">
                        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-3xl font-bold text-purple-600 my-4">Pagamento Confirmado!</h2>
                        <p className="text-lg text-gray-700 mb-6">Parabéns! Você agora é um Lires Master. Aproveite todos os benefícios.</p>
                        <button
                            onClick={handleClose}
                            className="bg-purple-500 text-white font-semibold py-2 px-8 rounded-full hover:bg-purple-600 transition-colors"
                        >
                            Fechar
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
// --- FIM DA MODIFICAÇÃO ---


// Componente de Card de Plano
const PlanCard = ({ title, price, priceSubtitle, benefits, onSelect, theme, isFeatured = false }) => (
    <div className={`
        rounded-2xl p-6 flex flex-col border-2
        ${isFeatured 
            ? 'bg-yellow-400 text-gray-900 border-yellow-500 scale-105' 
            : (theme === 'escuro' ? 'bg-blue-900/50 border-blue-700' : 'bg-blue-800/80 border-blue-500 backdrop-blur-sm')}
    `}>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className={`text-5xl font-extrabold mb-1 ${isFeatured ? 'text-gray-800' : 'text-white'}`}>R$ {price}</p>
        {priceSubtitle && <p className={`text-sm mb-4 ${isFeatured ? 'text-gray-700' : 'text-blue-100'}`}>{priceSubtitle}</p>}
        
        <ul className="space-y-2 mb-6 min-h-[100px]">
            {benefits.map(b => (
                <li key={b} className="flex items-center gap-2">
                    {/* --- INÍCIO DA MODIFICAÇÃO (Ícone de Check Verde) --- */}
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    {/* --- FIM DA MODIFICAÇÃO --- */}
                    <span className="text-sm">{b}</span>
                </li>
            ))}
        </ul>
        
        <button 
            onClick={onSelect}
            className={`mt-auto font-bold py-2 px-8 rounded-full transition-colors ${
                isFeatured 
                ? 'bg-gray-900 text-white hover:bg-black' 
                : 'bg-white text-purple-700 hover:bg-purple-100'
            }`}
        >
            Assinar agora
        </button>
    </div>
);



export default function Assinatura() {
  const { theme } = useSettings();
  const [animationClass, setAnimationClass] = useState('');
  const [isMaster, setIsMaster] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setAnimationClass('anim-enter');
    const userString = localStorage.getItem('currentUser');
    if (userString) {
        const user = JSON.parse(userString);
        setIsMaster(user.isMaster || false);
    }
  }, []);

  const handlePaymentSuccess = () => {
    const userString = localStorage.getItem('currentUser');
    const dbString = localStorage.getItem('liresUsersDB');
    if (userString && dbString) {
        const currentUser = JSON.parse(userString);
        const liresUsersDB = JSON.parse(dbString);

        const updatedUser = { ...currentUser, isMaster: true };
        const updatedDB = liresUsersDB.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));
    }
    setIsMaster(true); 
  };

  const handleResetMaster = () => {
    console.log("Resetando status Master...");
    
    const userString = localStorage.getItem('currentUser');
    const dbString = localStorage.getItem('liresUsersDB');
    if (!userString || !dbString) {
        console.error("Não foi possível resetar: usuário ou DB não encontrado.");
        return;
    }

    const currentUser = JSON.parse(userString);
    const liresUsersDB = JSON.parse(dbString);

    const updatedUser = { ...currentUser, isMaster: false };
    const updatedDB = liresUsersDB.map(user => 
        user.id === currentUser.id ? updatedUser : user
    );

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));

    setIsMaster(false);
  };


  const beneficios = [
    "Sem anúncios",
    "Avatares e recompensas exclusivas",
    "Acesso a todos os módulos sem bloqueio",
    "Baixar lições e vídeos para estudar sem internet",
    "Conquistas exclusivas para assinantes"
  ];

  // --- Classes de Estilo (Sem alteração) ---
  const mainTitleClasses = theme === 'escuro'
    ? 'text-purple-400 font-bold text-4xl md:text-5xl mb-8'
    : 'text-purple-600 font-bold text-4xl md:text-5xl mb-8';

  const cardClasses = theme === 'escuro'
    ? 'bg-gray-800 rounded-lg shadow-md p-6 md:p-10'
    : 'bg-white rounded-lg shadow-md p-6 md:p-10';

  const boxTitleClasses = theme === 'escuro'
    ? 'text-purple-400 font-bold text-xl md:text-2xl lg:text-3xl mb-4'
    : 'text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl mb-4';

  const dividerClasses = theme === 'escuro'
    ? 'w-full h-px bg-gray-700 mb-6' 
    : 'w-full h-px bg-blue-400 mb-6'; 

  const sectionTitleClasses = theme === 'escuro'
    ? 'text-purple-400 font-bold text-2xl md:text-3xl mb-6'
    : 'text-purple-600 font-bold text-2xl md:text-3xl mb-6';

  const benefitTextClasses = theme === 'escuro'
    ? 'text-gray-300 text-lg'
    : 'text-gray-700 text-lg';
  
  return (
    <Fragment>
      <div className={`content-box w-full ${animationClass}`}>
        <style>{floatAnimation}{shineAnimation}</style>
        
        <div className="flex justify-between items-center mb-8">
            <h1 className={mainTitleClasses}>
                Assinatura
            </h1>
            {isMaster && (
                <button
                    onClick={handleResetMaster}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full text-xs hover:bg-red-700"
                    title="Resetar status Master (para debug)"
                >
                    Resetar (Debug)
                </button>
            )}
        </div>
        
        <div className={cardClasses}> 
          <h2 className={boxTitleClasses}>
            Escolha seu plano
          </h2>
          <div className={dividerClasses}></div>
          
          <div className="relative rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden shine-effect"
               style={{ background: 'linear-gradient(110deg, #4F46E5 0%, #A855F7 100%)', boxShadow: '0 10px 30px rgba(129, 93, 248, 0.4)' }}>
            
            <div className="md:w-3/5 text-white text-center md:text-left z-10">
              <span className="inline-block bg-purple-900 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                LÍRES MASTER
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
                Aprenda Libras <span className="underline decoration-yellow-300">SEM LIMITES!</span>
              </h3>
              <p className="text-lg text-purple-100 mb-6">
                Mais conteúdo, mais prática e recursos exclusivos para acelerar seu aprendizado.
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                disabled={isMaster}
                className={`font-bold py-3 px-10 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 ${
                    isMaster 
                    ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                    : 'bg-white text-purple-700'
                }`}
              >
                {isMaster ? 'Você já é Master!' : 'Assinar agora'}
              </button>
            </div>

            <div className="md:w-2/5 flex justify-center mt-8 md:mt-0 z-10">
              <img 
                src={robotMasterImage} 
                alt="Robô Lires Master" 
                className="w-56 h-56 lg:w-64 lg:h-64 object-contain" 
                style={{ animation: 'float 3s ease-in-out infinite' }}
              />
            </div>
          </div> 

          <div className="mt-12">
            <h2 className={sectionTitleClasses}>
              Benefícios do plano LÍRES MASTER
            </h2>

            <ul className="space-y-4">
              {beneficios.map((beneficio) => (
                <li key={beneficio} className="flex items-center space-x-3">
                  <CheckIcon />
                  <span className={benefitTextClasses}>
                    {beneficio}
                  </span>
                </li>
              ))}
              <li className="flex items-center space-x-3">
                <PlusIcon />
                <span className={benefitTextClasses}>
                  E muito mais
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        theme={theme}
      />
    </Fragment>
  );
}