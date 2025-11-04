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
    
    // Carrega o usuário inicial UMA VEZ para definir os estados
    const initialUser = getInitialUser();

    // --- Estados de Preferência (lidos do usuário ou padrão) ---
    const [fontSize, setFontSize] = useState(
        () => initialUser?.preferences?.fontSize || 'medio'
    );
    const [theme, setTheme] = useState(
        () => initialUser?.preferences?.theme || 'claro'
    );
    const [colorBlindFilter, setColorBlindFilter] = useState(
        () => initialUser?.preferences?.colorBlindFilter || 'nenhum'
    );
    const [autoLegends, setAutoLegends] = useState(
        () => initialUser?.preferences?.autoLegends || 'desativado'
    );

    // --- Estados de Jogo (lidos do usuário ou padrão) ---
    const [lives, setLives] = useState(
        () => initialUser?.lives ?? 5
    );
    const [lcoins, setLcoins] = useState(
        () => initialUser?.lcoins ?? 0
    );
    const [dailyStreak, setDailyStreak] = useState(
        () => initialUser?.dailyStreak ?? 0
    );
    const [completedLessons, setCompletedLessons] = useState(
        () => initialUser?.completedLessons || {}
    );
    
    // --- Estados de Onboarding ---
    const [hasOnboarded, setHasOnboarded] = useState(
        () => initialUser?.hasOnboarded ?? false
    );
    const [onboardingSelections, setOnboardingSelections] = useState(
        () => initialUser?.onboardingSelections || null
    );

    // --- MUDANÇA PRINCIPAL: EFEITO DE SALVAR DADOS ---
    // Este efeito agora é a ÚNICA fonte da verdade para salvar.
    useEffect(() => {
        // 1. Lê o usuário MAIS ATUAL direto do localStorage.
        // Isso impede o uso de um estado 'currentUser' obsoleto.
        const currentUserFromStorage = getInitialUser();

        // Se não há usuário logado (ex: acabou de deslogar), não faz nada.
        if (!currentUserFromStorage) {
            return;
        }

        // 2. Cria o objeto de usuário atualizado
        const updatedUser = {
            ...currentUserFromStorage, // Usa o usuário recém-lido
            lives,
            lcoins,
            dailyStreak,
            completedLessons,
            hasOnboarded,
            onboardingSelections,
            preferences: {
                fontSize,
                theme,
                colorBlindFilter,
                autoLegends,
            },
        };

        // 3. Salva o usuário atualizado no currentUser (sessão)
        // (Convertemos para string para comparar e evitar loops)
        const updatedUserString = JSON.stringify(updatedUser);
        if (localStorage.getItem('currentUser') !== updatedUserString) {
            localStorage.setItem('currentUser', updatedUserString);
        }

        // 4. Salva o usuário atualizado no liresUsersDB (persistência)
        try {
            const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
            // Encontra pela ID, que é mais confiável
            const userIndex = usersDB.findIndex(u => u.id === updatedUser.id);

            if (userIndex !== -1) {
                usersDB[userIndex] = updatedUser;
                localStorage.setItem('liresUsersDB', JSON.stringify(usersDB));
            } else {
                // Se por algum motivo não achar, adiciona (embora não devesse acontecer)
                usersDB.push(updatedUser);
                localStorage.setItem('liresUsersDB', JSON.stringify(usersDB));
            }
        } catch (e) {
            console.error("Falha ao salvar no liresUsersDB:", e);
        }
        
    }, [
        // O efeito roda sempre que QUALQUER um desses estados mudar
        fontSize, theme, colorBlindFilter, autoLegends, 
        lives, lcoins, dailyStreak, completedLessons, 
        hasOnboarded, onboardingSelections
    ]);
    // --- FIM DA MUDANÇA ---


    // Efeito para RECARREGAR dados no LOGIN/LOGOUT
    useEffect(() => {
        const handleStorageChange = (e) => {
            // Ouve apenas a mudança do 'currentUser' (login/logout)
            if (e.key === 'currentUser') {
                const newUser = e.newValue ? JSON.parse(e.newValue) : null;

                // Recarregar todos os estados com base no novo usuário (ou resetar se for logout)
                setFontSize(newUser?.preferences?.fontSize || 'medio');
                setTheme(newUser?.preferences?.theme || 'claro');
                setColorBlindFilter(newUser?.preferences?.colorBlindFilter || 'nenhum');
                setAutoLegends(newUser?.preferences?.autoLegends || 'desativado');
                setLives(newUser?.lives ?? 5);
                setLcoins(newUser?.lcoins ?? 0);
                setDailyStreak(newUser?.dailyStreak ?? 0);
                setCompletedLessons(newUser?.completedLessons || {});
                setHasOnboarded(newUser?.hasOnboarded ?? false);
                setOnboardingSelections(newUser?.onboardingSelections || null);
            }
        };
        
        // Este listener agora serve para SINCRONIZAR OUTRAS ABAS
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
        completedLessons, setCompletedLessons,
        hasOnboarded, setHasOnboarded,
        onboardingSelections, setOnboardingSelections,
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