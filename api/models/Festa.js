const mongoose = require("mongoose")

const {Schema} = mongoose

const {servicoShema} = require ("./Servico")

const festaSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    author:{ String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    budget:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    services:{
        type: [servicoShema],
    },
    
}, {timestamps: true})

const Festa = mongoose.model("Festa", festaSchema)

module.exports = Festa;