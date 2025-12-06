import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();


const getInitialUser = () => {
    try {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error("Falha ao ler o currentUser do localStorage:", e);
        return null;
    }
};

// Logica para checar e ajustar os stats diários ao carregar o app
const checkDailyStatsOnLoad = (user) => {
    if (!user) {
        return {
            dailyStreak: 0,
            lastCompletedTimestamp: null,
            timeSpentToday: 0,
            isStreakFreezeActive: false,
            doubleXpExpiresAt: null
        };
    }

    let { dailyStreak, lastCompletedTimestamp, timeSpentToday, isStreakFreezeActive } = user;

    const today = new Date();
    const todayTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const yesterdayTimestamp = todayTimestamp - 86400000; 
    if (lastCompletedTimestamp !== todayTimestamp) {
        console.log("Resetando meta diária. Última atividade não foi hoje.");
        timeSpentToday = 0;
    }

    // Verifica a sequência 
    if (!lastCompletedTimestamp) {
        dailyStreak = 0;
    } else if (lastCompletedTimestamp === todayTimestamp || lastCompletedTimestamp === yesterdayTimestamp) {
    } else {
        if (isStreakFreezeActive) {
            console.log("Quebra de sequência detectada, MAS o 'Congelar' foi usado!");
            lastCompletedTimestamp = yesterdayTimestamp; 
            isStreakFreezeActive = false; 
        } else {
            console.log("Quebra de sequência detectada no carregamento! Streak resetado para 0.");
            dailyStreak = 0;
        }
    }
    return { dailyStreak, lastCompletedTimestamp, timeSpentToday, isStreakFreezeActive };
};

