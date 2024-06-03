const express = require('express');
const AmigosController = require('../controllers/AmigosController');

const router = express.Router();

router.post('/Amigos', AmigosController.createAmigos);
router.get('/Amigos', AmigosController.getAmigos);
router.get('/Amigos/:id', AmigosController.getAmigosById);
router.put('/Amigos/:id', AmigosController.updateAmigos);
router.delete('/Amigos/:id', AmigosController.deleteAmigos);

module.exports = router;
