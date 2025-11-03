import React, { createContext, useContext, useState, useEffect } from 'react';

// Chaves para o LocalStorage
const PREFS_KEYS = {
  fontSize: 'liresPrefs_fontSize',
  theme: 'liresPrefs_theme',
  colorBlindFilter: 'liresPrefs_colorBlindFilter',
  autoLegends: 'liresPrefs_autoLegends',
  userLives: 'liresData_userLives',
  userLcoins: 'liresData_userLcoins',
  // --- 1. ADICIONADO ---
  completedLessons: 'liresData_completedLessons', 
};

// Helper para carregar NÚMEROS (você já tem)
const loadNumber = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  if (item) {
    try { return JSON.parse(item); } catch (e) { return defaultValue; }
  }
  return defaultValue;
};

// --- 2. ADICIONADO: Helper para carregar OBJETOS (para o progresso) ---
const loadObject = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  if (item) {
    try { return JSON.parse(item); } catch (e) { return defaultValue; }
  }
  return defaultValue;
};

// 1. Criar o Contexto
const SettingsContext = createContext();

// 2. Criar o Provedor
export function SettingsProvider({ children }) {
  // --- Estados de Preferência ---
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

  // --- Estados de Jogo ---
  const [lives, setLives] = useState(
    () => loadNumber(PREFS_KEYS.userLives, 5)
  );
  const [lcoins, setLcoins] = useState(
    () => loadNumber(PREFS_KEYS.userLcoins, 50)
  );
  // --- 3. ADICIONADO: Estado de Progresso ---
  const [completedLessons, setCompletedLessons] = useState(
    () => loadObject(PREFS_KEYS.completedLessons, {}) // Inicia como um objeto vazio {}
  );

  // --- Efeitos para Salvar no localStorage ---
  useEffect(() => {
    localStorage.setItem(PREFS_KEYS.fontSize, fontSize);
    localStorage.setItem(PREFS_KEYS.theme, theme);
    localStorage.setItem(PREFS_KEYS.colorBlindFilter, colorBlindFilter);
    localStorage.setItem(PREFS_KEYS.autoLegends, autoLegends);
    localStorage.setItem(PREFS_KEYS.userLives, JSON.stringify(lives));
    localStorage.setItem(PREFS_KEYS.userLcoins, JSON.stringify(lcoins));
    // --- 4. ADICIONADO: Salvar o progresso ---
    localStorage.setItem(PREFS_KEYS.completedLessons, JSON.stringify(completedLessons));
  }, [fontSize, theme, colorBlindFilter, autoLegends, lives, lcoins, completedLessons]); // Adicionada a nova dependência

  // Efeito para APLICAR estilos globais (sem alteração)
  useEffect(() => {
    // ... (seu código de aplicar tema, fonte e filtro) ...
    const root = document.documentElement;
    if (theme === 'escuro') {
      root.classList.add('tema-escuro');
      document.body.classList.add('tema-escuro');
    } else {
      root.classList.remove('tema-escuro');
      document.body.classList.remove('tema-escuro');
    }
    const fontSizes = { pequeno: '14px', medio: '16px', grande: '18px', 'extra-grande': '20px' };
    root.style.fontSize = fontSizes[fontSize];
    const filters = { nenhum: 'none', protanopia: 'url(#protanopia)', deuteranopia: 'url(#deuteranopia)', tritanopia: 'url(#tritanopia)', monocromatico: 'grayscale(100%)' };
    root.style.filter = filters[colorBlindFilter] || 'none';
  }, [fontSize, theme, colorBlindFilter]);

  // 4. Montar o valor que será compartilhado
  const value = {
    fontSize, setFontSize,
    theme, setTheme,
    colorBlindFilter, setColorBlindFilter,
    autoLegends, setAutoLegends,
    lives, setLives,
    lcoins, setLcoins,
    // --- 5. ADICIONADO: Compartilhar o progresso ---
    completedLessons, 
    setCompletedLessons,
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