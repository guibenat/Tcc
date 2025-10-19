import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoLiresImg from '../assets/logo-lires.png';


// --- Componentes de Ícones ---
const GoogleIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.283,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" color="#1877F2">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"></path>
    </svg>
);

const EyeIcon = () => (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
    </svg>
);

const BackArrowIcon = () => (
    <svg className="w-6 h-6 text-gray-500 hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
);

const FooterText = () => (
    <div className="text-center text-xs text-gray-500 space-y-2 z-10 mt-auto py-6 px-4">
        <p>
            Ao entrar no LIRES você concorda com os nossos termos e nossa
            <a href="#" className="text-blue-500 hover:underline ml-1">Política de privacidade</a>
        </p>
        <p>
            Esse site é protegido pelo rCAPTCHA. Aplicam-se os 
            <a href="#" className="text-blue-500 hover:underline ml-1">Termos de Uso do Google</a>
        </p>
    </div>
);


// --- Etapas do Formulário ---

const AgeStep = ({ age, setAge, onNext }) => (
    <>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Quantos Anos Você Tem?
        </h2>
        
        <div className="flex items-center justify-center gap-4 my-4">
            <button
                onClick={() => setAge(prev => Math.max(0, prev - 1))}
                disabled={age <= 0}
                className="w-12 h-12 text-3xl font-bold text-white bg-pink-300 rounded-full hover:bg-pink-400 disabled:bg-gray-200 transition-colors"
            >
                -
            </button>
            <span className="text-4xl font-bold text-pink-500 w-24 text-center">
                {age}
            </span>
            <button
                onClick={() => setAge(prev => Math.min(100, prev + 1))}
                disabled={age >= 100}
                className="w-12 h-12 text-3xl font-bold text-white bg-pink-300 rounded-full hover:bg-pink-400 disabled:bg-gray-200 transition-colors"
            >
                +
            </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4 mb-6">
            Informar sua idade garante que você tenha a melhor experiência com LIRES.
        </p>
        
        <button 
            onClick={onNext}
            className="w-full py-3 bg-pink-300 text-white font-bold text-base rounded-lg hover:bg-pink-400 transition-colors"
        >
            AVANÇAR
        </button>
    </>
);

const ProfileStep = ({ name, setName, email, setEmail, password, setPassword, onBack, onCreateAccount }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <button 
                onClick={onBack} 
                className="absolute -top-1 -left-1 p-2 z-20"
                aria-label="Voltar"
            >
                <BackArrowIcon />
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Crie o seu perfil
            </h2>
            
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Nome (opcional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-3 text-base bg-pink-100 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500 text-gray-800"
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 text-base bg-pink-100 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500 text-gray-800"
                />
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-3 text-base bg-pink-100 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500 text-gray-800"
                    />
                    <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                        <EyeIcon />
                    </button>
                </div>
            </div>
            
            <button 
                onClick={onCreateAccount}
                className="w-full mt-6 py-3 bg-pink-300 text-white font-bold text-base rounded-lg hover:bg-pink-400 transition-colors"
            >
                CRIAR CONTA
            </button>
        </div>
    );
};

// --- Componente Principal ---

