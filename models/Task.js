
const mongoose = require("mongoose")

const Task = mongoose.model(
    "Tarefa",
    new mongoose.Schema({
        titulo:{type:String,required:true},
        descricao:{type:String,required:true},
        status:{type:Boolean,required:true},
        usuario:Object
    })
)

module.exports = Task