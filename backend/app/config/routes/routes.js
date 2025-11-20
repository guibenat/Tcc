const { Router } = require('express')
const router = Router();
const AuthController = require('../../Controllers/AuthController')

//Definindo todas as rotas
router.get('/', (req, res) => {
    res.status(200).json({"mensagem": "API FUNCIONANDO."})
})

router.post('/login', AuthController.logarUsuario)

router.post('/cadastro', AuthController.cadastrarUsuario)

router.get('/perfil', AuthController.verificarToken, AuthController.buscarPerfil);

router.put('/colecionaveis', AuthController.verificarToken, AuthController.atualizarColecionaveis);

module.exports = router