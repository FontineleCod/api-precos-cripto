const express = require('express');
const router = express.Router();

const Ativo = require('../models/Ativo');
const { buscarPrecoAtual } = require('../services/coingecko');

// Rota para adicionar um ativo e salvar o preço atual
router.post('/', async (req, res) => {
  const { nome, simbolo } = req.body;

  try {
    const preco = await buscarPrecoAtual(simbolo.toLowerCase());

    if (preco === null) {
      return res.status(404).json({ error: 'Ativo não encontrado na CoinGecko' });
    }

    const novoAtivo = new Ativo({
      nome,
      simbolo,
      preco
    });

    await novoAtivo.save();
    res.status(201).json(novoAtivo);
  } catch (err) {
    console.error('Erro ao salvar ativo:', err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para listar todos os ativos salvos
router.get('/', async (req, res) => {
  try {
    const ativos = await Ativo.find().sort({ dataAtualizacao: -1 });
    res.json(ativos);
  } catch (err) {
    console.error('Erro ao buscar ativos:', err.message);
    res.status(500).json({ error: 'Erro ao buscar ativos' });
  }
});

module.exports = router;
 
