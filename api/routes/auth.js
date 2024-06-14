const router = require('express').Router();
const authController = require('../controllers/authController');

// Rota para registro
router.post('/register', authController.register);

// Rota para login
router.post('/login', authController.login);

module.exports = router;
