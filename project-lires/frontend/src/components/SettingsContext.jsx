import React, { createContext, useContext, useState, useEffect } from 'react';

// Chaves para o LocalStorage
const PREFS_KEYS = {
  fontSize: 'liresPrefs_fontSize',
  theme: 'liresPrefs_theme',
  colorBlindFilter: 'liresPrefs_colorBlindFilter',
  autoLegends: 'liresPrefs_autoLegends',
};

// 1. Criar o Contexto
const SettingsContext = createContext();

// 2. Criar o Provedor (o componente que "abraça" o app)
export function SettingsProvider({ children }) {
  // --- Estados ---
  // Lemos o valor inicial do localStorage
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem(PREFS_KEYS.fontSize) || 'medio'
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem(PREFS_KEYS.theme) || 'claro'
  );
  const [colorBlindFilter, setColorBlindFilter] = useState(
    () => localStorage.getItem(PREFS_KEYS.colorBlindFilter) || 'nenhum'
  );
  const [autoLegends, setAutoLegends] = useState(
    () => localStorage.getItem(PREFS_KEYS.autoLegends) || 'desativado'
  );

  // --- Efeitos Colaterais ---

  // Efeito para SALVAR no localStorage quando algo mudar
  useEffect(() => {
    localStorage.setItem(PREFS_KEYS.fontSize, fontSize);
    localStorage.setItem(PREFS_KEYS.theme, theme);
    localStorage.setItem(PREFS_KEYS.colorBlindFilter, colorBlindFilter);
    localStorage.setItem(PREFS_KEYS.autoLegends, autoLegends);
  }, [fontSize, theme, colorBlindFilter, autoLegends]);

  // Efeito para APLICAR estilos globais (na tag <html>)
  useEffect(() => {
    const root = document.documentElement; // <html>

    // 1. Aplicar Tema
    if (theme === 'escuro') {
      root.classList.add('tema-escuro');
      document.body.classList.add('tema-escuro');
    } else {
      root.classList.remove('tema-escuro');
      document.body.classList.remove('tema-escuro');
    }

    // 2. Aplicar Tamanho da Fonte
    const fontSizes = {
      pequeno: '14px',
      medio: '16px',
      grande: '18px',
      'extra-grande': '20px'
    };
    root.style.fontSize = fontSizes[fontSize];

    // 3. Aplicar Filtro de Daltonismo
    const filters = {
      nenhum: 'none',
      protanopia: 'url(#protanopia)',
      deuteranopia: 'url(#deuteranopia)',
      tritanopia: 'url(#tritanopia)',
      monocromatico: 'grayscale(100%)'
    };
    root.style.filter = filters[colorBlindFilter] || 'none';

  }, [fontSize, theme, colorBlindFilter]); // Roda sempre que as configs mudarem

  // 4. Montar o valor que será compartilhado
  const value = {
    fontSize,
    setFontSize,
    theme,
    setTheme,
    colorBlindFilter,
    setColorBlindFilter,
    autoLegends,
    setAutoLegends
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// 3. Criar um "hook" customizado para facilitar o uso
export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }
  return context;
}