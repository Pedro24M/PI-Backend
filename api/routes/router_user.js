const router = require('express').Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

// Rota para criar um novo usuário (apenas para exemplo, geralmente o registro seria separado)
router.post('/', userController.createUser);

// Rota para fazer login
router.post('/login', userController.entrar);

// Rota para obter todos os usuários (protegida)
router.get('/', authenticateToken, userController.getAllUsers);

// Rota para obter um usuário pelo ID (protegida)
router.get('/:id', authenticateToken, userController.getUserById);

// Rota para atualizar um usuário pelo ID (protegida)
router.put('/:id', authenticateToken, userController.updateUser);

// Rota para excluir um usuário pelo ID (protegida)
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
