const express = require("express");

const controllerAgenda = require("../controllers/controller_agenda")

const router = express.Router();

router.post("/", controllerAgenda.validarDados, controllerAgenda.criar  );

router.get("/", controllerAgenda.listarTodos);

router.get("/:id", controllerAgenda.buscarPeloId, controllerAgenda.obter)

router.put("/:id", controllerAgenda.buscarPeloId, controllerAgenda.validarDados, controllerAgenda.atualizar);

router.delete("/:id", controllerAgenda.buscarPeloId, controllerAgenda.remover);

module.exports = router;