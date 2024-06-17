const express = require('express')
const router = require("express").Router()

const servicoController = require("../controllers/controller_festa")
const authenticateToken = require('../middlewares/auth');

router.post("/", authenticateToken, servicoController.create)

router.get("/" ,authenticateToken, servicoController.getAll)

router.get("/:id", authenticateToken, servicoController.get)

router.delete("/:id", authenticateToken, servicoController.deletar)

router.put("/:id", authenticateToken, servicoController.update)

module.exports = router