const authModel = require("../Models/AuthModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.cadastrarUsuario = async (req, res) => {
  try {
    //Validação
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Por favor, preencha todos os campos." });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar o usuário
    const novoUsuario = await authModel.criarUsuario(nome, email, senhaHash);

    // Resposta
    return res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    });
  } catch (error) {
    console.error("Erro no AuthController:cadastro", error);
    if (error.message === "Este email já está cadastrado.") {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

// Login

exports.logarUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: "Por favor, preencha todos os campos." });
    }

    //Buscar o usuário
    const usuario = await authModel.buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    //Gerar o token
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome_usuario},
      "PALMEIRAS_MAIOR_CAMPEAO_DO_BRASIL",
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome_usuario,
        email: usuario.email_usuario,
        vidas: usuario.vidas,
        moedas: usuario.moedas,
        sequencia: usuario.sequencia,
      },
    });
  } catch (error) {
    console.error("Erro no AuthController (login):", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
// Middleware
exports.verificarToken = (req, res, next) => {
  try {
    
    const SEGREDO_JWT = 'PALMEIRAS_MAIOR_CAMPEAO_DO_BRASIL'; 
    // Buscar
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    // Verificar
    const payload = jwt.verify(token, SEGREDO_JWT);

    req.usuarioId = payload.id;

    return next();

  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
exports.buscarPerfil = async (req, res) => {
  try {
    // Pegar o ID do usuário do token
    const idDoUsuarioLogado = req.usuarioId; 

    // Chamar o Model
    const usuario = await authModel.buscarUsuarioPorId(idDoUsuarioLogado);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Retorna os dados
    return res.status(200).json(usuario);

  } catch (error) {
    console.error('Erro no AuthController (buscarPerfil):', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
exports.atualizarColecionaveis = async (req, res) => {
  try {
    // Pegar o ID do usuário do token
    const idDoUsuarioLogado = req.usuarioId;

    // Os novos dados vêm do corpo (body) da requisição
    const { vidas, moedas, sequencia } = req.body;

    // Validação
    if (vidas === undefined || moedas === undefined || sequencia === undefined) {
      return res.status(400).json({ error: 'Dados incompletos (vidas, moedas, sequencia)' });
    }

    // Atualizar
    const progressoAtualizado = await authModel.atualizarProgresso(
      idDoUsuarioLogado,
      vidas,
      moedas,
      sequencia
    );

    // Retornar o progresso 
    return res.status(200).json(progressoAtualizado);

  } catch (error) {
    console.error('Erro no AuthController (atualizarColecionaveis):', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
