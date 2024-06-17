const mongoose = require('mongoose')
const Amigos = require('../models/Amigos');


exports.validarDados = async (req, res, next) => {
    const amigo = new Amigos(req.body);
    try {
        await amigo.validate();
        next();
    } catch (err) {
        res.status(422).json({ msg: "Dados da agenda invalidos"})
    }
}
exports.createAmigos = async (req, res) => {
    const amigo = await Amigos.create(req.body);
    res.status(201).json(amigo)
};

exports.getAmigos = async (req, res) => {
  try {
    const amigos = await Amigos.find();
    res.status(200).send(amigos);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAmigosById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const amigo = await Amigos.findOne({ _id: id });
    console.log(amigo)
    if (amigo) {
      next();
    } else {
      res.status(404).json({msg: "amigo não encontrada"})
    }
} catch (err) {
    res.status(400).json({msg: "Id invalido"});
}
};

exports.obter = async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const amigo = await Amigos.findOne({ _id: id });
  res.json(amigo);
};

exports.updateAmigos = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const amigo = await Amigos.findOneAndUpdate({ _id: id }, req.body);
    res.json({});
};

exports.deleteAmigos = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const amigo = await Amigos.findOneAndDelete({ _id: id });
    res.status(204).end()
}