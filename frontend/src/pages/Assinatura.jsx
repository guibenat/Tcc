import React, { useState, useEffect, Fragment, useRef } from 'react';
// 1. CORREÇÃO: Importar APENAS o useSettings
import { useSettings } from '../components/SettingsContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Importa a imagem do robô
import robotMasterImage from '../assets/robo-premium2.png'; 
import liresMasterLogoImg from '../assets/lires-master-logo.png'; 

// --- Animações (Limpas e Corrigidas) ---
const floatAnimation = `
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
`;
const shineAnimation = `
  @keyframes shine { 0% { transform: translateX(-100%) skewX(-25deg); } 100% { transform: translateX(200%) skewX(-25deg); } }
  .shine-effect::after { content: ''; position: absolute; top: 0; left: 0; width: 50%; height: 100%; background: linear-gradient( to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100% ); opacity: 0.6; transform: translateX(-100%) skewX(-25deg); animation: shine 4s infinite 2s; }
`;
const spaceAnimations = `
  @keyframes fadeInBackdrop { from { opacity: 0; } to { opacity: 1; } }
  @keyframes zoomInModal { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes moveStars { from { background-position: 0 0; } to { background-position: -10000px 5000px; } }
  @keyframes shootingStar { 0% { transform: translateX(300px) translateY(-300px) rotate(315deg); opacity: 1; height: 1px; width: 80px; } 70% { opacity: 1; } 100% { transform: translateX(-300px) translateY(300px) rotate(315deg); opacity: 0; height: 1px; width: 80px; } }
  @keyframes shootingStar2 { 0% { transform: translateX(0px) translateY(0px) rotate(315deg); opacity: 1; height: 1px; width: 120px; } 70% { opacity: 1; } 100% { transform: translateX(-500px) translateY(500px) rotate(315deg); opacity: 0; height: 1px; width: 120px; } }
`;

// --- Ícones SVG ---
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

// --- Função de Copiar (Helper) ---
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

// --- Componente de Fundo Animado (Usado no modal) ---
const AnimatedSpaceBackground = () => (
    <div 
        className="absolute inset-0 overflow-hidden"
        style={{
            background: 'radial-gradient(circle at 10% 20%, rgb(39, 53, 131) 0%, rgb(18, 24, 73) 90%)'
        }}
    >
        {/* ... (código das estrelas e planetas) ... */}
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'0.5\' fill=\'%23FFFFFF\'/%3E%3Ccircle cx=\'75\' cy=\'75\' r=\'0.5\' fill=\'%23FFFFFF\'/%3E%3Ccircle cx=\'50\' cy=\'10\' r=\'0.5\' fill=\'%23FFFFFF\'/%3E%3Ccircle cx=\'10\' cy=\'80\' r=\'0.5\' fill=\'%23FFFFFF\'/%3E%3Ccircle cx=\'85\' cy=\'50\' r=\'0.5\' fill=\'%23FFFFFF\'/%3E%3Ccircle cx=\'40\' cy=\'60\' r=\'0.5\' fill=\'%23FFFFFF\'/%3E%3C/svg%3E")', backgroundSize: '400px 400px', animation: 'moveStars 150s linear infinite', opacity: 0.5 }} />
        <div className="absolute top-1/2 left-1/2 w-1 h-80 opacity-0" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0))', filter: 'blur(1px)', animation: 'shootingStar 10s ease-in-out 3s infinite' }} />
        <div className="absolute top-1/4 left-1/4 w-1 h-80 opacity-0" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0))', filter: 'blur(1px)', animation: 'shootingStar2 12s ease-in-out 7s infinite' }} />
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, #a5b4fc, #312e81)', animation: 'spin 120s linear infinite reverse' }} />
        <div className="absolute -bottom-[5%] -right-[5%] w-[400px] h-[400px]" style={{ animation: 'spin 80s linear infinite' }} >
            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 70% 70%, #f0abfc, #a855f7)' }} />
            <div className="absolute inset-0 border-8 border-purple-300/30 rounded-full" style={{ transform: 'rotateX(70deg) scaleY(0.4)', borderLeftColor: 'transparent', borderRightColor: 'transparent' }} />
        </div>
        <div className="absolute top-[15%] right-[10%] w-[150px] h-[150px] rounded-full" style={{ background: 'radial-gradient(circle at 40% 40%, #fb7185, #be185d)', animation: 'spin 90s linear infinite' }} />
    </div>
);

