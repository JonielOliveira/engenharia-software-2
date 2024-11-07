// Importe uma biblioteca de hashing, como bcrypt, e jwt para criar o token
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// CRUD+ - [C]reate, [R]ead, [U]pdate, [D]elete + (Some more things)

//[1] Método para registrar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { email, password, name, cpf, consentGiven } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ email, password, name, cpf, consentGiven });
    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

//[2] Método para atualizar um usuário específico usando o ID
exports.updateUser = async (req, res) => {
  try {
    const { userId, email, name, cpf, role } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (email) user.email = email;
    if (name) user.name = name;
    if (cpf) user.cpf = cpf;
    if (role) user.role = role;

    await user.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
};

//[3] Método para deletar um usuário específico usando o ID
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // Recebe o ID do usuário da URL
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
  }
};

//[4] Método para obter todos os usuários
exports.listAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar todos os usuários', error: error.message });
  }
};

//[5] Método para obter todos os usuários não aprovados (pendentes de aprovação)
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false }); // Busca usuários pendentes
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários pendentes', error });
  }
};

//[6] Método para obter todos os usuários aprovados
exports.getApprovedUsers = async (req, res) => {
  try {
    const approvedUsers = await User.find({ isApproved: true }); // Busca usuários aprovados
    res.status(200).json(approvedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários aprovados', error });
  }
};

//[7] Método para aprovar um usuário
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

//[8] Método para autenticar o usuário
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar um token de autenticação
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};
