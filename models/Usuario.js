const mongoose = require("mongoose")

const Usuario = mongoose.model(
    "Usuario",
    new mongoose.Schema({
        nome:{type:String,required:true},
        email:{type:String,required:true},
        senha:{type:String,required:true}
    })
)

module.exports = Usuario