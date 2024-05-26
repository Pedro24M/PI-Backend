const express = require("express");
const mongoose = require("mongoose");

const controller = require("../controllers/controller_agenda")

const Agenda = require("../models/model_agenda")

const router = express.Router();

router.post("/", 
    function criar(req, res) {
        res.status(201).json({});
    },
    function validarDados1(req, res) {
        res.status(422).json({ msg: "Dados do produto invalidos"}); 
    },
);

router.get("/", 
    function buscar(req, res) {
        res.status(200).json({})
} 
);

router.get("/:id", 
    function buscarPeloId(req, res) {
        res.status(200).json({})
    },
    function buscarPeloId1(req, res) {
        res.status(404).json({})
    },

)

router.put("/:id", 
    function alterar(req, res) {
        res.status(200).json({});
    },
    function alterar1(req, res) {
        res.status(404).json({});
    },
    function alterar2(req, res) {
        res.status(422).json({});
    }
);

router.delete("/:id", 
    function deletar(req, res) {
        res.status(204).json({});
    },
    function deletar1(req, res) {
        res.status(404).json({});
    }
);

module.exports = router;