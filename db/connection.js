
const mongoose = require("mongoose")

const uri =  "mongodb://localhost:27017/listaTarefas"

async function main(){
    await mongoose.connect(uri,{
        
    })
    console.log("Conectado ao banco")
}



main().catch("Não foi possivel conectar com o banco")