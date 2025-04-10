// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Importa as rotas
const ativosRoutes = require('./routes/ativos');

// Carrega variáveis do .env
dotenv.config();

// Inicializa o app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conecta ao banco de dados
require('./config/db')();

// Usa as rotas
app.use('/api/ativos', ativosRoutes);

// Roda o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
 
