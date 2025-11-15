import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importei o SweetAlert2 pra ter pop-ups mais bonitos que o alert() padrão
import Swal from 'sweetalert2'; 
// Não esquecer o CSS do Swal
import 'sweetalert2/dist/sweetalert2.min.css'; 
import logoLiresClaraImg from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png';
// Preciso do useSettings pra saber se o tema é escuro ou claro
import { useSettings } from '../components/SettingsContext';

// --- Componentes Auxiliares ---

// Componente simples pro ícone de 'mostrar senha'. Recebe o tema pra cor.
const EyeIcon = ({ onClick, theme }) => (
    <svg onClick={onClick} className={`w-6 h-6 cursor-pointer ${theme === 'escuro' ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
    </svg>
);

// O texto padrão do rodapé, também reage ao tema.
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

/**
 * Função helper para customizar o CSS do SweetAlert dinamicamente.
 * Assim, o pop-up fica no tema (escuro/claro) do app e eu posso
 * mudar a cor do título (sucesso, erro, info).
 */
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
        // O 'btn-gradient-glow' é uma classe customizada que eu injeto via <style>
        confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
        htmlContainer: `${theme === 'escuro' ? 'text-slate-300' : 'text-gray-700'}`,
    };
};


export default function EsqueceuSenha() { 
    // Puxa o tema global
    const { theme } = useSettings();
    // Hook do Router pra navegar de volta pro login
    const navigate = useNavigate();
    
    // Controla qual etapa do formulário estamos (1=email, 2=código, 3=senha)
    const [step, setStep] = useState(1);
    
    // Estados pra controlar as animações de transição do card (fade-out, fade-in)
    const [enterAnimationClass, setEnterAnimationClass] = useState('anim-enter'); 
    const [exitAnimationClass, setExitAnimationClass] = useState('');

    // Estados dos campos do formulário
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']); // Array para os 6 dígitos
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    /**
     * Função central de navegação entre etapas (1, 2, 3).
     * 1. Aplica a classe de 'saída' (anim-exit).
     * 2. Espera 800ms (duração da animação).
     * 3. Troca o 'step' no estado.
     * 4. Aplica a classe de 'entrada' (anim-enter).
     * Isso garante a transição suave do card.
     */
    const handleStepChange = (newStep) => {
        setError(''); // Limpa erros ao trocar de etapa
        setEnterAnimationClass(''); 
        setExitAnimationClass('anim-exit'); 
        
        setTimeout(() => {
            setStep(newStep); 
            setExitAnimationClass(''); 
            setEnterAnimationClass('anim-enter'); 
        }, 800); // Tempo da animação de saída
    };

    // --- PASSO 1: Validar E-mail ---
    const validateAndProceedStep1 = () => {
        // Validação básica de email (vazio e regex)
        if (!email) {
            setError('Por favor, preencha o campo de e-mail.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Simulação de backend: Puxo o 'banco' do localStorage
        const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
        // Verifico se o email digitado realmente existe
        const userExists = usersDB.some(user => user.email === email);

        if (!userExists) {
            setError('E-mail não encontrado na nossa base de dados.');
            return;
        }
        
        // E-mail válido, simular envio de código
        console.log('DEBUG: O código de verificação é 123456');
        
        // Uso o Swal pra avisar que o código foi 'enviado'.
        // Uso meu helper de estilo `getSwalPopupStyles`.
        Swal.fire({
            title: 'Código Enviado!',
            text: `Um código de 6 dígitos foi (simulado) enviado para ${email}. (DEBUG: O código é 123456)`,
            icon: 'success',
            customClass: getSwalPopupStyles(theme, 'success'),
            buttonsStyling: false
        });
        
        // Passa pra próxima etapa
        handleStepChange(2);
    };

    // --- PASSO 2: Validar Código ---
    const validateAndProceedStep2 = () => {
        const fullCode = code.join('');
        if (fullCode.length < 6) {
            setError('Por favor, insira o código de 6 dígitos.');
            return;
        }
        
        // Validação do código (hardcoded para esta simulação)
        if (fullCode !== '123456') {
            setError('Código de verificação incorreto.');
            return;
        }
        
        // Código correto, avança pra etapa de redefinir a senha
        handleStepChange(3);
    };

    // --- PASSO 3: Redefinir a Senha ---
    const handleFinishReset = () => {
        // Validações de senha (vazio, 6+ caracteres, match)
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

        // Simulação de Backend: Atualizar a senha no localStorage
        const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
        
        // Itero no 'banco' e atualizo a senha SÓ do usuário com o email correspondente
        // (que está salvo no estado 'email' desde o passo 1).
        const updatedUsersDB = usersDB.map(user => {
            if (user.email === email) {
                // Encontrou o usuário, atualiza a senha
                return { ...user, password: password };
            }
            return user; // Retorna os outros usuários sem alteração
        });

        // Salvo o 'banco' atualizado no localStorage
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedUsersDB));
        
        console.log('Senha atualizada com sucesso para:', email);
        
        // Popup de sucesso. Coloquei um timer de 2s pra fechar sozinho
        Swal.fire({
            title: 'Senha Redefinida!',
            text: 'Sua senha foi atualizada com sucesso. Você será redirecionado para o login.',
            icon: 'success',
            customClass: getSwalPopupStyles(theme, 'success'),
            buttonsStyling: false,
            timer: 2000, 
            showConfirmButton: false,
        });

        // Espera o pop-up fechar (2100ms) e depois chama a função de voltar ao login
        setTimeout(() => {
            handleBackToLogin();
        }, 2100);
    };

    // Função para navegar de volta ao login com animação
    const handleBackToLogin = () => {
        setEnterAnimationClass(''); 
        setExitAnimationClass('anim-exit'); 
        setTimeout(() => {
            navigate('/login');
        }, 800); // Duração da animação
    };

    // --- Lógica dos Inputs do Código de 6 dígitos ---

    // Lida com a digitação e auto-foco para o próximo input
    const handleCodeChange = (index, value) => {
        // Permite apenas números e 1 dígito
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            
            // Se digitou algo e não é o último input, foca no próximo
            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    // Lida com o Backspace para focar no input anterior
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    // --- Classes Dinâmicas do Tailwind ---
    // Criei essas variáveis pra não poluir o JSX e facilitar a manutenção do tema.
    // Elas trocam o estilo (bg, border, focus) baseado no 'theme'.
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
            {/* Injeto o CSS do gradiente do botão do Swal. 
              É o jeito mais fácil de customizar o botão que o `customClass` não cobre.
            */}
            <style>{`
                .btn-gradient-glow {
                    background-image: linear-gradient(90deg, #b081ff, #59b1ff);
                    box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
                }
            `}</style>
            
            {/* Container principal da página */}
            <div className={`w-screen min-h-screen flex flex-col relative overflow-hidden ${
                theme === 'escuro' ? 'bg-gray-900 text-slate-300' : 'bg-gray-50 text-gray-800'
            }`}>
                
                {/* SVG complexo das ondas animadas no fundo. 
                    As animações <animate> trocam o 'd' (path) do SVG pra dar o efeito de movimento.
                */}
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

                {/* Logo no topo, reage ao tema */}
                <header className="absolute top-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <img 
                        src={theme === 'escuro' ? logoLiresEscuraImg : logoLiresClaraImg} 
                        alt="Logo Lires" 
                        className="h-16 sm:h-20 w-auto" 
                    />
                </header>
                
                {/* Container do card central */}
                <main className="w-screen z-10 flex-grow flex flex-col justify-center items-center px-4 py-20">
                    {/* Card central com animações e classes de tema */}
                    <div className={cardClasses}>
                        <h2 className={titleClasses}>
                            {/* O título muda no passo 3 */}
                            {step === 3 ? 'Nova senha' : 'Esqueci a Senha'}
                        </h2>
                        
                        {/* --- PASSO 1: Formulário de E-mail --- */}
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

                        {/* --- PASSO 2: Formulário do Código --- */}
                        {step === 2 && (
                            <>
                                <p className={descriptionClasses}>Foi enviado um código de 6 números para o seu E-mail, digite abaixo o código enviado</p>
                                <div className="flex justify-center gap-2 mb-8">
                                    {/* Mapeia o array 'code' para criar os 6 inputs */}
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

                        {/* --- PASSO 3: Formulário de Nova Senha --- */}
                        {step === 3 && (
                            <>
                                <p className={descriptionClasses}>Digite sua nova senha abaixo</p>
                                <div className="space-y-6">
                                    {/* Input de Senha com ícone de olho */}
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} />
                                        <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            <EyeIcon onClick={() => setShowPassword(!showPassword)} theme={theme} />
                                        </button>
                                    </div>
                                    {/* Input de Confirmação de Senha com ícone de olho */}
                                    <div className="relative">
                                        <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.targe.value)} className={inputClasses} />
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
                
                {/* Rodapé com termos, passando o tema */}
                <FooterText theme={theme} />
            </div>
        </>
    );
}