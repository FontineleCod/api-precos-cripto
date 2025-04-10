const mongoose = require('mongoose');

const AtivoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  simbolo: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ativo', AtivoSchema);
 
