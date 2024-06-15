const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    nome: {type: String, trim: true, uppercase: true, required: true},
    anfitriao: {type: String, trim: true, uppercase: true, required: true},
    participantes: {type: Number, required: true},
    data: {type: String, trim: true, uppercase: true, required: true}
});

module.exports = mongoose.model("Agenda", agendaSchema)