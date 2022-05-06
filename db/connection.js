require("dotenv").config()
const mongoose = require("mongoose")

async function main(){
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Conectado ao banco")
}



main()
    .catch("Não foi possivel conectar com o banco")