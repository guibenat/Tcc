/**
 * SettingsContext.jsx
 * * Este é o "cérebro" do app. É o Contexto Global do React que armazena
 * todo o estado do usuário logado, incluindo:
 * - Preferências (tema, fonte)
 * - Status do Jogo (vidas, lcoins, sequência, progresso)
 * - Power-ups (congelar, dobro xp)
 * - Lógica de regeneração de vidas
 * - Lógica de salvar automaticamente no localStorage
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Crio o contexto
const SettingsContext = createContext();

/**
 * Puxa o 'currentUser' do localStorage.
 * Esta é a fonte de verdade inicial quando o app carrega.
 */
const getInitialUser = () => {
    try {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error("Falha ao ler o currentUser do localStorage:", e);
        return null;
    }
};

/**
 * Lógica de verificação diária (função pura).
 * Isso roda UMA VEZ quando o app carrega.
 * Ele pega o usuário salvo e calcula qual deve ser o estado *atual*
 * da sequência (streak), meta diária, etc.
 */
const checkDailyStatsOnLoad = (user) => {
    // Se não há usuário, retorna tudo zerado.
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
    // 'todayTimestamp' é a meia-noite de HOJE.
    const todayTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    // 'yesterdayTimestamp' é a meia-noite de ONTEM.
    const yesterdayTimestamp = todayTimestamp - 86400000; // 24h em ms

    // 1. Verifica a meta diária
    // Se a última lição completada NÃO foi hoje, reseta o tempo gasto.
    if (lastCompletedTimestamp !== todayTimestamp) {
        console.log("Resetando meta diária. Última atividade não foi hoje.");
        timeSpentToday = 0;
    }

    // 2. Verifica a sequência (streak)
    if (!lastCompletedTimestamp) {
        // Nunca jogou
        dailyStreak = 0;
    } else if (lastCompletedTimestamp === todayTimestamp || lastCompletedTimestamp === yesterdayTimestamp) {
        // Jogou hoje OU jogou ontem -> Mantém a sequência
        console.log("Streak mantido:", dailyStreak);
    } else {
        // Quebra de sequência detectada (jogou anteontem ou antes)
        
        // 2a. Verifica se o "Congelar" estava ativo
        if (isStreakFreezeActive) {
            console.log("Quebra de sequência detectada, MAS o 'Congelar' foi usado!");
            // "Finge" que o usuário jogou ontem para manter a sequência
            lastCompletedTimestamp = yesterdayTimestamp; 
            isStreakFreezeActive = false; // Gasta o item
        } else {
            // Se não tinha o "Congelar", zera a sequência
            console.log("Quebra de sequência detectada no carregamento! Streak resetado para 0.");
            dailyStreak = 0;
        }
    }

    // Retorna os valores iniciais calculados
    return { dailyStreak, lastCompletedTimestamp, timeSpentToday, isStreakFreezeActive };
};

/**
 * O Provedor do Contexto
 * Este componente "envolve" o App e fornece todos os estados globais.
 */
