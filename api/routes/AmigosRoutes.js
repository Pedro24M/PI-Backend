const express = require('express');
const AmigosController = require('../controllers/AmigosController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();


router.post('/', authenticateToken, AmigosController.validarDados, AmigosController.createAmigos);
router.get('/', authenticateToken, AmigosController.getAmigos);
router.get("/:id", authenticateToken, AmigosController.getAmigosById, AmigosController.obter);
router.put('/:id', authenticateToken, AmigosController.getAmigosById, AmigosController.validarDados, AmigosController.updateAmigos);
router.delete('/:id', authenticateToken, AmigosController.getAmigosById, AmigosController.deleteAmigos);

module.exports = router