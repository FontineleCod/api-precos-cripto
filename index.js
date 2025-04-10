const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const conectarDB = require('./config/db');
const ativosRoute = require('./routes/ativos');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/ativos', ativosRoute);

// Rota raiz (opcional)
app.get('/', (req, res) => {
  res.send('🟢 API de preços de cripto rodando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
