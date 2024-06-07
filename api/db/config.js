const mongoose = require("mongoose")

async function main (){
    try{

        mongoose.set("strictQuery", true)
        await mongoose.connect(
            "mongodb+srv://rayanemariaj:bMnba5TeMxty8Tnj@cluster0.p5obzqw.mongodb.net/"
        )

        console.log("Conectado ao banco!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports=main