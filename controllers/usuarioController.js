
const Usuario = require("../models/Usuario")
const { validarUsuario } = require("../helpers/validacaoUsuario")
const bcrypt = require("bcrypt")


class usuarioController
{

    static mostraFormulario(req,resp)
    {
        resp.render("usuarios/cadastro",{layout:false})
    }

    static async cadastro(req,resp)
    {
        const {nome,email,senha,confirmarSenha} = req.body
        if(!validarUsuario(req,resp,nome,email,senha,confirmarSenha)){
            console.log("Alguma coisa de errado aconteceu!")
        }

        //fazer um hash da senha
        const senhaHash = bcrypt.hashSync(senha,10)
        
        const usuario = new Usuario({
            nome:nome,
            email:email,
            senha:senhaHash
        })

        await usuario.save()

        resp.redirect("/tarefas")
    }
}

module.exports = usuarioController