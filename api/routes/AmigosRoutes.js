const express = require('express');
const AmigosController = require('../controllers/AmigosController');

const router = express.Router();


router.post('/',AmigosController.validarDados, AmigosController.createAmigos);
router.get('/', AmigosController.getAmigos);
router.get("/:id", AmigosController.getAmigosById, AmigosController.obter);
router.put('/:id', AmigosController.getAmigosById, AmigosController.validarDados, AmigosController.updateAmigos);
router.delete('/:id', AmigosController.getAmigosById, AmigosController.deleteAmigos);

module.exports = router