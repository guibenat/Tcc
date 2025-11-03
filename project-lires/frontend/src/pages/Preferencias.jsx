import React, { useState, useEffect } from 'react';
// IMPORTA O HOOK QUE CRIAMOS
import { useSettings } from '../components/SettingsContext';

export default function Preferencias() {
  // --- USA O CONTEXTO GLOBAL ---
  const {
    fontSize,
    setFontSize,
    theme,
    setTheme,
    colorBlindFilter,
    setColorBlindFilter,
    autoLegends,
    setAutoLegends
  } = useSettings();

  // Animação de entrada
  const [animationClass, setAnimationClass] = useState('');
  useEffect(() => {
      setAnimationClass('anim-enter');
  }, []);

  return (
    <>
      <div className={`content-box w-full ${animationClass} ${theme === 'escuro' ? 'tema-escuro' : ''}`}>
        
        {/* Título principal - REAGE AO TEMA */}
        <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
          Preferências De Ajustes
        </h1>

        <div className="space-y-8">
          {/* Seção Visuais - REAGE AO TEMA */}
          <div className={`rounded-lg shadow-md p-6 ${theme === 'escuro' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`font-bold text-xl md:text-2xl lg:text-3xl mb-6 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
              Visuais
            </h2>

            {/* Tamanho do texto - REAGE AO TEMA */}
            <div className="mb-6">
              <label className={`block font-semibold mb-2 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                Tamanho do texto
              </label>
              <div className="relative">
                <select
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value)} 
                  className={`w-full appearance-none border-2 rounded-full px-6 py-3 pr-12 font-medium cursor-pointer transition-colors focus:outline-none ${
                    theme === 'escuro'
                      ? 'bg-gray-700 border-purple-500 text-gray-200 hover:border-purple-400 focus:border-purple-300'
                      : 'bg-white border-purple-300 text-gray-700 hover:border-purple-400 focus:border-purple-500'
                  }`}
                >
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                  <option value="extra-grande">Extra Grande</option>
                </select>
                <svg className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-500'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {/* Tema - REAGE AO TEMA */}
            <div className="mb-6">
              <label className={`block font-semibold mb-2 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                Tema
              </label>
              <div className="relative">
                <select
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value)} 
                  className={`w-full appearance-none border-2 rounded-full px-6 py-3 pr-12 font-medium cursor-pointer transition-colors focus:outline-none ${
                    theme === 'escuro'
                      ? 'bg-gray-700 border-purple-500 text-gray-200 hover:border-purple-400 focus:border-purple-300'
                      : 'bg-white border-purple-300 text-gray-700 hover:border-purple-400 focus:border-purple-500'
                  }`}
                >
                  <option value="claro">Claro</option>
                  <option value="escuro">Escuro</option>
                </select>
                <svg className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-500'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {/* Filtros para daltonismo - REAGE AO TEMA */}
            <div className="mb-6">
              <label className={`block font-semibold mb-2 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                Filtros para daltonismo
              </label>
              <div className="relative">
                <select
                  value={colorBlindFilter} 
                  onChange={(e) => setColorBlindFilter(e.target.value)} 
                  className={`w-full appearance-none border-2 rounded-full px-6 py-3 pr-12 font-medium cursor-pointer transition-colors focus:outline-none ${
                    theme === 'escuro'
                      ? 'bg-gray-700 border-purple-500 text-gray-200 hover:border-purple-400 focus:border-purple-300'
                      : 'bg-white border-purple-300 text-gray-700 hover:border-purple-400 focus:border-purple-500'
                  }`}
                >
                  <option value="nenhum">Nenhum</option>
                  <option value="protanopia">Protanopia (Vermelho-Verde)</option>
                  <option value="deuteranopia">Deuteranopia (Verde-Vermelho)</option>
                  <option value="tritanopia">Tritanopia (Azul-Amarelo)</option>
                  <option value="monocromatico">Monocromático</option>
                </select>
                <svg className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-500'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {/* Áudio e Vídeo - REAGE AO TEMA */}
            <h3 className={`font-bold text-lg mt-8 mb-4 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
              Áudio e Vídeo
            </h3>
            <div className="mb-6">
              <label className={`block font-semibold mb-2 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                Legendas automáticas
              </label>
              <div className="relative">
                <select
                  value={autoLegends} 
                  onChange={(e) => setAutoLegends(e.target.value)} 
                  className={`w-full appearance-none border-2 rounded-full px-6 py-3 pr-12 font-medium cursor-pointer transition-colors focus:outline-none ${
                    theme === 'escuro'
                      ? 'bg-gray-700 border-purple-500 text-gray-200 hover:border-purple-400 focus:border-purple-300'
                      : 'bg-white border-purple-300 text-gray-700 hover:border-purple-400 focus:border-purple-500'
                  }`}
                >
                  {/* --- AQUI ESTAVA O ERRO --- */}
                  <option value="desativado">Desativado</option>
                  <option value="ativado">Ativado</option>
                </select>
                <svg className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-500'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {/* Demonstração de cores - REAGE AO TEMA */}
            <div className={`mt-8 p-6 rounded-xl border-2 ${
              theme === 'escuro'
                ? 'bg-gray-700 border-purple-500'
                : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
            }`}>
              <h4 className={`font-bold text-base mb-3 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                Pré-visualização de cores
              </h4>
              <div className="flex gap-3 flex-wrap">
                <div className="w-16 h-16 bg-red-500 rounded-lg shadow-md"></div>
                <div className="w-16 h-16 bg-green-500 rounded-lg shadow-md"></div>
                <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-md"></div>
                <div className="w-16 h-16 bg-yellow-500 rounded-lg shadow-md"></div>
                <div className="w-16 h-16 bg-purple-500 rounded-lg shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}