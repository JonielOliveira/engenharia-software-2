const mongoose = require('mongoose');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Obtém a variável MONGODB_URI do arquivo .env
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

module.exports = mongoose;
