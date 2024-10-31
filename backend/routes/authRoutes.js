    const express = require('express');
    const router = express.Router();
    const { createUser,
            updateUser,
            deleteUser,
            listAllUsers,
            getPendingUsers,
            getApprovedUsers,
            approveUser
        } = require('../controllers/authController');

    // [1] Criar um novo usuário
    router.post('/users', createUser);

    // [2] Atualizar um usuário específico
    router.put('/users/:userId', updateUser);

    // [3] Deletar um usuário específico
    router.delete('/users/:userId', deleteUser);

    // [4] Listar todos os usuários
    router.get('/users', listAllUsers);

    // [5] Obter todos os usuários não aprovados
    router.get('/users/pending', getPendingUsers);

    // [6] Obter todos os usuários aprovados
    router.get('/users/approved', getApprovedUsers);

    // [7] Aprovar um usuário
    router.patch('/users/approve', approveUser);

    module.exports = router;
