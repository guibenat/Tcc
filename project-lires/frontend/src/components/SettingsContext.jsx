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

// --- LÓGICA DE VERIFICAÇÃO DIÁRIA (REFEITA) ---
const checkDailyStatsOnLoad = (user) => {
    if (!user) {
        return { 
            dailyStreak: 0, 
            lastCompletedTimestamp: null,
            timeSpentToday: 0,
            isStreakFreezeActive: false, // <-- Adicionado
            doubleXpExpiresAt: null // <-- Adicionado
        };
    }

    // --- INÍCIO DA MODIFICAÇÃO (Item "Congelar") ---
    let { dailyStreak, lastCompletedTimestamp, timeSpentToday, isStreakFreezeActive } = user;
    // --- FIM DA MODIFICAÇÃO ---

    // Pega o timestamp de "hoje" à meia-noite (no fuso horário local)
    const today = new Date();
    const todayTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    // Pega o timestamp de "ontem" à meia-noite
    const yesterdayTimestamp = todayTimestamp - 86400000; // 24 * 60 * 60 * 1000

    // 1. Verifica a Meta Diária (timeSpentToday)
    if (lastCompletedTimestamp !== todayTimestamp) {
        // Se a última atividade NÃO foi hoje, zera o tempo
        console.log("Resetando meta diária. Última atividade não foi hoje.");
        timeSpentToday = 0;
    }
    // Se foi hoje, 'timeSpentToday' mantém seu valor.

    // 2. Verifica a Sequência (dailyStreak)
    if (!lastCompletedTimestamp) {
        // Nunca completou uma lição
        dailyStreak = 0;
    } else if (lastCompletedTimestamp === todayTimestamp || lastCompletedTimestamp === yesterdayTimestamp) {
        // Está em dia (completou hoje ou ontem). Mantém o streak.
        console.log("Streak mantido:", dailyStreak);
    } else {
        // Perdeu a sequência (última vez foi anteontem ou antes).
        // --- INÍCIO DA MODIFICAÇÃO (Lógica do "Congelar") ---
        if (isStreakFreezeActive) {
            console.log("Quebra de sequência detectada, MAS o 'Congelar' foi usado!");
            // Simula que o usuário jogou "ontem" para manter a sequência
            lastCompletedTimestamp = yesterdayTimestamp;
            // Consome o item
            isStreakFreezeActive = false;
            // O streak é mantido (não vai para 0)
        } else {
            // Reseta.
            console.log("Quebra de sequência detectada no carregamento! Streak resetado para 0.");
            dailyStreak = 0;
        }
        // --- FIM DA MODIFICAÇÃO ---
    }

    // --- INÍCIO DA MODIFICAÇÃO (Retorno) ---
    return { dailyStreak, lastCompletedTimestamp, timeSpentToday, isStreakFreezeActive };
    // --- FIM DA MODIFICAÇÃO ---
};
// --- FIM DA LÓGICA DIÁRIA ---


