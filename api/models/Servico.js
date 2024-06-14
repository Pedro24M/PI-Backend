const mongoose = require("mongoose")

const {Schema}=mongoose;

const servicoSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    preco: {
        type: Number,
        require: true
    },
    imagem: {
        type: String,
        require: true
    },
    },
    {timestamps: true}
);

const Servico = mongoose.model("Servico", servicoSchema)

module.exports = {
    Servico,
    servicoSchema
}

