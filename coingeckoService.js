const axios = require('axios');

const BASE_URL = 'https://api.coingecko.com/api/v3';

async function getPrecoAtual(criptoId = 'bitcoin', moeda = 'brl') {
  try {
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: criptoId,
        vs_currencies: moeda
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar preço atual:', error.message);
    return null;
  }
}

module.exports = {
  getPrecoAtual
};
 
