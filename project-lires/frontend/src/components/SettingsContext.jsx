import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Criar o Contexto
const SettingsContext = createContext();

// Helper para carregar o usuário atual
const getInitialUser = () => {
    try {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
};

// 2. Criar o Provedor
export function SettingsProvider({ children }) {
    
    const initialUser = getInitialUser();

    // --- Estados de Preferência ---
    const [fontSize, setFontSize] = useState(() => initialUser?.preferences?.fontSize || 'medio');
    const [theme, setTheme] = useState(() => initialUser?.preferences?.theme || 'claro');
    const [colorBlindFilter, setColorBlindFilter] = useState(() => initialUser?.preferences?.colorBlindFilter || 'nenhum');
    const [autoLegends, setAutoLegends] = useState(() => initialUser?.preferences?.autoLegends || 'desativado');

    // --- Estados de Jogo ---
    const [lives, setLives] = useState(() => initialUser?.lives ?? 5);
    const [lcoins, setLcoins] = useState(() => initialUser?.lcoins ?? 0);
    const [dailyStreak, setDailyStreak] = useState(() => initialUser?.dailyStreak ?? 0);
    const [hasOnboarded, setHasOnboarded] = useState(() => initialUser?.hasOnboarded ?? false);
    const [onboardingSelections, setOnboardingSelections] = useState(() => initialUser?.onboardingSelections || null);

    // --- MUDANÇA: 'completedLessons' foi substituído por 'lessonProgress' ---
    const [lessonProgress, setLessonProgress] = useState(
        () => initialUser?.lessonProgress || {} // Ex: { 'lesson-id': { completed: 1, total: 4 } }
    );
    // --- FIM DA MUDANÇA ---

    // Efeito para SALVAR dados no perfil do usuário
    useEffect(() => {
        const currentUserFromStorage = getInitialUser();
        if (!currentUserFromStorage) {
            return;
        }

        const updatedUser = {
            ...currentUserFromStorage,
            lives,
            lcoins,
            dailyStreak,
            hasOnboarded,
            onboardingSelections,
            // --- MUDANÇA: Salva o novo 'lessonProgress' ---
            lessonProgress, 
            // --- FIM DA MUDANÇA ---
            preferences: {
                fontSize,
                theme,
                colorBlindFilter,
                autoLegends,
            },
        };

        const updatedUserString = JSON.stringify(updatedUser);
        if (localStorage.getItem('currentUser') !== updatedUserString) {
            localStorage.setItem('currentUser', updatedUserString);
        }

        try {
            const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
            const userIndex = usersDB.findIndex(u => u.id === updatedUser.id);
            if (userIndex !== -1) {
                usersDB[userIndex] = updatedUser;
            	 localStorage.setItem('liresUsersDB', JSON.stringify(usersDB));
            }
        } catch (e) {
            console.error("Falha ao salvar no liresUsersDB:", e);
        }
        
    }, [
        fontSize, theme, colorBlindFilter, autoLegends, 
        lives, lcoins, dailyStreak, 
        hasOnboarded, onboardingSelections,
        lessonProgress // <-- Dependência atualizada
    ]);


    // Efeito para RECARREGAR dados no LOGIN/LOGOUT
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'currentUser') {
                const newUser = e.newValue ? JSON.parse(e.newValue) : null;
                setFontSize(newUser?.preferences?.fontSize || 'medio');
                setTheme(newUser?.preferences?.theme || 'claro');
                setColorBlindFilter(newUser?.preferences?.colorBlindFilter || 'nenhum');
        	       setAutoLegends(newUser?.preferences?.autoLegends || 'desativado');
        	       setLives(newUser?.lives ?? 5);
        	       setLcoins(newUser?.lcoins ?? 0);
        	   	   setDailyStreak(newUser?.dailyStreak ?? 0);
        	     	 setHasOnboarded(newUser?.hasOnboarded ?? false);
        	   	 	 setOnboardingSelections(newUser?.onboardingSelections || null);
        	     	 // --- MUDANÇA: Recarrega o novo 'lessonProgress' ---
        	   	 	 setLessonProgress(newUser?.lessonProgress || {});
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
        	 window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Executa apenas uma vez


    // Efeito para APLICAR estilos globais (sem alteração)
    useEffect(() => {
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
        dailyStreak, setDailyStreak, 
    	 hasOnboarded, setHasOnboarded,
    	 onboardingSelections, setOnboardingSelections,
    	 // --- MUDANÇA: Exporta 'lessonProgress' ---
    	 lessonProgress, setLessonProgress,
    };

    return (
    	 <SettingsContext.Provider value={value}>
      	 {children}
    	 </SettingsContext.Provider>
    );
}

// 3. Criar um "hook" customizado
export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
    	 throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
    }
    return context;
}