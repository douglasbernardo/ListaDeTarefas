
const mongoose = require("mongoose")

const Tarefa = mongoose.model(
    "Tarefa",
    new mongoose.Schema({
        titulo:{type:String,required:true},
        descricao:{type:String,required:true}
    })
)

module.exports = Tarefa