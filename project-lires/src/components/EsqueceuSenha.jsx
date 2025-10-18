import React, { useState } from 'react';

import logoLiresImg from '../assets/logo-lires.png';

const EyeIcon = ({ onClick }) => (
    <svg onClick={onClick} className="w-6 h-6 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function App() {
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (!email) {
      setError('Por favor, preencha o campo de e-mail.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    console.log('E-mail:', email);
    handleStepChange(2);
  };

  const validateAndProceedStep2 = () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setError('Por favor, insira o código de 6 dígitos.');
      return;
    }
    console.log('Código:', fullCode);
    handleStepChange(3);
  };

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
    console.log('Nova Senha:', password);
    // If all validations pass, proceed to log in
    handleBackToLogin();
  };


  const handleBackToLogin = () => {
    setIsAnimating(true);
    setTimeout(() => {
      window.location.href = './login';
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

  return (
    <>
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
        
        .content-box {
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .content-box.melting {
          transform: translateY(100vh) scaleY(0.1) rotateX(45deg);
          opacity: 0;
          filter: blur(10px);
        }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="font-sans bg-gray-50 text-gray-800 w-screen min-h-screen flex flex-col relative">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path fill="#93c5fd" fillOpacity="0.7" d="M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z; M0,450 C360,550 480,350 720,450 C960,550 1080,350 1440,450 L1440,800 L0,800 Z; M0,400 C360,300 480,500 720,400 C960,300 1080,500 1440,400 L1440,800 L0,800 Z" />
            </path>
            <path fill="#7dd3fc" fillOpacity="0.6" d="M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z">
              <animate attributeName="d" dur="12s" repeatCount="indefinite"
                values="M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z; M0,550 C360,650 480,450 720,550 C960,650 1080,450 1440,550 L1440,800 L0,800 Z; M0,500 C360,400 480,600 720,500 C960,400 1080,600 1440,500 L1440,800 L0,800 Z" />
            </path>
            <path fill="#60a5fa" fillOpacity="0.5" d="M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z">
              <animate attributeName="d" dur="16s" repeatCount="indefinite"
                values="M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z; M0,650 C360,750 480,550 720,650 C960,750 1080,550 1440,650 L1440,800 L0,800 Z; M0,600 C360,500 480,700 720,600 C960,500 1080,700 1440,600 L1440,800 L0,800 Z" />
            </path>
          </svg>
        </div>

        <header className="absolute top-0 left-0 right-0 p-6 sm:p-8 z-10">
          <img src={logoLiresImg} alt="Logo Lires" className="h-16 sm:h-20 w-auto" />
        </header>
        
        <main className="w-screen z-10 flex-grow flex flex-col justify-center items-center px-4 py-20">
          <div className={`content-box w-full max-w-md bg-white p-8 sm:p-12 rounded-2xl shadow-lg ${isAnimating ? 'melting' : ''}`}>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                {step === 3 ? 'Nova senha' : 'Esqueci a Senha'}
              </h2>
              
              {step === 1 && (
                <>
                  <p className="text-center text-gray-600 mb-8">
                    Digite abaixo o e-mail da conta que deseja recuperar a senha
                  </p>
                  
                  <div className="space-y-6">
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-4 text-lg bg-pink-50 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-400 text-pink-700"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                  
                  <button 
                    onClick={validateAndProceedStep1}
                    className="w-full mt-8 py-4 bg-pink-300 text-white font-bold text-lg rounded-xl hover:bg-pink-400 transition-colors"
                  >
                    Avançar
                  </button>
                  
                  <p className="text-center mt-8 text-gray-600">
                    Lembrou sua senha? <button onClick={handleBackToLogin} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Voltar ao login</button>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-center text-gray-600 mb-8">
                    Foi enviado um código de 6 números para o seu E-mail, digite abaixo o código enviado
                  </p>
                  
                  <div className="flex justify-center gap-2 mb-8">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-14 text-center text-2xl font-bold bg-pink-50 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-700"
                      />
                    ))}
                  </div>
                  
                  {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

                  <button 
                    onClick={validateAndProceedStep2}
                    className="w-full mt-8 py-4 bg-pink-300 text-white font-bold text-lg rounded-xl hover:bg-pink-400 transition-colors"
                  >
                    Avançar
                  </button>
                  
                  <p className="text-center mt-8 text-gray-600">
                    Não recebeu o código? <a href="#" className="text-blue-500 hover:underline">Reenviar</a>
                  </p>
                  <p className="text-center mt-4 text-gray-600">
                    Digitou o e-mail errado? <button onClick={() => handleStepChange(1)} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Voltar</button>
                  </p>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="text-center text-gray-600 mb-8">
                    Digite sua nova senha abaixo
                  </p>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Nova senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-6 py-4 text-lg bg-pink-50 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-400 text-pink-700"
                      />
                      <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                      </button>
                    </div>
                    
                    <div className="relative">
                      <input 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirme a senha"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-6 py-4 text-lg bg-pink-50 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-400 text-pink-700"
                      />
                      <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <EyeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                      </button>
                    </div>
                  </div>
                  
                  {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

                  <button 
                    onClick={handleFinishReset}
                    className="w-full mt-8 py-4 bg-pink-300 text-white font-bold text-lg rounded-xl hover:bg-pink-400 transition-colors"
                  >
                    Pronto
                  </button>
                  
                  <p className="text-center mt-8 text-gray-600">
                    Lembrou sua senha? <button onClick={handleBackToLogin} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Voltar ao login</button>
                  </p>
                </>
              )}
          </div>
        </main>
        <FooterText />
      </div>
    </>
  );
}

