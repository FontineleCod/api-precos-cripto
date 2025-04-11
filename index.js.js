const axios = require("axios");
const chalk = require("chalk");
const readline = require("readline");

// Lista de moedas
const moedas = ["bitcoin", "ethereum", "solana", "tron", "hedera-hashgraph"];

// Formata o número como moeda USD
function formatarPreco(valor) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(valor);
}

// Pega os preços da CoinGecko
async function buscarPrecos() {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${moedas.join(
      ","
    )}&vs_currencies=usd`;

    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(chalk.red("❌ Erro ao buscar dados da API: "), err.message);
    return null;
  }
}

// Mostra os dados no terminal
async function mostrarPrecos() {
  const dados = await buscarPrecos();
  if (!dados) return;

  console.clear();
  console.log(chalk.green("🔄 Monitor de Preços - Cripto\n"));

  console.log(chalk.yellow("BTC:"), formatarPreco(dados.bitcoin.usd));
  console.log(chalk.yellow("ETH:"), formatarPreco(dados.ethereum.usd));
  console.log(chalk.yellow("SOL:"), formatarPreco(dados.solana.usd));
  console.log(chalk.yellow("TRX:"), formatarPreco(dados.tron.usd));
  console.log(chalk.yellow("HBAR:"), formatarPreco(dados["hedera-hashgraph"].usd));

  const hora = new Date().toLocaleTimeString();
  console.log(`\nAtualizado em: ${hora}`);
}

// Interface para escutar comandos
function iniciarInterface() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt("\nPressione [Enter] para atualizar ou [Ctrl+C] para sair...\n");
  rl.prompt();

  rl.on("line", async () => {
    await mostrarPrecos();
    rl.prompt();
  });
}

// Inicializa o monitor
(async () => {
  await mostrarPrecos();
  setInterval(mostrarPrecos, 30000);
  iniciarInterface();
})();
