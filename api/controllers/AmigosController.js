const Amigos = require('../models/Amigos');

exports.createAmigos = async (req, res) => {
  try {
    const Amigos = new Amigos(req.body);
    await Amigos.save();
    res.status(201).send(Amigos);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.Amigos = async (req, res) => {
  try {
    const Amigos = await Amigos.find();
    res.status(200).send(Amigos);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAmigosById = async (req, res) => {
  try {
    const Amigos = await Amigos.AmigosById(req.params.id);
    if (!Amigos) {
      return res.status(404).send();
    }
    res.status(200).send(Amigos);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateFriend = async (req, res) => {
  try {
    const Amigos = await this.Amigos.AmigosByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!Amigos) {
      return res.status(404).send();
    }
    res.status(200).send(Amigos);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteAmigos = async (req, res) => {
  try {
    const Amigos = await Amigos.findByIdAndDelete(req.params.id);
    if (!Amigos) {
      return res.status(404).send();
    }
    res.status(200).send(Amigos);
  } catch (error) {
    res.status(500).send(error);
  }
}