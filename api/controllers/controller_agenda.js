const mongoose = require('mongoose')
const Agenda = require("../models/model_agenda")

async function validarDados(req, res, next) {
    const agenda = new Agenda(req.body);
    try {
        await agenda.validate();
        next();
    } catch (err) {
        res.status(422).json({ msg: "Dados da agenda invalidos"})
    }
}

async function criar(req, res) {
    const agenda = await Agenda.create(req.body);
    res.status(201).json(agenda)
}

async function listarTodos(req, res) {
    const agendas = await Agenda.find({});
    res.json(agendas);
};

async function buscarPeloId(req, res, next) {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const agenda = await Agenda.findOne({ _id: id });
        if (agenda) {
            next();
        } else {
            res.status(404).json({msg: "agenda não encontrada"})
        }
    } catch (err) {
        res.status(400).json({msg: "Id invalido"});
    }
};

async function obter(req, res, next) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const agenda = await Agenda.findOne({ _id: id });
    res.json(agenda);
};

async function atualizar(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const agenda = await Agenda.findOneAndUpdate({ _id: id }, req.body);
    res.json({});
};

async function remover(req,res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const agenda = await Agenda.findOneAndDelete({ _id: id });
    res.status(204).end()
}

module.exports = {validarDados, criar, listarTodos, buscarPeloId, obter, atualizar, remover}