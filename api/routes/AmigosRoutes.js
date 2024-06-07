const express = require('express');
const AmigosController = require('../controllers/AmigosController');

const router = express.Router();

router.post('/', AmigosController.createAmigos); 
router.get('/', AmigosController.getAmigos);
router.get('/:id', AmigosController.getAmigosById);
router.put('/:id', AmigosController.updateAmigos);
router.delete('/:id', AmigosController.deleteAmigos);

module.exports = router;