export function SettingsProvider({ children }) {
    // Puxo o usuário salvo no localStorage
    const initialUser = getInitialUser();
    // Calculo o estado inicial do streak/meta com base no usuário
    const initialStats = checkDailyStatsOnLoad(initialUser);

    // --- Estados de Preferência ---
    const [fontSize, setFontSize] = useState(() => initialUser?.preferences?.fontSize || 'medio');
    const [theme, setTheme] = useState(() => initialUser?.preferences?.theme || 'claro');
    const [colorBlindFilter, setColorBlindFilter] = useState(() => initialUser?.preferences?.colorBlindFilter || 'nenhum');
    const [autoLegends, setAutoLegends] = useState(() => initialUser?.preferences?.autoLegends || 'desativado');

    // --- Estados de Jogo ---
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

    // --- Power-ups ---
    const [isStreakFreezeActive, setIsStreakFreezeActive] = useState(initialStats.isStreakFreezeActive);
    const [doubleXpExpiresAt, setDoubleXpExpiresAt] = useState(() => initialUser?.doubleXpExpiresAt ?? null);

    // --- Regeneração de Vidas ---
    // 'livesRegenerationTime' é o timestamp futuro (ex: 14:30) em que as vidas serão restauradas
    const [livesRegenerationTime, setLivesRegenerationTime] = useState(() => initialUser?.livesRegenerationTime || null);
    // 'isRegeneratingLives' é só um booleano para a UI (ex: mostrar o timer)
    const [isRegeneratingLives, setIsRegeneratingLives] = useState(false);

    // Lógica de Regeneração de Vidas (3-partes)

    // 1. Verifica e inicia regeneração AO CARREGAR
    useEffect(() => {
        // Se eu carreguei o app com 0 vidas e um tempo de regeneração salvo...
        if (livesRegenerationTime && lives === 0) {
            const now = Date.now();
            const timeRemaining = livesRegenerationTime - now;

            if (timeRemaining > 0) {
                // O timer ainda está correndo
                console.log(`Regeneração em andamento. Faltam ${Math.ceil(timeRemaining / 1000)}s`);
                setIsRegeneratingLives(true);
            } else {
                // O timer já acabou enquanto o app estava fechado
                console.log("Tempo de regeneração expirado. Restaurando vidas.");
                setLives(5);
                setLivesRegenerationTime(null);
                setIsRegeneratingLives(false);
            }
        }
    }, []); // Roda só no load inicial

    // 2. O Timer de Regeneração (só roda se 'livesRegenerationTime' estiver setado)
    useEffect(() => {
        // Se eu tenho vidas ou não tenho um timer, não faço nada.
        if (!livesRegenerationTime || lives > 0) {
            setIsRegeneratingLives(false);
            return;
        }

        const now = Date.now();
        const timeRemaining = livesRegenerationTime - now;

        // Se o tempo acabou (ex: o usuário deixou o app aberto)
        if (timeRemaining <= 0) {
            console.log("Regeneração completa! Restaurando 5 vidas.");
            setLives(5);
            setLivesRegenerationTime(null);
            setIsRegeneratingLives(false);
            return;
        }

        // Se ainda tem tempo, ligo o 'isRegenerating' (para a UI)
        setIsRegeneratingLives(true);

        // Crio o timer (setTimeout) que vai rodar QUANDO o tempo acabar
        const timer = setTimeout(() => {
            console.log("Timer expirou. Restaurando vidas.");
            setLives(5);
            setLivesRegenerationTime(null);
            setIsRegeneratingLives(false);
        }, timeRemaining); // O tempo de espera é o tempo que falta

        // Função de limpeza (cleanup) do useEffect
        return () => clearTimeout(timer);
    }, [livesRegenerationTime, lives]); // Roda se o 'livesRegenerationTime' mudar ou se as 'vidas' mudarem

    // 3. O "Gatilho" - Detecta quando as vidas chegam a 0
    useEffect(() => {
        // Se as vidas acabaram (lives === 0) E eu ainda não tenho um timer rodando...
        if (lives === 0 && !livesRegenerationTime) {
            console.log("Vidas chegaram a 0. Iniciando regeneração.");
            startLivesRegeneration(); // Chama a função que SETA o 'livesRegenerationTime'
        }
    }, [lives, livesRegenerationTime]); // Roda se as 'vidas' mudarem

    // Função que INICIA a regeneração (usada pelo gatilho acima)
    const startLivesRegeneration = () => {
        // Seta o tempo de regeneração para 2 minutos (120000 ms) a partir de agora
        const regenerationTime = Date.now() + 2 * 60 * 1000; 
        console.log("Iniciando regeneração de vidas. Tempo:", new Date(regenerationTime).toLocaleTimeString());
        setLivesRegenerationTime(regenerationTime);
        setIsRegeneratingLives(true);
    };


    /**
     * --- O GRANDE "AUTO-SAVE" (useEffect) ---
     * * Este é o hook mais importante. Ele "observa" quase todos os estados.
     * Qualquer mudança (ex: 'setLcoins', 'setTheme', 'setLessonProgress')
     * vai disparar este efeito, que salva o estado ATUALIZADO no localStorage.
     * * Isso garante que os dados estejam sempre persistidos.
     */
    useEffect(() => {
        const currentUserFromStorage = getInitialUser();
        // Se não tem usuário logado (ex: tela de login), não salva nada.
        if (!currentUserFromStorage) return;

        // 1. Monta o objeto 'updatedUser' com TODOS os estados atuais
        const updatedUser = {
            ...currentUserFromStorage, // Pega a base (id, username, email, etc)
            
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

        // 2. Salva o usuário atualizado no 'currentUser'
        const updatedUserString = JSON.stringify(updatedUser);
        // (Checagem bônus: só salva se o conteúdo realmente mudou)
        if (localStorage.getItem('currentUser') !== updatedUserString) {
            localStorage.setItem('currentUser', updatedUserString);
        }

        // 3. Atualiza o "banco de dados" (liresUsersDB) também
        // Isso é vital para que, se o usuário deslogar e logar de novo,
        // o progresso dele seja carregado do liresUsersDB.
        try {
            const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
            const userIndex = usersDB.findIndex(u => u.id === updatedUser.id);
            
            if (userIndex !== -1) {
                // Encontrou o usuário no DB, atualiza ele
                usersDB[userIndex] = updatedUser;
                localStorage.setItem('liresUsersDB', JSON.stringify(usersDB));
            }
        } catch (e) {
            console.error("Falha ao salvar no liresUsersDB:", e);
        }
    }, [
        // O array de dependências: QUALQUER mudança em um desses itens
        // vai disparar o "auto-save" acima.
        fontSize, theme, colorBlindFilter, autoLegends,
        lives, lcoins, dailyStreak, lastCompletedTimestamp, timeSpentToday,
        isStreakFreezeActive, doubleXpExpiresAt,
        hasOnboarded, onboardingSelections,
        lessonProgress, followers, following,
        livesRegenerationTime
    ]);

    /**
     * --- Sincronização entre Abas (Cross-Tab Sync) ---
     * * Este hook ouve o 'storage' event.
     * Se o usuário (ex: deslogar) em OUTRA aba, o 'currentUser' no localStorage
     * vai mudar. Esta aba vai "ouvir" essa mudança e forçar um
     * "re-load" de todos os estados, espelhando a outra aba.
     */
    useEffect(() => {
        const handleStorageChange = (e) => {
            // Se a mudança foi no 'currentUser'
            if (e.key === 'currentUser') {
                const newUser = e.newValue ? JSON.parse(e.newValue) : null;
                // Roda a lógica de verificação de stats
                const statsData = checkDailyStatsOnLoad(newUser);
                
                // Reseta TODOS os estados para os valores do novo usuário (ou 'null' se deslogou)
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
    }, []); // Roda só uma vez (para registrar o 'listener')

    /**
     * --- Aplicar Estilos Globais (Tema, Fonte, Filtro) ---
     * * Este hook aplica as preferências do usuário diretamente no
     * elemento <html> (documentElement) para que o CSS global reaja.
     */
    useEffect(() => {
        const root = document.documentElement; // <html>
        
        // Aplica o tema
        if (theme === 'escuro') {
            root.classList.add('tema-escuro');
            document.body.classList.add('tema-escuro');
        } else {
            root.classList.remove('tema-escuro');
            document.body.classList.remove('tema-escuro');
        }
        
        // Aplica o tamanho da fonte
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
        
    }, [fontSize, theme, colorBlindFilter]); // Roda se qualquer preferência de estilo mudar

    // 'value' é o objeto que será "provido" para todos os componentes filhos
    // que usarem o hook 'useSettings()'.
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
        startLivesRegeneration, // Exponho a função de iniciar a regeneração
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

/**
 * O hook customizado 'useSettings'.
 * É o que os componentes (ex: LojaSidebar, MobileTopBar)
 * vão importar para acessar o contexto.
 */
export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        // Erro útil para o dev
        throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
    }
    return context;
}