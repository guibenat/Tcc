import React, { useState, useEffect } from 'react';
// REMOVIDO: import SidebarLeft from '../components/SidebarLeft';
// (O import do MeninoPerfil não está sendo usado, pode ser removido se quiser)
// import MeninoPerfil from '../assets/MeninoPerfilPostar.png';

export default function Preferencias() { // Nome do componente corrigido
  const [fontSize, setFontSize] = useState('medio');
  const [theme, setTheme] = useState('claro');
  const [colorBlindFilter, setColorBlindFilter] = useState('nenhum');
  const [autoLegends, setAutoLegends] = useState('desativado');

  // Animação de entrada
  const [animationClass, setAnimationClass] = useState('');
  useEffect(() => {
      setAnimationClass('anim-enter');
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    // Tamanhos de fonte
    const fontSizes = {
      pequeno: '14px',
      medio: '16px',
      grande: '18px',
      'extra-grande': '20px'
    };
    root.style.fontSize = fontSizes[fontSize];

    // Tema
    if (theme === 'escuro') {
      document.body.classList.add('tema-escuro');
      root.classList.add('tema-escuro');
    } else {
      document.body.classList.remove('tema-escuro');
      root.classList.remove('tema-escuro');
    }

    // Filtros daltonismo
    const filters = {
      nenhum: 'none',
      protanopia: 'url(#protanopia)',
      deuteranopia: 'url(#deuteranopia)',
      tritanopia: 'url(#tritanopia)',
      monocromatico: 'grayscale(100%)'
    };
    root.style.filter = filters[colorBlindFilter] || 'none';
  }, [fontSize, theme, colorBlindFilter]);

  return (
    <>
      {/* SVG Filters para daltonismo (mantido) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0"/>
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0"/>
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0 0, 0.433, 0.567, 0, 0 0, 0.475, 0.525, 0, 0 0, 0, 0, 1, 0"/>
          </filter>
        </defs>
      </svg>

      {/* REMOVIDO: A estrutura de layout antiga (divs externos, sidebars, margens) */}
      {/* ADICIONADO: O wrapper 'content-box' para animação */}
      <div className={`content-box w-full ${animationClass} ${theme === 'escuro' ? 'tema-escuro' : ''}`}>
        
        {/* Título principal */}
        <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
          Preferências De Ajustes
        </h1>

        {/* Conteúdo principal - configurações */}
        <div className="space-y-8">
          {/* Seção Visuais */}
          <div className={`rounded-lg shadow-md p-6 ${theme === 'escuro' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`font-bold text-xl md:text-2xl lg:text-3xl mb-6 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
              Visuais
            </h2>

            {/* Tamanho do texto */}
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

            {/* Tema */}
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

            {/* Filtros para daltonismo */}
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

            {/* Áudio e Vídeo */}
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
                  <option value="desativado">Desativado</option>
                  <option value="ativado">Ativado</option>
                </select>
                <svg className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-500'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {/* Demonstração de cores */}
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