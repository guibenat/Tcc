const db = require("../config/database/connect");

const AuthModel = {
  criarUsuario: async (nome, email, senhaHash, idade) => {
    // Definindo os valores padrão do "Kit Inicial"
    const vidasPadrao = 5;
    const moedasPadrao = 150;
    const sequenciaPadrao = 1;

    const sql =
      "INSERT INTO login_lires (nome_usuario, email_usuario, senha, idade_usuario, vidas, moedas, sequencia) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // conexão com o banco de dados
    const [result] = await db.query(sql, [
      nome,
      email,
      senhaHash,
      idade,
      vidasPadrao,
      moedasPadrao,
      sequenciaPadrao,
    ]);

    return {
      id: result.insertId,
      nome,
      email,
      idade,
      vidas: vidasPadrao,
      moedas: moedasPadrao,
      sequencia: sequenciaPadrao,
    };
  },

  buscarUsuarioPorEmail: async (email) => {
    const sql = "SELECT * FROM login_lires WHERE email_usuario = ?";
    const [rows] = await db.query(sql, [email]);
    if (rows.length === 0) return null;
    return rows[0];
  },

  buscarUsuarioPorId: async (id) => {
    const sql =
      "SELECT id, nome_usuario, email_usuario, vidas, moedas, sequencia FROM login_lires WHERE id = ?";
    const [rows] = await db.query(sql, [id]);
    if (rows.length === 0) return null;
    return rows[0];
  },

  atualizarProgresso: async (id, vidas, moedas, sequencia) => {
    const sql =
      "UPDATE login_lires SET vidas = ?, moedas = ?, sequencia = ? WHERE id = ?";
    await db.query(sql, [vidas, moedas, sequencia, id]);
    return { id, vidas, moedas, sequencia };
  },
};

module.exports = AuthModel;
