const express = require("express");

const controllerAgenda = require("../controllers/controller_agenda")
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post("/", authenticateToken, controllerAgenda.validarDados, controllerAgenda.criar  );

router.get("/", authenticateToken, controllerAgenda.listarTodos);

router.get("/:id", authenticateToken, controllerAgenda.buscarPeloId, controllerAgenda.obter)

router.put("/:id", authenticateToken, controllerAgenda.buscarPeloId, controllerAgenda.validarDados, controllerAgenda.atualizar);

router.delete("/:id", authenticateToken, controllerAgenda.buscarPeloId, controllerAgenda.remover);

module.exports = router;