const mongoose = require("mongoose")

async function main (){
    try{

        mongoose.set("strictQuery", true)
        await mongoose.connect(
            "mongodb+srv://rafhael:rafhael@cluster0.48v3btg.mongodb.net/"
        )

        console.log("Conectado ao banco!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports=main