export default function SignUp() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const [age, setAge] = useState(18);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // EFEITO PARA CARREGAR DADOS SALVOS QUANDO O COMPONENTE É ABERTO
    useEffect(() => {
        const savedData = localStorage.getItem('cadastroFormData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setAge(parsedData.age || 18);
            setName(parsedData.name || '');
            setEmail(parsedData.email || '');
            setPassword(parsedData.password || '');
        }
    }, []); // O array vazio [] garante que isso só rode uma vez

    // EFEITO PARA SALVAR DADOS NO LOCALSTORAGE SEMPRE QUE ALGO MUDAR
    useEffect(() => {
        const formData = { age, name, email, password };
        localStorage.setItem('cadastroFormData', JSON.stringify(formData));
    }, [age, name, email, password]); // Roda sempre que um desses estados for alterado

    const handleStepChange = (newStep) => {
        setError('');
        setIsAnimating(true);
        setTimeout(() => {
            setStep(newStep);
            setTimeout(() => {
                setIsAnimating(false);
            }, 50);
        }, 800);
    };

    const validateAndProceedStep1 = () => {
        if (age === null || age === '' || age <= 0) {
            setError('Por favor, informe uma idade válida.');
            return;
        }
        handleStepChange(2);
    };
    
    const validateAndFinish = () => {
        if (!email || !password) {
            setError('E-mail e senha são obrigatórios.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        
        console.log("Criando conta com:", { age, name, email, password });
        setError('');
        
        // Limpa os dados salvos após criar a conta com sucesso
        localStorage.removeItem('cadastroFormData');

        setIsAnimating(true);
        setTimeout(() => {
            navigate('/home'); 
        }, 800);
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                body { 
                    font-family: 'Poppins', sans-serif; 
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                }
                .content-box {
                    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .content-box.melting {
                    transform: translateY(100vh) scaleY(0.1) rotateX(45deg);
                    opacity: 0;
                    filter: blur(10px);
                }
            `}</style>

            <div className="font-sans bg-gray-50 text-gray-800 w-screen min-h-screen flex flex-col relative overflow-hidden">
                
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
                        <path fill="#93c5fd" fillOpacity="0.7" d="M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z">
                            <animate attributeName="d" dur="8s" repeatCount="indefinite"
                                values="M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z;
                                        M0,450 C360,550 480,350 720,450 C960,550 1080,350 1440,450 L1440,800 L0,800 Z;
                                        M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z" />
                        </path>
                        <path fill="#7dd3fc" fillOpacity="0.6" d="M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z">
                            <animate attributeName="d" dur="12s" repeatCount="indefinite"
                                values="M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z;
                                        M0,550 C360,650 480,450 720,550 C960,650 1080,450 1440,550 L1440,800 L0,800 Z;
                                        M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z" />
                        </path>
                        <path fill="#60a5fa" fillOpacity="0.5" d="M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z">
                            <animate attributeName="d" dur="16s" repeatCount="indefinite"
                                values="M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z;
                                        M0,650 C360,750 480,550 720,650 C960,750 1080,550 1440,650 L1440,800 L0,800 Z;
                                        M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z" />
                        </path>
                    </svg>
                </div>
                
                <header className="absolute top-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <img src={logoLiresImg} alt="Logo Lires" className="h-16 sm:h-20 w-auto" />
                </header>
                
                <main className="w-full z-10 flex-grow flex flex-col justify-center items-center px-4 py-8">
                    <div className={`content-box w-full max-w-sm p-8 sm:p-12 rounded-2xl bg-white shadow-lg ${isAnimating ? 'melting' : ''}`}>
                        {step === 1 ? (
                            <AgeStep 
                                age={age} 
                                setAge={setAge} 
                                onNext={validateAndProceedStep1} 
                            />
                        ) : (
                            <ProfileStep 
                                name={name} 
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                onBack={() => handleStepChange(1)}
                                onCreateAccount={validateAndFinish}
                            />
                        )}
                        
                        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                        
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-4 text-gray-500 text-sm font-semibold">OU</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center w-full py-3 bg-pink-100 rounded-lg border border-pink-200 hover:bg-pink-200 transition-colors">
                                <GoogleIcon />
                                <span className="font-semibold text-gray-700">Google</span>
                            </button>
                            <button className="flex items-center justify-center w-full py-3 bg-pink-100 rounded-lg border border-pink-200 hover:bg-pink-200 transition-colors">
                                <FacebookIcon />
                                <span className="font-semibold text-blue-600">Facebook</span>
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-600 mt-8">
                            Já tem uma conta?{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                                Entre aqui
                            </Link>
                        </p>
                    </div>
                </main>
                <FooterText />
            </div>
        </>
    );
}