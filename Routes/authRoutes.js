const express = require('express');
const authController = require('../Controller/authController');
const cardsController = require('../Controller/cardsController');

const router = express.Router();

// Rotas de Autenticação
router.post('/auth/register', authController.register.bind(authController));
router.post('/auth/login', authController.login.bind(authController));

// Rotas de Cards/Produtos
router.get('/cards', cardsController.getAll.bind(cardsController));
router.get('/cards/:id', cardsController.getById.bind(cardsController));
router.post('/cards', cardsController.create.bind(cardsController));
router.put('/cards/:id', cardsController.update.bind(cardsController));
router.delete('/cards/:id', cardsController.delete.bind(cardsController));

module.exports = router;
