const conn = require('../config/database/connect');

// Cadastro
exports.criarUsuario = async (nome, email, senhaHash) => {
  try {
    // Verifica
    const [existente] = await conn.query(
      'SELECT id FROM login_lires WHERE email_usuario = ?', 
      [email]
    );
    
    if (existente.length > 0) {
      throw new Error('Este email já está cadastrado.');
    }

    // Insere
    const sql = 'INSERT INTO login_lires (nome_usuario, email_usuario, senha) VALUES (?, ?, ?)';
    const [resultado] = await conn.query(sql, [nome, email, senhaHash]);

    // Dados
    return { id: resultado.insertId, nome, email };

  } catch (error) {
    throw error;
  }
}

// Login
exports.buscarUsuarioPorEmail = async (email) => {
  try {
    // Busca usuario
    const [usuarios] = await conn.query(
      'SELECT * FROM login_lires WHERE email_usuario = ?', 
      [email]
    );
    
    // Retorna
    return usuarios[0];

  } catch (error) {
    throw error;
  }
}
// Buscar perfil
exports.buscarUsuarioPorId = async (id) => {
  try {
    const sql = 'SELECT id, nome_usuario, email_usuario, vidas, moedas, sequencia FROM login_lires WHERE id = ?';
    const [usuarios] = await conn.query(sql, [id]);
    
    return usuarios[0]; // Retorna o usuário encontrado ou undefined se não encontrado

  } catch (error) {
    throw error;
  }
}
//Colecionáveis
exports.atualizarProgresso = async (id, vidas, moedas, sequencia) => {
  try {
    const sql = 'UPDATE login_lires SET vidas = ?, moedas = ?, sequencia = ? WHERE id = ?';

    await conn.query(sql, [vidas, moedas, sequencia, id]);

    return { id, vidas, moedas, sequencia };

  } catch (error) {
    throw error;
  }
}