// 2. Criar o Provedor
export function SettingsProvider({ children }) {
    
    const initialUser = getInitialUser();
    // Executa a verificação diária
    const initialStats = checkDailyStatsOnLoad(initialUser);

    // --- Estados de Preferência ---
    const [fontSize, setFontSize] = useState(() => initialUser?.preferences?.fontSize || 'medio');
    const [theme, setTheme] = useState(() => initialUser?.preferences?.theme || 'claro');
    const [colorBlindFilter, setColorBlindFilter] = useState(() => initialUser?.preferences?.colorBlindFilter || 'nenhum');
    const [autoLegends, setAutoLegends] = useState(() => initialUser?.preferences?.autoLegends || 'desativado');

    // --- Estados de Jogo (Atualizados) ---
    const [lives, setLives] = useState(() => initialUser?.lives ?? 5);
    const [lcoins, setLcoins] = useState(() => initialUser?.lcoins ?? 0);
    const [hasOnboarded, setHasOnboarded] = useState(() => initialUser?.hasOnboarded ?? false);
    const [onboardingSelections, setOnboardingSelections] = useState(() => initialUser?.onboardingSelections || null);
    const [lessonProgress, setLessonProgress] = useState(
        () => initialUser?.lessonProgress || {} 
    );
    const [followers, setFollowers] = useState(() => initialUser?.followers ?? []);
    const [following, setFollowing] = useState(() => initialUser?.following ?? []);
    
    // --- ESTADOS DE STREAK E META INICIALIZADOS PELA LÓGICA ---
    const [dailyStreak, setDailyStreak] = useState(initialStats.dailyStreak);
    const [lastCompletedTimestamp, setLastCompletedTimestamp] = useState(initialStats.lastCompletedTimestamp);
    const [timeSpentToday, setTimeSpentToday] = useState(initialStats.timeSpentToday); 
    
    // --- INÍCIO DA MODIFICAÇÃO (Novos Estados de Power-ups) ---
    // Se a lógica de load usou o "congelar", initialStats.isStreakFreezeActive será 'false'
    const [isStreakFreezeActive, setIsStreakFreezeActive] = useState(initialStats.isStreakFreezeActive);
    const [doubleXpExpiresAt, setDoubleXpExpiresAt] = useState(() => initialUser?.doubleXpExpiresAt ?? null);
    // --- FIM DA MODIFICAÇÃO ---


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
            lastCompletedTimestamp,
            timeSpentToday,
            isStreakFreezeActive, // <-- Salva o estado do "congelar"
            doubleXpExpiresAt, // <-- Salva o estado do "dobro xp"
            hasOnboarded,
            onboardingSelections,
            lessonProgress, 
            followers, 
            following,
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
        lives, lcoins, dailyStreak, lastCompletedTimestamp, timeSpentToday,
        isStreakFreezeActive, doubleXpExpiresAt, // <-- Adicionado às dependências
        hasOnboarded, onboardingSelections,
        lessonProgress,
        followers, following 
    ]);


    // Efeito para RECARREGAR dados no LOGIN/LOGOUT
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'currentUser') {
                const newUser = e.newValue ? JSON.parse(e.newValue) : null;
                
                const statsData = checkDailyStatsOnLoad(newUser);
                setDailyStreak(statsData.dailyStreak);
                setLastCompletedTimestamp(statsData.lastCompletedTimestamp);
                setTimeSpentToday(statsData.timeSpentToday);
                setIsStreakFreezeActive(statsData.isStreakFreezeActive); // <-- Adicionado

                setFontSize(newUser?.preferences?.fontSize || 'medio');
                setTheme(newUser?.preferences?.theme || 'claro');
                setColorBlindFilter(newUser?.preferences?.colorBlindFilter || 'nenhum');
                setAutoLegends(newUser?.preferences?.autoLegends || 'desativado');
                setLives(newUser?.lives ?? 5);
                setLcoins(newUser?.lcoins ?? 0);
                setDoubleXpExpiresAt(newUser?.doubleXpExpiresAt ?? null); // <-- Adicionado
                setHasOnboarded(newUser?.hasOnboarded ?? false);
                setOnboardingSelections(newUser?.onboardingSelections || null);
                setLessonProgress(newUser?.lessonProgress || {});
                setFollowers(newUser?.followers ?? []);
                setFollowing(newUser?.following ?? []);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
             window.removeEventListener('storage', handleStorageChange);
        };
    }, []); 


    // Efeito para APLICAR estilos globais (sem alteração)
    useEffect(() => {
        // ... (sem alterações aqui)
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
        lastCompletedTimestamp, setLastCompletedTimestamp,
        timeSpentToday, setTimeSpentToday,
        // --- INÍCIO DA MODIFICAÇÃO (Exporta novos estados) ---
        isStreakFreezeActive, setIsStreakFreezeActive,
        doubleXpExpiresAt, setDoubleXpExpiresAt,
        // --- FIM DA MODIFICAÇÃO ---
        hasOnboarded, setHasOnboarded,
        onboardingSelections, setOnboardingSelections,
        lessonProgress, setLessonProgress,
        followers, setFollowers,
        following, setFollowing,
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