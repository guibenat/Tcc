import React, { useState, useEffect } from 'react';
// REMOVIDO: Imports das sidebars
import TelaMonitorSegurança from "../assets/TelaMonitorSegurança.png";
import CelularLiresSegurança from "../assets/CelularLiresSegurança.png";

// --- Ícones SVG (copiados do seu código) ---
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const PasswordInput = ({ placeholder = "Digite sua senha", value = "", onChange = () => {}, className = "", showToggle = true }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 pr-12 border-2 border-teal-400 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 ${className}`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}
    </div>
  );
};
// --- Fim dos Ícones ---

export default function Seguranca() {
  const [password, setPassword] = useState('');
  
  // Animação de entrada
  const [animationClass, setAnimationClass] = useState('');
  useEffect(() => {
    setAnimationClass('anim-enter');
  }, []);

  return (
    // REMOVIDO: O <div min-h-screen...> e as sidebars
    // ADICIONADO: O wrapper 'content-box' para animação
    <div className={`content-box w-full ${animationClass}`}>
      
      {/* Título principal */}
      <h1 className="text-purple-600 font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-6 sm:mb-8 pr-4 sm:pr-0">
        Segurança e informações da conta
      </h1>

      {/* Conteúdo principal - configurações */}
      <div className="space-y-6 sm:space-y-8 pr-4 sm:pr-0">
        {/* Seção Login e Segurança */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-purple-600 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4">
            Login e segurança
          </h2>
          <div className="w-full h-1 bg-green-200 mb-4 sm:mb-6"></div>
          <h3 className="text-purple-600 font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
            Senha
          </h3>
          <div className="max-w-md mb-6">
            <PasswordInput
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h2 className='text-base sm:text-lg text-purple-600 font-bold mb-3 sm:mb-4'>
            Dispositivos conectados:
          </h2>
          <div className='space-y-4'>
            {/* Dispositivo 1 - Monitor */}
            <div className='bg-white flex flex-col sm:flex-row items-start sm:items-center border-2 border-green-400 rounded-xl p-3 sm:p-4'>
              <img src={TelaMonitorSegurança} alt="Tela do Monitor" className='w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-0 sm:mr-4' />
              <div className='flex-1'>
                <h2 className='text-purple-600 font-bold text-sm sm:text-base lg:text-lg mb-1'>Monitor LG 24MK400H-B</h2>
                <p className='text-gray-600 text-xs sm:text-sm mb-1'>Conectado via cabo HDMI</p>
                <p className='text-gray-600 text-xs sm:text-sm'>Último acesso: 20/06/2024</p>
              </div>
            </div>
            {/* Dispositivo 2 - Celular */}
            <div className='bg-white flex flex-col sm:flex-row items-start sm:items-center border-2 border-green-400 rounded-xl p-3 sm:p-4'>
              <img src={CelularLiresSegurança} alt="Celular Lires" className='w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-0 sm:mr-4' />
              <div className='flex-1'>
                <h2 className='text-purple-600 font-bold text-sm sm:text-base lg:text-lg mb-1'>Celular Lires</h2>
                <p className='text-gray-600 text-xs sm:text-sm mb-1'>Conectado via Wi-Fi</p>
                <p className='text-gray-600 text-xs sm:text-sm'>Último acesso: 18/06/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* REMOVIDO: SidebarRightMobile (agora é parte do SettingsLayout) */}
    </div>
  );
}
