const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Conectado ao MongoDB');
  } catch (err) {
    console.error('🔴 Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};
 
