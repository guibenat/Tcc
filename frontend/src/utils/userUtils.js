// Verifique se o caminho da importação está correto!
// Se a pasta 'utils' está dentro de 'src', então para ir para 'services' é '../services/api'
import api from '../services/api';

export const updateUserStats = async (newStats) => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return;

    let user = JSON.parse(storedUser);
    const updatedUser = { ...user, ...newStats };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    updateLocalDatabaseBackup(updatedUser);

    try {
        // salvar no backend
        await api.put('/colecionaveis', {
            vidas: updatedUser.lives,
            moedas: updatedUser.lcoins,
            sequencia: updatedUser.dailyStreak
        });
        console.log("Dados sincronizados com o servidor!");
        // capta erros
    } catch (error) {
        console.error("Erro ao salvar no servidor:", error);
    }

    return updatedUser;
};

const updateLocalDatabaseBackup = (updatedUser) => {
    const existingDB = JSON.parse(localStorage.getItem('liresUsersDB')) || [];
    const userIndex = existingDB.findIndex(u => u.id === updatedUser.id);
    if (userIndex >= 0) {
        existingDB[userIndex] = updatedUser;
    } else {
        existingDB.push(updatedUser);
    }
    localStorage.setItem('liresUsersDB', JSON.stringify(existingDB));
};