const axios = require('axios');

const baseURL = 'https://api.coingecko.com/api/v3';

async function buscarPrecoAtual(simbolo) {
  try {
    const response = await axios.get(`${baseURL}/simple/price`, {
      params: {
        ids: simbolo,
        vs_currencies: 'brl'
      }
    });

    const preco = response.data[simbolo]?.brl;
    return preco;
  } catch (error) {
    console.error('Erro ao buscar preço da CoinGecko:', error.message);
    return null;
  }
}

module.exports = { buscarPrecoAtual };
 
