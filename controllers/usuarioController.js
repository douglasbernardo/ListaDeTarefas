
const Usuario = require("../models/Usuario")
const { validarUsuarioCadastro, validarUsuarioLogin } = require("../helpers/validacaoUsuario")
const bcrypt = require("bcrypt")


class usuarioController
{

    static formularioCadastro(req,resp)
    {
        resp.render("usuarios/cadastro",{layout:false})
    }
    static formularioLogin(req,resp)
    {
        resp.render("usuarios/login",{layout:false})
    }

    static async cadastro(req,resp)
    {
        const {nome,email,senha,confirmarSenha} = req.body

        if(!validarUsuarioCadastro(req,resp,nome,email,senha,confirmarSenha)){
            console.log("Alguma coisa de errado aconteceu!")
            return
        }

        let usuarioEmail = await Usuario.findOne({email:email})

        if(usuarioEmail){
            req.flash("error","E-mail já cadastrado")
            resp.redirect("/usuarios/cadastro")
            return
        }

        //fazer um hash da senha
        const senhaHash = bcrypt.hashSync(senha,10)
        
        const usuario = new Usuario({
            nome:nome,
            email:email,
            senha:senhaHash
        })

        await usuario.save()

        req.session.usuario = usuario

        req.flash("success",`Bem vindo: ${usuario.nome}`)
        
        req.session.save(()=>{
            resp.redirect("/tarefas")
        })
    }

    static async login(req,resp){

        const {email,senha} = req.body
        validarUsuarioLogin(req,resp,email,senha)

        const usuario = await Usuario.findOne({email})

        if(!usuario){
            req.flash("error","E-mail não encontrado")
            resp.redirect('/usuarios/login')
            return
        }

        const compararSenha = bcrypt.compareSync(senha,usuario.senha)
        //comparar senha que o usuario digitou com o hash cadastrado no banco
        if(!compararSenha){
            req.flash("error","A senha está incorreta") 
            resp.redirect('/usuarios/login')
            return
        }

        //inicializar a sessão 
        req.session.usuario = usuario.id

        req.flash("success",`Bem vindo de novo: ${usuario.nome}`) //se aparecer essa mensagem signifaca que está logado

        req.session.save(()=>{
            resp.redirect("/tarefas")
        })
    }

    static logout(req,resp){
        req.session.destroy()
        resp.redirect("/usuarios/login")
    }

    static async removerConta(req,resp){

        const id = req.session.usuario

        if(!id){
            console.log("ID não foi encontrado")
            return
        }

        const usuario = await Usuario.findByIdAndDelete(id)

        resp.redirect("/usuarios/login")
    }
}

module.exports = usuarioController