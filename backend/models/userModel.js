const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  cpf: String,
  isApproved: { type: Boolean, default: false },
  consentGiven: { type: Boolean, default: false },
  role: { type: String, enum: ['client', 'admin'], default: 'client' }
});

module.exports = mongoose.model('User', userSchema);
