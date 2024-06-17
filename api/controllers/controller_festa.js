const {Servico: ServiceModel} = require("../models/model_festa")

async function create (req, res) {
    try{
        const service = {
            festa: req.body.festa,
            descricao: req.body.descricao,
            preco: req.body.preco,
            imagem: req.body.imagem,
        };

        const response = await ServiceModel.create(service);

        res.status(201).json({response, msg:"Festa criada com sucesso!"})
            
    }catch (error){
        console.log(error)
    }
}
async function getAll (req, res) {
    try{
    const services = await ServiceModel.find()
    res.json(services)
    }catch(error){
        console.log(error)
    }
}
async function get (req, res) {
    try{
        const id = req.params.id;
        const service = await ServiceModel.findById(id)
        if(!service){
            res.status(404).json({msg: "Festa não encontrado."})
            return;
        }
        res.json(service)
    }catch(error){
        console.log(error)
    }
}

async function deletar (req, res) {
    try{
        const id = req.params.id
        const service = await ServiceModel.findById(id)
        if(!service){
            res.status(404).json({msg: "Festa não encontrada."})
            return;
        }
        const deleteService = await ServiceModel.findByIdAndDelete(id)
        res.status(200).json({deleteService, msg: "Festa excluída com sucesso"})
    }catch(error){
        console.log(error)
    }
}

async function update (req, res) {
    try {
        const id = req.params.id;
        const updateData = {
            festa: req.body.festa,
            descricao: req.body.descricao,
            preco: req.body.preco,
            imagem: req.body.imagem,
        };

        const service = await ServiceModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!service) {
            return res.status(404).json({ error: "Festa não encontrado." });
        }
        res.status(200).json({ service, msg: "Festa atualizada com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Ocorreu um erro ao atualizar os dados da festa!." });
    }
}


module.exports = {create, getAll, get, deletar, update}