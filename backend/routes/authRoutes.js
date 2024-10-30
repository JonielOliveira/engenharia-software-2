const express = require('express');
const { register, getPendingUsers, getApprovedUsers, approveUser, deleteUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);

// Rota para buscar usuários pendentes de aprovação
router.get('/pending-users', getPendingUsers);

// Rota para buscar usuários aprovados
router.get('/approved-users', getApprovedUsers);

// Rota para aprovar um usuário
router.put('/approve-user', approveUser);

// Rota para excluir usuário
router.delete('/delete-user', deleteUser);

module.exports = router;
