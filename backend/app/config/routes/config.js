const routes = require('./routes')

//Criando função que utiliza todas as rotas automaticamente
module.exports = (app) => {
    app.use(routes)
}