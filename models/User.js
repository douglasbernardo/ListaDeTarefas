const mongoose = require("mongoose")

const User = mongoose.model(
    "Usuario",
    new mongoose.Schema({
        nome:{type:String,required:true},
        email:{type:String,required:true},
        senha:{type:String,required:true}
        },
        {timestamps:true}
    )
)

module.exports = User