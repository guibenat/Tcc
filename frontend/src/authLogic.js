// frontend/src/authLogic.js

// Função para lidar com login via e-mail/senha
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

    const destination = user.hasOnboarded ? '/home' : '/inicial';
    window.location.href = destination; 
    return null; 
};
 
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
        
    if (!cleanBase) cleanBase = 'aluno'; 
    
    let suffix = 1;
    let finalUsername = `${cleanBase}${formatNumber(suffix)}`; 
    while (isUsernameTaken(finalUsername, existingUsers)) {
        suffix++;
        finalUsername = `${cleanBase}${formatNumber(suffix)}`;
    }
    return finalUsername;
};

export const handleGoogleAuth = (googleData) => {
    const usersDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
    
    // Tenta encontrar o usuário pelo e-mail do Google
    const user = usersDB.find(user => user.email === googleData.email);

    if (user) {
        // Usuário Existe (Login) 
        console.log("Google Auth: Usuário encontrado, fazendo login...");
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        const destination = user.hasOnboarded ? '/home' : '/inicial';
        window.location.href = destination; // Força recarregamento

    } else {
        // Usuário NÃO Existe (Cadastro) 
        console.log("Google Auth: Usuário não encontrado, criando nova conta...");

        // Cria um username a partir do nome ou e-mail
        const baseUsername = googleData.name || googleData.email.split('@')[0];
        const finalUsername = generateUniqueUsername(baseUsername, usersDB);

        const newUser = {
            id: Date.now(), 
            name: googleData.name || finalUsername,
            username: finalUsername, 
            email: googleData.email,
            password: googleData.sub, 
            age: null, 
            isEmailVerified: true, 
            
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

        window.location.href = '/inicial';
    }
};