export function SettingsProvider({ children }) {
    const initialUser = getInitialUser();
    const initialStats = checkDailyStatsOnLoad(initialUser);

    // Estados de Preferência 
    const [fontSize, setFontSize] = useState(() => initialUser?.preferences?.fontSize || 'medio');
    const [theme, setTheme] = useState(() => initialUser?.preferences?.theme || 'claro');
    const [colorBlindFilter, setColorBlindFilter] = useState(() => initialUser?.preferences?.colorBlindFilter || 'nenhum');
    const [autoLegends, setAutoLegends] = useState(() => initialUser?.preferences?.autoLegends || 'desativado');

    // Estados de Jogo
    const [lives, setLives] = useState(() => initialUser?.lives ?? 5);
    const [lcoins, setLcoins] = useState(() => initialUser?.lcoins ?? 0);
    const [hasOnboarded, setHasOnboarded] = useState(() => initialUser?.hasOnboarded ?? false);
    const [onboardingSelections, setOnboardingSelections] = useState(() => initialUser?.onboardingSelections || null);
    const [lessonProgress, setLessonProgress] = useState(() => initialUser?.lessonProgress || {});
    const [followers, setFollowers] = useState(() => initialUser?.followers ?? []);
    const [following, setFollowing] = useState(() => initialUser?.following ?? []);

    // Estados calculados pela lógica de verificação diária
    const [dailyStreak, setDailyStreak] = useState(initialStats.dailyStreak);
    const [lastCompletedTimestamp, setLastCompletedTimestamp] = useState(initialStats.lastCompletedTimestamp);
    const [timeSpentToday, setTimeSpentToday] = useState(initialStats.timeSpentToday);

    // Power-ups 
    const [isStreakFreezeActive, setIsStreakFreezeActive] = useState(initialStats.isStreakFreezeActive);
    const [doubleXpExpiresAt, setDoubleXpExpiresAt] = useState(() => initialUser?.doubleXpExpiresAt ?? null);

    // Regeneração de Vidas
    const [livesRegenerationTime, setLivesRegenerationTime] = useState(() => initialUser?.livesRegenerationTime || null);
    const [isRegeneratingLives, setIsRegeneratingLives] = useState(false);

    // Lógica de Regeneração de Vidas 
    useEffect(() => {
        if (livesRegenerationTime && lives === 0) {
            const now = Date.now();
            const timeRemaining = livesRegenerationTime - now;

            if (timeRemaining > 0) {
                console.log(`Regeneração em andamento. Faltam ${Math.ceil(timeRemaining / 1000)}s`);
                setIsRegeneratingLives(true);
            } else {
                console.log("Tempo de regeneração expirado. Restaurando vidas.");
                setLives(5);
                setLivesRegenerationTime(null);
                setIsRegeneratingLives(false);
            }
        }
    }, []);
    useEffect(() => {
        if (!livesRegenerationTime || lives > 0) {
            setIsRegeneratingLives(false);
            return;
        }

        const now = Date.now();
        const timeRemaining = livesRegenerationTime - now;

        if (timeRemaining <= 0) {
            console.log("Regeneração completa! Restaurando 5 vidas.");
            setLives(5);
            setLivesRegenerationTime(null);
            setIsRegeneratingLives(false);
            return;
        }

        setIsRegeneratingLives(true);

        const timer = setTimeout(() => {
            console.log("Timer expirou. Restaurando vidas.");
            setLives(5);
            setLivesRegenerationTime(null);
            setIsRegeneratingLives(false);
        }, timeRemaining);

        // Função de limpeza 

        return () => clearTimeout(timer);
    }, [livesRegenerationTime, lives]); 
    useEffect(() => {
        if (lives === 0 && !livesRegenerationTime) {
            console.log("Vidas chegaram a 0. Iniciando regeneração.");
            startLivesRegeneration(); 
        }
    }, [lives, livesRegenerationTime]); 
    const startLivesRegeneration = () => {
        const regenerationTime = Date.now() + 2 * 60 * 1000; 
        console.log("Iniciando regeneração de vidas. Tempo:", new Date(regenerationTime).toLocaleTimeString());
        setLivesRegenerationTime(regenerationTime);
        setIsRegeneratingLives(true);
    };


    // Auto-Save para localStorage

    useEffect(() => {
        const currentUserFromStorage = getInitialUser();
        if (!currentUserFromStorage) return;

        const updatedUser = {
            ...currentUserFromStorage, // Pega a base 
            // Sobrescreve com os estados atuais do React
            lives,
            lcoins,
            dailyStreak,
            lastCompletedTimestamp,
            timeSpentToday,
            isStreakFreezeActive,
            doubleXpExpiresAt,
            hasOnboarded,
            onboardingSelections,
            lessonProgress,
            followers,
            following,
            livesRegenerationTime,
            preferences: {
                fontSize,
                theme,
                colorBlindFilter,
                autoLegends,
            },
        };

        // Salva o usuário atualizado 
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
        isStreakFreezeActive, doubleXpExpiresAt,
        hasOnboarded, onboardingSelections,
        lessonProgress, followers, following,
        livesRegenerationTime
    ]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'currentUser') {
                const newUser = e.newValue ? JSON.parse(e.newValue) : null;
                const statsData = checkDailyStatsOnLoad(newUser);
                setDailyStreak(statsData.dailyStreak);
                setLastCompletedTimestamp(statsData.lastCompletedTimestamp);
                setTimeSpentToday(statsData.timeSpentToday);
                setIsStreakFreezeActive(statsData.isStreakFreezeActive);

                setFontSize(newUser?.preferences?.fontSize || 'medio');
                setTheme(newUser?.preferences?.theme || 'claro');
                setColorBlindFilter(newUser?.preferences?.colorBlindFilter || 'nenhum');
                setAutoLegends(newUser?.preferences?.autoLegends || 'desativado');
                setLives(newUser?.lives ?? 5);
                setLcoins(newUser?.lcoins ?? 0);
                setDoubleXpExpiresAt(newUser?.doubleXpExpiresAt ?? null);
                setHasOnboarded(newUser?.hasOnboarded ?? false);
                setOnboardingSelections(newUser?.onboardingSelections || null);
                setLessonProgress(newUser?.lessonProgress || {});
                setFollowers(newUser?.followers ?? []);
                setFollowing(newUser?.following ?? []);
                setLivesRegenerationTime(newUser?.livesRegenerationTime || null);
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []); 

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
        
        // Aplica o filtro de daltonismo
        const filters = {
            nenhum: 'none',
            protanopia: 'url(#protanopia)',
            deuteranopia: 'url(#deuteranopia)',
            tritanopia: 'url(#tritanopia)',
            monocromatico: 'grayscale(100%)'
        };
        root.style.filter = filters[colorBlindFilter] || 'none';
        
    }, [fontSize, theme, colorBlindFilter]); 

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
        isStreakFreezeActive, setIsStreakFreezeActive,
        doubleXpExpiresAt, setDoubleXpExpiresAt,
        hasOnboarded, setHasOnboarded,
        onboardingSelections, setOnboardingSelections,
        lessonProgress, setLessonProgress,
        followers, setFollowers,
        following, setFollowing,
        livesRegenerationTime,
        isRegeneratingLives,
        startLivesRegeneration, 
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}


export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
    }
    return context;
}