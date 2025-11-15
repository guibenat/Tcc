import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // 1. IMPORTAR SWAL
import 'sweetalert2/dist/sweetalert2.min.css'; // 1. IMPORTAR CSS DO SWAL
import logoLiresClaraImg from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png';
import { useSettings } from '../components/SettingsContext';

// --- Ícones e Componentes Auxiliares ---

const EyeIcon = ({ onClick, theme }) => (
    <svg onClick={onClick} className={`w-6 h-6 cursor-pointer ${theme === 'escuro' ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

// 2. FUNÇÃO DE ESTILO PARA O SWAL
const getSwalPopupStyles = (theme, type = 'info') => {
    let titleColor = '';
    if (type === 'success') {
        titleColor = theme === 'escuro' ? 'text-green-300' : 'text-green-600';
    } else if (type === 'error') {
        titleColor = theme === 'escuro' ? 'text-red-300' : 'text-red-600';
    } else {
        titleColor = theme === 'escuro' ? 'text-purple-300' : 'text-slate-800';
    }

    return {
        popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : ''}`,
        title: titleColor,
        confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
        htmlContainer: `${theme === 'escuro' ? 'text-slate-300' : 'text-gray-700'}`,
    };
};


export default function EsqueceuSenha() { 
    const { theme } = useSettings();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter'); 
    const [exitAnimationClass, setExitAnimationClass] = useState('');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleStepChange = (newStep) => {
        setError('');
        setEnterAnimationClass(''); 
        setExitAnimationClass('anim-exit'); 
        
        setTimeout(() => {
            setStep(newStep); 
            setExitAnimationClass(''); 
            setEnterAnimationClass('anim-enter'); 
        }, 800); 
    };

    // --- 3. LÓGICA DO PASSO 1 (Verificar E-mail) ---
    const validateAndProceedStep1 = () => {
        if (!email) {
            setError('Por favor, preencha o campo de e-mail.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Verificar se o e-mail existe no localStorage
        const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
        const userExists = usersDB.some(user => user.email === email);

        if (!userExists) {
            setError('E-mail não encontrado na nossa base de dados.');
            return;
        }
        
        // E-mail válido, simular envio de código
        console.log('DEBUG: O código de verificação é 123456');
        // Mostrar um pop-up para o utilizador (simulando o envio)
        Swal.fire({
            title: 'Código Enviado!',
            text: `Um código de 6 dígitos foi (simulado) enviado para ${email}. (DEBUG: O código é 123456)`,
            icon: 'success',
            customClass: getSwalPopupStyles(theme, 'success'),
            buttonsStyling: false
        });
        
        handleStepChange(2);
    };

    // --- 4. LÓGICA DO PASSO 2 (Verificar Código) ---
    const validateAndProceedStep2 = () => {
        const fullCode = code.join('');
        if (fullCode.length < 6) {
            setError('Por favor, insira o código de 6 dígitos.');
            return;
        }
        
        // Verificar o "código secreto"
        if (fullCode !== '123456') {
            setError('Código de verificação incorreto.');
            return;
        }
        
        // Código correto
        handleStepChange(3);
    };

    // --- 5. LÓGICA DO PASSO 3 (Mudar Senha) ---
    const handleFinishReset = () => {
        if (!password || !confirmPassword) {
            setError('Por favor, preencha ambos os campos de senha.');
            return;
        }
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        // Atualizar a senha no localStorage
        const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
        const updatedUsersDB = usersDB.map(user => {
            if (user.email === email) {
                // Encontrou o utilizador, atualiza a senha
                return { ...user, password: password };
            }
            return user; // Retorna os outros utilizadores sem alteração
        });

        // Salvar a base de dados atualizada
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedUsersDB));
        
        console.log('Senha atualizada com sucesso para:', email);
        
        Swal.fire({
            title: 'Senha Redefinida!',
            text: 'Sua senha foi atualizada com sucesso. Você será redirecionado para o login.',
            icon: 'success',
            customClass: getSwalPopupStyles(theme, 'success'),
            buttonsStyling: false,
            timer: 2000, // Mostra por 2 segundos
            showConfirmButton: false,
        });

        // Espera o pop-up fechar e depois volta ao login
        setTimeout(() => {
            handleBackToLogin();
        }, 2100);
    };
    // --- FIM DAS ALTERAÇÕES DE LÓGICA ---

    const handleBackToLogin = () => {
        setEnterAnimationClass(''); 
        setExitAnimationClass('anim-exit'); 
        setTimeout(() => {
            navigate('/login');
        }, 800); 
    };

    const handleCodeChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            
            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    // --- Classes Dinâmicas (Sem alteração) ---
    const inputClasses = `w-full px-6 py-4 text-lg rounded-xl border focus:outline-none focus:ring-2 placeholder-pink-400 ${
        theme === 'escuro' 
        ? 'bg-gray-700 border-gray-600 focus:ring-pink-500 text-slate-100 placeholder-gray-400' 
        : 'bg-pink-50 border-pink-200 focus:ring-pink-400 text-pink-700'
    }`;
     const codeInputClasses = `w-14 h-14 text-center text-2xl font-bold rounded-xl border focus:outline-none focus:ring-2 ${
        theme === 'escuro' 
        ? 'bg-gray-700 border-gray-600 focus:ring-pink-500 text-slate-100' 
        : 'bg-pink-50 border-pink-200 focus:ring-pink-400 text-pink-700'
    }`;
    const buttonClasses = `w-full mt-8 py-4 text-white font-bold text-lg rounded-xl transition-colors ${
        theme === 'escuro' 
        ? 'bg-pink-600 hover:bg-pink-700' 
        : 'bg-pink-300 hover:bg-pink-400'
    }`;
    const cardClasses = `content-box w-full max-w-md p-8 sm:p-12 rounded-2xl shadow-lg ${exitAnimationClass} ${enterAnimationClass} ${
        theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`;
    const titleClasses = `text-3xl font-bold text-center mb-4 ${
        theme === 'escuro' ? 'text-slate-100' : 'text-gray-800'
    }`;
    const descriptionClasses = `text-center mb-8 ${
        theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'
    }`;
     const linkClasses = `text-center mt-8 ${
        theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'
    }`;

    return (
        <>
            {/* 6. ADICIONAR STYLE TAG PARA O BOTÃO DO SWAL */}
            <style>{`
                .btn-gradient-glow {
                    background-image: linear-gradient(90deg, #b081ff, #59b1ff);
                    box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
                }
            `}</style>
            
            <div className={`w-screen min-h-screen flex flex-col relative overflow-hidden ${
                theme === 'escuro' ? 'bg-gray-900 text-slate-300' : 'bg-gray-50 text-gray-800'
            }`}>
                
                {/* Ondas */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
                        <path fill={theme === 'escuro' ? '#3b82f6' : "#93c5fd"} fillOpacity="0.5" d="M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z">
                            <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z; M0,450 C360,550 480,350 720,450 C960,550 1080,350 1440,450 L1440,800 L0,800 Z; M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z" />
                        </path>
                        <path fill={theme === 'escuro' ? '#2563eb' : "#7dd3fc"} fillOpacity="0.4" d="M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z">
                            <animate attributeName="d" dur="12s" repeatCount="indefinite" values="M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z; M0,550 C360,650 480,450 720,550 C960,650 1080,450 1440,550 L1440,800 L0,800 Z; M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z" />
                        </path>
                        <path fill={theme === 'escuro' ? '#1d4ed8' : "#60a5fa"} fillOpacity="0.3" d="M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z">
                            <animate attributeName="d" dur="16s" repeatCount="indefinite" values="M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z; M0,650 C360,750 480,550 720,650 C960,750 1080,550 1440,650 L1440,800 L0,800 Z; M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z" />
                        </path>
                    </svg>
                </div>

                {/* HEADER COM LOGO ATUALIZADA */}
                <header className="absolute top-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <img 
                        src={theme === 'escuro' ? logoLiresEscuraImg : logoLiresClaraImg} 
                        alt="Logo Lires" 
                        className="h-16 sm:h-20 w-auto" 
                    />
                </header>
                
                <main className="w-screen z-10 flex-grow flex flex-col justify-center items-center px-4 py-20">
                    {/* CARD CENTRAL ATUALIZADO */}
                    <div className={cardClasses}>
                        <h2 className={titleClasses}>
                            {step === 3 ? 'Nova senha' : 'Esqueci a Senha'}
                        </h2>
                        
                        {step === 1 && (
                            <>
                                <p className={descriptionClasses}>Digite abaixo o e-mail da conta que deseja recuperar a senha</p>
                                <div className="space-y-6">
                                    <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
                                </div>
                                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                                <button onClick={validateAndProceedStep1} className={buttonClasses}>Avançar</button>
                                <p className={linkClasses}>Lembrou sua senha? <button onClick={handleBackToLogin} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Voltar ao login</button></p>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <p className={descriptionClasses}>Foi enviado um código de 6 números para o seu E-mail, digite abaixo o código enviado</p>
                                <div className="flex justify-center gap-2 mb-8">
                                    {code.map((digit, index) => (
                                        <input key={index} id={`code-${index}`} type="text" maxLength="1" value={digit} onChange={(e) => handleCodeChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} className={codeInputClasses} />
                                    ))}
                                </div>
                                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                                <button onClick={validateAndProceedStep2} className={buttonClasses}>Avançar</button>
                                <p className={linkClasses}>Não recebeu o código? <button onClick={validateAndProceedStep1} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Reenviar</button></p>
                                <p className={`text-center mt-4 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>Digitou o e-mail errado? <button onClick={() => handleStepChange(1)} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Voltar</button></p>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <p className={descriptionClasses}>Digite sua nova senha abaixo</p>
                                <div className="space-y-6">
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} />
                                        <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            <EyeIcon onClick={() => setShowPassword(!showPassword)} theme={theme} />
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClasses} />
                                        <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            <EyeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} theme={theme} />
                                        </button>
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                                <button onClick={handleFinishReset} className={buttonClasses}>Pronto</button>
                                <p className={linkClasses}>Lembrou sua senha? <button onClick={handleBackToLogin} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Voltar ao login</button></p>
                            </>
                        )}
                    </div>
                </main>
                {/* 5. PASSAR O TEMA PARA O FOOTER */}
                <FooterText theme={theme} />
            </div>
        </>
    );
}