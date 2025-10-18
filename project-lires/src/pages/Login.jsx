import React from 'react';
// ALTERADO: Importe também o useNavigate
import { Link, useNavigate } from 'react-router-dom';
import logoLiresImg from '../assets/logo-lires.png';

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

const FooterText = () => (
    <div className="text-center text-xs text-gray-500 space-y-2 z-10 mt-auto py-4 px-4">
        <p>
            Ao entrar no LIRES você concorda com os nossos termos e nossa 
            <a href="#" className="text-blue-500 hover:underline ml-1">Política de privacidade</a>
        </p>
        <p>
            Esse site é protegido pelo rECHAPTCHA. Aplicam-se os 
            <a href="#" className="text-blue-500 hover:underline ml-1">Termos de Uso do Google</a>
        </p>
    </div>
);

// --- Componente Principal ---

export default function App() {
    // NOVO: Inicializa o hook de navegação
    const navigate = useNavigate();

    // NOVO: Função para lidar com o clique no botão de login
    const handleLogin = () => {
        // AQUI você deve adicionar a sua lógica de validação de login.
        // Por exemplo, uma chamada a uma API para verificar o usuário e senha.

        // Se o login for bem-sucedido, redirecione o usuário.
        console.log("Login efetuado com sucesso! Redirecionando para /home...");
        navigate('/home');
    };

    return (
        <>
            {/* Estilos globais e animações */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                body { 
                    font-family: 'Poppins', sans-serif; 
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    overflow-x: hidden;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
            <script src="https://cdn.tailwindcss.com"></script>

            <div className="font-sans bg-gray-50 text-gray-800 w-screen min-h-screen flex flex-col relative">
                
                {/* Wavy Background */}
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
                
                <main className="w-screen z-10 flex-grow flex flex-col justify-center items-center px-4 py-20">
                    <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            Logar no LIRES
                        </h2>
                        
                        <div className="space-y-6">
                            <input 
                                type="email" 
                                placeholder="E-mail"
                                className="w-full px-6 py-4 text-lg bg-pink-50 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-400 text-pink-700"
                            />
                            <div className="relative">
                                <input 
                                type="password" 
                                placeholder="Senha"
                                className="w-full px-6 py-4 text-lg bg-pink-50 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-400 text-pink-700"
                                />
                                <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <EyeIcon />
                                </button>
                            </div>
                        </div>
                        
                        <div className="text-right mt-4">
                            <span className="text-sm text-gray-800">
                                Esqueceu sua senha? <a href="./EsqueceuSenha" className="text-blue-500 hover:underline">Clique aqui</a>
                            </span>
                        </div>
                        
                        {/* ALTERADO: Adicionado o evento onClick ao botão */}
                        <button 
                            onClick={handleLogin}
                            className="w-full mt-8 py-4 bg-pink-300 text-white font-bold text-lg rounded-xl hover:bg-pink-400 transition-colors"
                        >
                            LOGAR
                        </button>
                        
                        <div className="flex items-center my-8">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-4 text-gray-500 font-semibold">OU</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center w-full py-3 bg-pink-50 rounded-xl border border-pink-200 hover:bg-pink-100 transition-colors">
                                <GoogleIcon />
                                <span className="font-semibold text-gray-700">Google</span>
                            </button>
                            <button className="flex items-center justify-center w-full py-3 bg-pink-50 rounded-xl border border-pink-200 hover:bg-pink-100 transition-colors">
                                <FacebookIcon />
                                <span className="font-semibold text-blue-600">Facebook</span>
                            </button>
                        </div>
                        
                        <p className="text-center mt-8 text-gray-600">
                            Não tem uma conta? <Link to="/cadastro" className="text-blue-500 hover:underline">Clique aqui</Link>
                        </p>
                    </div>
                </main>
                <FooterText />
            </div>
        </>
    );
}