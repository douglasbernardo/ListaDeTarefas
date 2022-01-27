
const { validarUsuario } = require("../helpers/validacaoUsuario")
const bcrypt = require("bcrypt")


class usuarioController{
    static mostraFormulario(req,resp){
        resp.render("usuarios/cadastro",{layout:false})
    }

    static async cadastro(req,resp){
        const {nome,email,senha,confirmarSenha} = req.body
        await validarUsuario(req,resp,nome,email,senha,confirmarSenha)

       //console.log(bcrypt.hash(senha))
    }
}

module.exports = usuarioController