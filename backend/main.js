const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./app/config/routes/routes.js');


app.use(cors());
app.use(express.json());
app.use(authRoutes);

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});