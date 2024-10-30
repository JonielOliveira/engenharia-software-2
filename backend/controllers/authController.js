const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { email, password, name, cpf, consentGiven } = req.body;
    const newUser = new User({ email, password, name, cpf, consentGiven });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const { userId } = req.body; // Recebe o ID do usuário do corpo da requisição
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.isApproved = true;
    await user.save();

    res.status(200).json({ message: 'Usuário aprovado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao aprovar usuário', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.body; // Recebe o ID do usuário do corpo da requisição
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Usuário não aprovado excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
  }
};

exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false }); // Busca usuários pendentes
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários pendentes', error });
  }
};

exports.getApprovedUsers = async (req, res) => {
  try {
    const approvedUsers = await User.find({ isApproved: true }); // Busca usuários aprovados
    res.status(200).json(approvedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários pendentes', error });
  }
};

// Adicionar lógica para login, aprovação, etc.
