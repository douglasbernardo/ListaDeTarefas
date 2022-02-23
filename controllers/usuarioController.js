
const Usuario = require("../models/Usuario")
const Tarefa = require("../models/Tarefa")
const { validarUsuarioCadastro, validarUsuarioLogin } = require("../helpers/validacaoUsuario")
const bcrypt = require("bcrypt")
const { ObjectId } = require("mongodb")



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
            console.log("Não foi possivel fazer o seu cadastro")
            return
        }

        let usuarioEmail = await Usuario.findOne({email:email})

        if(usuarioEmail){
            req.flash("error","E-mail já cadastrado")
            resp.redirect("/usuarios/cadastro")
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
            req.flash("error","A senha está incorreta.")
            resp.redirect('/usuarios/login')
            return
        }

        //inicializar a sessão 
        req.session.usuario = usuario.id

        req.flash("success",`Bem vindo: ${usuario.nome}`) //se aparecer essa mensagem signifaca que está logado

        req.session.save(()=>{
            resp.redirect("/tarefas")
        })
    }

    static logout(req,resp){
        req.session.destroy()
        resp.redirect("/usuarios/login")
    }

    static async removerConta(req,resp){

        const uid = req.session.usuario

        if(!uid){
            resp.status(401).json({message:"Id não foi encontrado"})
            return
        } 

        const usuario = await Usuario.findById(uid)

        if(uid !== usuario.id){
            resp.status(401).json({message:"falha ao excluir usuario"})
            return
        }

        await Tarefa.deleteMany({"usuario._id": ObjectId(usuario.id)}) //deleta todas as tarefas do usuario logado

        await Usuario.findByIdAndDelete(usuario.id) //deleta a conta do usuario que estava logado

        resp.redirect("/usuarios/login")
    }
}

module.exports = usuarioController
