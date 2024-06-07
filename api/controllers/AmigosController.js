const Amigos = require('../models/Amigos');

exports.createAmigos = async (req, res) => {
  try {
    const novoAmigo = new Amigos(req.body); 
    await novoAmigo.save();
    res.status(201).send(novoAmigo);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAmigos = async (req, res) => { 
  try {
    const amigos = await Amigos.find(); 
    res.status(200).send(amigos);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAmigosById = async (req, res) => {
  try {
    const amigo = await Amigos.findById(req.params.id); 
    if (!amigo) {
      return res.status(404).send();
    }
    res.status(200).send(amigo);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateAmigos = async (req, res) => {
  try {
    const amigo = await Amigos.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
    if (!amigo) {
      return res.status(404).send();
    }
    res.status(200).send(amigo);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteAmigos = async (req, res) => {
  try {
    const amigo = await Amigos.findByIdAndDelete(req.params.id); 
    if (!amigo) {
      return res.status(404).send();
    }
    res.status(200).send(amigo);
  } catch (error) {
    res.status(500).send(error);
  }
};
