import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoLiresClaraImg from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png';
import { useSettings } from '../components/SettingsContext';

// --- Ícones e Componentes Auxiliares ---
const GoogleIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48">
        {/* ... paths ... */}
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.283,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

// --- ÍCONE DO FACEBOOK REMOVIDO ---

const EyeIcon = ({ theme }) => (
    <svg className={`w-6 h-6 ${theme === 'escuro' ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
    </svg>
);
const FooterText = ({ theme }) => (
    <div className={`text-center text-xs space-y-2 z-10 mt-auto py-4 px-4 ${
        theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'
    }`}>
        <p>
            Ao entrar no LIRES você concorda com os nossos termos e nossa 
            <a href="#" className="text-blue-500 hover:underline ml-1"> Política de privacidade</a>
        </p>
        <p>
            Esse site é protegido pelo rECHAPTCHA. Aplicam-se os 
            <a href="#" className="text-blue-500 hover:underline ml-1"> Termos de Uso do Google</a>
        </p>
    </div>
);

// --- Componente Principal ---

export default function Login() {
    const { theme } = useSettings();
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter'); 
    const [exitAnimationClass, setExitAnimationClass] = useState('');

    const handleLogin = () => {
        setError('');
        if (!email || !password) {
            setError('Por favor, preencha o e-mail e a senha.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        
        const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
        const user = usersDB.find(user => user.email === email);

        if (!user) {
            setError('E-mail não cadastrado. Por favor, crie uma conta.');
            return;
        }

        if (user.password !== password) {
            setError('Senha incorreta.');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));

        console.log("Login validado! Redirecionando...");
        setEnterAnimationClass(''); 
        setExitAnimationClass('anim-exit'); 
        
        setTimeout(() => {
            const destination = user.hasOnboarded ? '/home' : '/inicial';
            window.location.href = destination;
        }, 800); 
    };

    const inputClasses = `w-full px-6 py-4 text-lg rounded-xl border focus:outline-none focus:ring-2 placeholder-pink-400 ${
        theme === 'escuro' 
        ? 'bg-gray-700 border-gray-600 focus:ring-pink-500 text-slate-100 placeholder-gray-400' 
        : 'bg-pink-50 border-pink-200 focus:ring-pink-400 text-pink-700'
    }`;

    return (
        <>
            <div className={`w-screen min-h-screen flex flex-col relative overflow-hidden ${
                        theme === 'escuro' ? 'bg-gray-900 text-slate-300' : 'bg-gray-50 text-gray-800'
                }`}>
                
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
                            <path fill={theme === 'escuro' ? '#3b82f6' : "#93c5fd"} fillOpacity="0.5" d="M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z">
                                <animate attributeName="d" dur="8s" repeatCount="indefinite"
                                    values="M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z; M0,450 C360,550 480,350 720,450 C960,550 1080,350 1440,450 L1440,800 L0,800 Z; M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z" />
                            </path>
                            <path fill={theme === 'escuro' ? '#2563eb' : "#7dd3fc"} fillOpacity="0.4" d="M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z">
                                <animate attributeName="d" dur="12s" repeatCount="indefinite"
                                    values="M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z; M0,550 C360,650 480,450 720,550 C960,650 1080,450 1440,550 L1440,800 L0,800 Z; M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z" />
                            </path>
                            <path fill={theme === 'escuro' ? '#1d4ed8' : "#60a5fa"} fillOpacity="0.3" d="M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z">
                                    <animate attributeName="d" dur="16s" repeatCount="indefinite"
                                        values="M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z; M0,650 C360,750 480,550 720,650 C960,750 1080,550 1440,650 L1440,800 L0,800 Z; M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z" />
                            </path>
                        </svg>
                    </div>

                    <header className="absolute top-0 left-0 right-0 p-6 sm:p-8 z-10">
                        <img 
                            src={theme === 'escuro' ? logoLiresEscuraImg : logoLiresClaraImg} 
                            alt="Logo Lires" 
                            className="h-16 sm:h-20 w-auto" 
                        />
                    </header>
                    
                    <main className="w-screen z-10 flex-grow flex flex-col justify-center items-center px-4 py-20">
                        <div className={`content-box w-full max-w-md p-8 sm:p-12 rounded-2xl shadow-lg ${exitAnimationClass} ${enterAnimationClass} ${
                                theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                        }`}>
                            <h2 className={`text-3xl font-bold text-center mb-8 ${
                                theme === 'escuro' ? 'text-slate-100' : 'text-gray-800'
                            }`}>
                                Logar no LIRES
                            </h2>
                            
                            <div className="space-y-6">
                                <input 
                                    type="email" 
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClasses}
                                />
                                <div className="relative">
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={inputClasses}
                                    />
                                    <button 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        <EyeIcon theme={theme} /> 
                                    </button>
                                </div>
                            </div>
                            
                            {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                            
                            <div className="text-right mt-4">
                                <span className={`text-sm ${theme === 'escuro' ? 'text-slate-300' : 'text-gray-800'}`}>
                                    Esqueceu sua senha? <Link to="/esqueceu-senha" className="text-blue-500 hover:underline">Clique aqui</Link>
                                </span>
                            </div>
                            
                            <button 
                                onClick={handleLogin}
                                className={`w-full mt-8 py-4 text-white font-bold text-lg rounded-xl transition-colors ${
                                    theme === 'escuro' 
                                    ? 'bg-pink-600 hover:bg-pink-700' 
                                    : 'bg-pink-300 hover:bg-pink-400'
                                }`}
                            >
                                LOGAR
                            </button>
                            
                            <div className="flex items-center my-8">
                                <hr className={`flex-grow ${theme === 'escuro' ? 'border-gray-600' : 'border-gray-300'}`} />
                                <span className={`px-4 font-semibold ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}`}>OU</span>
                                <hr className={`flex-grow ${theme === 'escuro' ? 'border-gray-600' : 'border-gray-300'}`} />
                            </div>
                            
                            {/* --- BOTÃO DO FACEBOOK REMOVIDO --- */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className={`flex items-center justify-center w-full py-3 rounded-xl border transition-colors ${
                                    theme === 'escuro' 
                                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                                    : 'bg-pink-50 border-pink-200 hover:bg-pink-100'
                                }`}>
                                    <GoogleIcon />
                                    <span className={`font-semibold ${theme === 'escuro' ? 'text-slate-200' : 'text-gray-700'}`}>Google</span>
                                </button>
                            </div>
                            
                            <p className={`text-center mt-8 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Não tem uma conta? <Link to="/cadastro" className="text-blue-500 hover:underline">Clique aqui</Link>
                            </p>
                        </div>
                    </main>
                    <FooterText theme={theme} />
                </div>
        </>
    );
}