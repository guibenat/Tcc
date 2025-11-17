// src/authLogic.js

/**
 * Lógica de Login Padrão (Email/Senha)
 * Verifica o 'liresUsersDB' no localStorage.
 * Retorna uma string de erro em caso de falha, ou null em caso de sucesso.
 */
export const handleEmailLogin = (email, password) => {
    const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
    const user = usersDB.find(user => user.email === email);

    if (!user) {
        return 'E-mail não cadastrado. Por favor, crie uma conta.';
    }
    if (user.password !== password) {
        return 'Senha incorreta.';
    }

    // Sucesso
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redireciona com base no status do onboarding
    const destination = user.hasOnboarded ? '/home' : '/inicial';
    window.location.href = destination; // Usamos href para forçar o recarregamento do Context
    return null; // Sucesso
};


/**
 * Gera um username único (lógica movida do cadastro.jsx)
 * Ex: 'cauã' -> 'caua0001'
 */
const generateUniqueUsername = (baseUsername, existingUsers) => {
    const formatNumber = (num) => num.toString().padStart(4, '0');
    const isUsernameTaken = (username, users) => {
        return users.some(user => user.username === username);
    };

    // Limpa o nome (remove espaços, acentos, etc.)
    let cleanBase = baseUsername
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/\s+/g, '') // Remove espaços
        .replace(/[^a-zA-Z0-9]/g, '') // Remove caracteres especiais
        .toLowerCase();
        
    if (!cleanBase) cleanBase = 'aluno'; // Fallback
    
    let suffix = 1;
    let finalUsername = `${cleanBase}${formatNumber(suffix)}`; 
    while (isUsernameTaken(finalUsername, existingUsers)) {
        suffix++;
        finalUsername = `${cleanBase}${formatNumber(suffix)}`;
    }
    return finalUsername;
};


/**
 * Lógica Central de Autenticação do Google (Login OU Cadastro)
 * Esta é a função principal que os botões do Google irão chamar.
 */
export const handleGoogleAuth = (googleData) => {
    const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
    
    // 1. Tenta encontrar o usuário pelo e-mail do Google
    const user = usersDB.find(user => user.email === googleData.email);

    if (user) {
        // --- CASO 1: Usuário Existe (Login) ---
        console.log("Google Auth: Usuário encontrado, fazendo login...");
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        const destination = user.hasOnboarded ? '/home' : '/inicial';
        window.location.href = destination; // Força recarregamento

    } else {
        // --- CASO 2: Usuário NÃO Existe (Cadastro) ---
        console.log("Google Auth: Usuário não encontrado, criando nova conta...");

        // Cria um username a partir do nome ou e-mail
        const baseUsername = googleData.name || googleData.email.split('@')[0];
        const finalUsername = generateUniqueUsername(baseUsername, usersDB);

        const newUser = {
            id: Date.now(), 
            name: googleData.name || finalUsername,
            username: finalUsername, 
            email: googleData.email,
            // Usamos o Google ID (sub) como "senha" interna. Não é ideal, mas funciona para o TCC.
            password: googleData.sub, 
            age: null, // Idade não é coletada pelo Google
            isEmailVerified: true, // Google já verificou
            
            // Dados padrão do jogo
            hasOnboarded: false, // Vai para a tela /inicial
            lives: 5,
            lcoins: 0, 
            dailyStreak: 0, 
            lastCompletedTimestamp: null, 
            lessonProgress: {},
            followers: [], 
            following: [], 
            timeSpentToday: 0, 
            preferences: {
                theme: 'claro', 
                fontSize: 'medio',
                colorBlindFilter: 'nenhum',
                autoLegends: 'desativado'
            }
        };

        // Salva o novo usuário no DB e no currentUser
        const updatedUsers = [...usersDB, newUser];
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Redireciona para o Onboarding
        window.location.href = '/inicial';
    }
};