// --- Componente de Card de Plano (Helper) ---
// 3. CORREÇÃO: Uso de backticks (`) para o className que usa ${isFeatured}
const PlanCard = ({ title, price, priceSubtitle, benefits, onSelect, theme, isFeatured = false }) => (
    <div className={`
        rounded-2xl p-6 flex flex-col border-2
        ${isFeatured 
            ? 'bg-yellow-400 text-gray-900 border-yellow-500 scale-105' 
            : (theme === 'escuro' ? 'bg-blue-900/50 border-blue-700' : 'bg-blue-800/80 backdrop-blur-sm')}
    `}>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className={`text-5xl font-extrabold mb-1 ${isFeatured ? 'text-gray-800' : 'text-white'}`}>R$ {price}</p>
        {priceSubtitle && <p className={`text-sm mb-4 ${isFeatured ? 'text-gray-700' : 'text-blue-100'}`}>{priceSubtitle}</p>}
        
        <ul className="space-y-2 mb-6 min-h-[100px]">
            {benefits.map(b => (
                <li key={b} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
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

// --- Componente de Modal de Assinatura ---
const SubscriptionModal = ({ isOpen, onClose, onPaymentSuccess, theme }) => {
    // ... (código interno do modal: splash, plans, pix, success) ...
    const [modalScreen, setModalScreen] = useState('splash'); 
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [pixCopiaECola, setPixCopiaECola] = useState('');
    const [countdown, setCountdown] = useState(300);
    const timerRef = useRef(null);
    
    const pixKey = "9f72d0ff-7040-451c-9f74-332aad73e277"; 

    const beneficiosMaster = [
        "Sem anúncios", "Avatares e recompensas exclusivas", "Acesso a todos os módulos sem bloqueio",
        "Baixar lições e vídeos para estudar sem internet", "Conquistas exclusivas para assinantes", "+ E muito mais"
    ];

    const handleClose = () => {
        onClose();
        clearInterval(timerRef.current); 
        setTimeout(() => setModalScreen('splash'), 300); 
    };

    const generatePix = (plan) => {
        const pixString = `00020126580014br.gov.bcb.pix0136${pixKey}5204000053039865405${plan.price.toFixed(2)}5802BR5910Caua Ramos6009SAO PAULO62070503***6304E5B9`;
        setPixCopiaECola(pixString);
        const qrData = encodeURIComponent(pixString);
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`);
        setCountdown(300);
    };

    useEffect(() => {
        if (countdown > 0 && modalScreen === 'pix') {
            timerRef.current = setInterval(() => {
                setCountdown(c => c - 1);
            }, 1000);
        } else if (countdown === 0) {
            clearInterval(timerRef.current);
            setQrCodeUrl(''); 
        }
        return () => clearInterval(timerRef.current); 
    }, [countdown, modalScreen]);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        generatePix(plan); 
        setModalScreen('pix');
    };

    const handleCopy = () => {
        copyToClipboard(pixCopiaECola, () => { 
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000); 
        });
    };

    const handleConfirmPayment = () => {
        console.log("Simulando verificação de pagamento...");
        clearInterval(timerRef.current); 
        onPaymentSuccess(selectedPlan); 
        setModalScreen('success'); 
    };

    if (!isOpen) return null;

    const minutes = Math.floor(countdown / 60);
    const seconds = ('0' + (countdown % 60)).slice(-2);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 font-poppins"
            style={{ animation: 'fadeInBackdrop 0.5s ease-out forwards' }}
            onClick={handleClose}
        >
            <AnimatedSpaceBackground />

            <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-white text-4xl font-bold opacity-70 hover:opacity-100 z-10"
            >
                &times;
            </button>

            <div 
                className="relative z-10 w-full max-w-4xl text-white"
                style={{ animation: 'zoomInModal 0.4s 0.1s ease-out forwards', opacity: 0 }} 
                onClick={e => e.stopPropagation()} 
            >
                
                {modalScreen === 'splash' && (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-6">
                        {/* ... (Conteúdo da tela Splash) ... */}
                        <div className="md:w-1/2">
                            <img src={robotMasterImage} alt="Robô Master" className="w-full max-w-sm" style={{ animation: 'float 3s ease-in-out infinite' }} />
                        </div>
                        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                            <img src={liresMasterLogoImg} alt="Líres Master" className="w-48 mb-2" />
                            <h2 className="text-3xl font-bold mb-6">Aprenda Libras <span className="text-yellow-300">SEM LIMITES!</span></h2>
                            <div className={`rounded-2xl p-6 mb-6 w-full max-w-sm ${theme === 'escuro' ? 'bg-blue-900/50' : 'bg-blue-800/80 backdrop-blur-sm'}`}>
                                <h3 className="font-bold text-xl mb-4 text-center">Benefícios</h3>
                                <ul className="space-y-2">
                                    {beneficiosMaster.map(b => (
                                        <li key={b} className="flex items-center gap-3">
                                            {b.startsWith('+') ? <PlusIcon /> : <CheckIcon />}
                                            <span className="text-sm">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => setModalScreen('plans')} className="font-bold py-3 px-10 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 bg-white text-purple-700">
                                Conheça os planos
                            </button>
                        </div>
                    </div>
                )}
                
                {modalScreen === 'plans' && (
                    <div className="flex flex-col items-center">
                        {/* ... (Conteúdo da tela Planos com PlanCard) ... */}
                        <img src={liresMasterLogoImg} alt="Líres Master" className="w-48 mb-4" />
                        <h2 className="text-3xl font-bold mb-8">Planos de assinatura</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <PlanCard title="Mensal" price="19,90" benefits={["Sem anúncios", "Avatares e recompensas", "Conquistas exclusivas"]} onSelect={() => handlePlanSelect({ name: 'Mensal', price: 19.90 })} theme={theme} />
                            <PlanCard title="Trimestral" price="49,90" priceSubtitle="(R$16,90/mês)" benefits={["Tudo do plano mensal", "+ Baixar lições e vídeos", "+ 1 personalização de avatar"]} onSelect={() => handlePlanSelect({ name: 'Trimestral', price: 49.90 })} theme={theme} />
                            <PlanCard title="Anual" price="109,90" priceSubtitle="(R$14,10/mês)" benefits={["Tudo do plano trimestral", "+ Certificado digital", "+ Conquistas raras", "+ Acesso antecipado"]} onSelect={() => handlePlanSelect({ name: 'Anual', price: 109.90 })} theme={theme} isFeatured={true} />
                        </div>
                    </div>
                )}
                
                {modalScreen === 'pix' && (
                    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white text-gray-900">
                        {/* ... (Conteúdo da tela PIX com QR Code, Timer e Copia/Cola) ... */}
                        <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Pagamento PIX ({selectedPlan.name})</h2>
                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 rounded-lg bg-gray-100 flex items-center justify-center">
                                {countdown > 0 && qrCodeUrl ? (
                                    <img src={qrCodeUrl} alt="QR Code PIX" className="w-48 h-48 rounded-lg" />
                                ) : (
                                    <div className="text-center p-4"><p className="font-bold text-red-500">QR Code Expirado!</p><p className="text-sm text-gray-600">Clique abaixo para gerar um novo.</p></div>
                                )}
                            </div>
                            {countdown > 0 ? (
                                <p className="mt-2 font-semibold text-lg text-blue-600">Expira em: {minutes}:{seconds}</p>
                            ) : (
                                <p className="mt-2 font-semibold text-lg text-red-500">Expirado</p>
                            )}
                            {countdown === 0 && (
                                <button onClick={() => generatePix(selectedPlan)} className="w-full mt-4 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors">
                                    Gerar Novo Código
                                </button>
                            )}
                            <p className="mt-4 font-semibold text-gray-600 text-center">Chave PIX: <br/><span className='font-bold text-purple-700 text-xs break-all'>{pixKey}</span></p>
                            <div className="w-full mt-4">
                                <textarea readOnly value={pixCopiaECola} className="w-full p-2 rounded-lg border text-sm resize-none bg-gray-100 border-gray-300 text-gray-700" rows={3} />
                                <button onClick={handleCopy} className={`w-full mt-2 font-semibold py-2 px-4 rounded-lg transition-colors ${copySuccess ? 'bg-green-500 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'}`}>
                                    {copySuccess ? 'Copiado! ✓' : 'Copiar Chave'}
                                </button>
                                {countdown > 0 && (
                                    <button onClick={handleConfirmPayment} className="w-full mt-4 bg-green-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-600 transition-colors">
                                        Já paguei
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {modalScreen === 'success' && (
                    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white text-gray-900 text-center">
                        {/* ... (Conteúdo da tela Sucesso) ... */}
                        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h2 className="text-3xl font-bold text-purple-600 my-4">Pagamento Confirmado!</h2>
                        <p className="text-lg text-gray-700 mb-6">Parabéns! Você agora é um Lires Master. Aproveite todos os benefícios.</p>
                        <button onClick={handleClose} className="bg-purple-500 text-white font-semibold py-2 px-8 rounded-full hover:bg-purple-600 transition-colors">
                            Fechar
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};


export default function Assinatura() {
  // 2. CORREÇÃO: Puxar os setters do hook useSettings()
  const { 
    theme, 
    // Removidos os setters de progresso (não são usados aqui)
  } = useSettings();
  
  const [animationClass, setAnimationClass] = useState('');
  
  // Estados de Assinatura
  const [isMaster, setIsMaster] = useState(false);
  const [userPlan, setUserPlan] = useState(null); 
  const [subscriptionDate, setSubscriptionDate] = useState(null);
  const [isCanceled, setIsCanceled] = useState(false); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carrega o status de Master no início
  useEffect(() => {
    setAnimationClass('anim-enter');
    const userString = localStorage.getItem('currentUser');
    if (userString) {
        const user = JSON.parse(userString);
        setIsMaster(user.isMaster || false);
        setUserPlan(user.planType || null);
        setSubscriptionDate(user.subscriptionStartDate || null);
        setIsCanceled(user.subscriptionCanceled || false);
    }
  }, []);

  /**
   * Salva o status de Master e os detalhes do plano no localStorage
   */
  const handlePaymentSuccess = (plan) => {
    const userString = localStorage.getItem('currentUser');
    const dbString = localStorage.getItem('liresUsersDB');
    if (userString && dbString) {
        const currentUser = JSON.parse(userString);
        const liresUsersDB = JSON.parse(dbString);

        // Salva os novos dados da assinatura
        const updatedUser = { 
            ...currentUser, 
            isMaster: true,
            planType: plan.name, // Ex: 'Anual'
            subscriptionStartDate: Date.now(), // Data de início
            subscriptionCanceled: false // Reseta o cancelamento (caso esteja re-assinando)
        };
        
        const updatedDB = liresUsersDB.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));
        
        // Atualiza o estado local para a UI reagir
        setIsMaster(true); 
        setUserPlan(plan.name);
        setSubscriptionDate(Date.now());
        setIsCanceled(false);
    }
  };

  // Helpers de Estilo para o Swal (Pop-up de confirmação)
  const getSwalCustomClasses = (type = 'info') => ({
    popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
    title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
    htmlContainer: `${theme === 'escuro' ? 'text-slate-300' : 'text-slate-700'}`,
    confirmButton: `${type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'} font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105`,
    cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
  });
  const getSwalBackground = () => (theme === 'escuro' ? '#1f2937' : '#fff');
  
  /**
   * Calcula a data de término do plano (Helper)
   */
  const getExpirationDate = () => {
    if (!subscriptionDate || !userPlan) return null;
    
    const endDate = new Date(subscriptionDate);
    if (userPlan === 'Mensal') endDate.setMonth(endDate.getMonth() + 1);
    else if (userPlan === 'Trimestral') endDate.setMonth(endDate.getMonth() + 3);
    else if (userPlan === 'Anual') endDate.setFullYear(endDate.getFullYear() + 1);
    
    return endDate.toLocaleDateString('pt-BR');
  };

  /**
   * Lógica de Cancelamento (Agenda o cancelamento)
   */
  const handleCancelSubscription = () => {
    const expirationDateString = getExpirationDate();

    Swal.fire({
        title: 'Cancelar Assinatura?',
        html: `Seu plano ${userPlan} continuará ativo e com todos os benefícios até <strong>${expirationDateString}</strong>. Após essa data, ele não será renovado. <br/><br/>Deseja confirmar o cancelamento?`,
        icon: 'warning',
        iconColor: '#f87171',
        showCancelButton: true,
        confirmButtonText: 'Sim, cancelar',
        cancelButtonText: 'Manter',
        customClass: getSwalCustomClasses('danger'), 
        buttonsStyling: false,
        background: getSwalBackground()
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Agendando cancelamento...");
            
            const userString = localStorage.getItem('currentUser');
            const dbString = localStorage.getItem('liresUsersDB');
            if (!userString || !dbString) return;

            const currentUser = JSON.parse(userString);
            const liresUsersDB = JSON.parse(dbString);

            // Marca 'subscriptionCanceled: true', MAS MANTÉM 'isMaster: true'
            const updatedUser = { ...currentUser, subscriptionCanceled: true };
            const updatedDB = liresUsersDB.map(user => 
                user.id === currentUser.id ? updatedUser : user
            );

            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));

            setIsCanceled(true); // Atualiza a UI localmente
            
            Swal.fire({
                title: 'Cancelamento Agendado',
                text: `Sua assinatura foi cancelada e não será renovada. Seus benefícios continuam até ${expirationDateString}.`,
                icon: 'success',
                customClass: getSwalCustomClasses(),
                buttonsStyling: false,
                background: getSwalBackground()
            });
        }
    });
  };

  // --- Função de DEBUG (Resetar APENAS Assinatura) ---
  const handleDebugResetSubscription = () => {
    Swal.fire({
        title: 'Resetar Assinatura? (Debug)',
        text: "Isso vai remover seu status Master e dados do plano, mas manterá seu progresso e Lcoins.",
        icon: 'error',
        iconColor: '#ef4444',
        showCancelButton: true,
        confirmButtonText: 'Sim, Resetar Assinatura',
        cancelButtonText: 'Cancelar',
        customClass: getSwalCustomClasses('danger'), 
        buttonsStyling: false,
        background: getSwalBackground()
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("--- RESETANDO APENAS ASSINATURA ---");

            const userString = localStorage.getItem('currentUser');
            if (!userString) return; 
            const currentUser = JSON.parse(userString);
            
            // Reseta apenas os campos da assinatura
            const resetUser = {
                ...currentUser,
                isMaster: false,
                planType: null,
                subscriptionStartDate: null,
                subscriptionCanceled: false,
            };

            // Atualiza o 'currentUser' e o 'liresUsersDB'
            localStorage.setItem('currentUser', JSON.stringify(resetUser));
            
            const dbString = localStorage.getItem('liresUsersDB');
            const liresUsersDB = dbString ? JSON.parse(dbString) : [];
            const updatedDB = liresUsersDB.map(user => 
                user.id === currentUser.id ? resetUser : user
            );
            localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));

            // Atualiza o estado local para a UI reagir
            setIsMaster(false);
            setUserPlan(null);
            setSubscriptionDate(null);
            setIsCanceled(false);
        }
    });
  };
  // --- Fim da Função de Debug ---

  const beneficios = [
    "Sem anúncios",
    "Avatares e recompensas exclusivas",
    "Acesso a todos os módulos sem bloqueio",
    "Baixar lições e vídeos para estudar sem internet",
    "Conquistas exclusivas para assinantes"
  ];

  // --- Classes de Estilo ---
  const mainTitleClasses = theme === 'escuro' ? 'text-purple-400 font-bold text-4xl md:text-5xl mb-8' : 'text-purple-600 font-bold text-4xl md:text-5xl mb-8';
  const cardClasses = theme === 'escuro' ? 'bg-gray-800 rounded-lg shadow-md p-6 md:p-10' : 'bg-white rounded-lg shadow-md p-6 md:p-10';
  const boxTitleClasses = theme === 'escuro' ? 'text-purple-400 font-bold text-xl md:text-2xl lg:text-3xl mb-4' : 'text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl mb-4';
  const dividerClasses = theme === 'escuro' ? 'w-full h-px bg-gray-700 mb-6' : 'w-full h-px bg-blue-400 mb-6'; 
  const sectionTitleClasses = theme === 'escuro' ? 'text-purple-400 font-bold text-2xl md:text-3xl mb-6' : 'text-purple-600 font-bold text-2xl md:text-3xl mb-6';
  const benefitTextClasses = theme === 'escuro' ? 'text-gray-300 text-lg' : 'text-gray-700 text-lg';
  
  // Pega a data de expiração (se existir)
  const expirationDateString = getExpirationDate();
  
  return (
    <Fragment>
      <div className={`content-box w-full ${animationClass}`}>
        <style>{floatAnimation}{shineAnimation}{spaceAnimations}</style>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className={mainTitleClasses}>
            Assinatura
          </h1>
        </div>
        
        <div className={cardClasses}> 
          <h2 className={boxTitleClasses}>
            {isMaster ? 'Meu Plano Ativo' : 'Escolha seu plano'}
          </h2>
          <div className={dividerClasses}></div>
          
          <div className="relative rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden shine-effect"
               style={{ background: 'linear-gradient(110deg, #4F46E5 0%, #A855F7 100%)', boxShadow: '0 10px 30px rgba(129, 93, 248, 0.4)' }}>
            
            <div className="md:w-3/5 text-white text-center md:text-left z-10">
              {/* --- CORREÇÃO: TROCANDO O <span> PELA <img> --- */}
              <img 
                src={liresMasterLogoImg} 
                alt="Líres Master" 
                className="h-8 w-auto mb-4" // Ajuste a altura (h-8) ou largura (w-48) como preferir
              />
              
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
                Aprenda Libras <span className="underline decoration-yellow-300">SEM LIMITES!</span>
              </h3>
              
              {/* --- LÓGICA DE EXIBIÇÃO DINÂMICA (3 ESTADOS) --- */}
              {!isMaster ? (
                // 1. NÃO É MASTER (Mostra CTA de assinatura)
                <>
                  <p className="text-lg text-purple-100 mb-6">
                    Mais conteúdo, mais prática e recursos exclusivos para acelerar seu aprendizado.
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="font-bold py-3 px-10 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 bg-white text-purple-700"
                  >
                    Assinar agora
                  </button>
                </>
              ) : isCanceled ? (
                // 2. É MASTER, MAS JÁ CANCELOU (Mostra status cancelado)
                <>
                  <p className="text-lg text-purple-100 mb-6">
                    Seu plano {userPlan || ''} foi cancelado e não será renovado.
                    <strong className="text-white block text-xl">Benefícios ativos até: {expirationDateString || '...'}</strong>
                  </p>
                  <button 
                    disabled={true}
                    className="font-bold py-3 px-10 rounded-full text-lg shadow-lg bg-gray-400 text-gray-800 cursor-not-allowed"
                  >
                    Cancelamento Agendado
                  </button>
                </>
              ) : (
                // 3. É MASTER E ESTÁ ATIVO (Mostra botão de cancelar)
                <>
                  <p className="text-lg text-purple-100 mb-6">
                    Seu plano {userPlan || ''} está ativo.
                    <strong className="text-white block text-xl">Próxima renovação em: {expirationDateString || '...'}</strong>
                  </p>
                  <button 
                    onClick={handleCancelSubscription}
                    className="font-bold py-3 px-10 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 bg-red-500 text-white hover:bg-red-600"
                  >
                    Cancelar Assinatura
                  </button>
                </>
              )}
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

      {/* Botão de Debug para Resetar Assinatura */}
      <div className="flex justify-center mt-8 pb-8">
        <button
          onClick={handleDebugResetSubscription} // Mudado do reset total
          className={`px-4 py-2 rounded-full text-xs font-semibold ${
            theme === 'escuro' 
            ? 'bg-gray-800 text-red-400 border border-red-700 hover:bg-red-900'
            : 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'
          }`}
        >
          [DEBUG] Resetar Assinatura
        </button>
      </div>

      {/* Modal de Pagamento (PIX) */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess} // Passa o {plan}
        theme={theme}
      />
    </Fragment>
  );
}