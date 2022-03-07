
const Usuario = require("../models/Usuario")
const Tarefa = require("../models/Tarefa")
const { validarUsuarioCadastro, validarUsuarioLogin } = require("../helpers/validacaoUsuario")
const bcrypt = require("bcrypt")
const { ObjectId } = require("mongodb")

class usuarioController
{
    static formularioCadastro(req,res)
    {
        res.render("usuarios/cadastro",{layout:false})
    }
    static formularioLogin(req,res)
    {
        res.render("usuarios/login",{layout:false})
    }

    static async cadastro(req,res)
    {
        const {nome,email,senha,confirmarSenha} = req.body

        if(!validarUsuarioCadastro(req,res,nome,email,senha,confirmarSenha)){
            console.log("Não foi possivel fazer o seu cadastro")
            return
        }

        let usuarioEmail = await Usuario.findOne({email})

        if(usuarioEmail){
            req.flash("error","E-mail já cadastrado")
            res.redirect("/usuarios/cadastro")
        }

        //fazer um hash da senha
        const senhaHash = bcrypt.hashSync(senha,10)
        
        const usuario = new Usuario({
            nome:nome,
            email:email,
            senha:senhaHash
        })

        await usuario.save()
        
        req.flash("success","Sua conta foi criada, agora faça o seu login.")
        res.redirect("/usuarios/login")
    
    }

    static async login(req,res){

        const {email,senha} = req.body
        validarUsuarioLogin(req,res,email,senha)

        const usuario = await Usuario.findOne({email})

        if(!usuario){
            req.flash("error","E-mail não encontrado.")
            res.redirect('/usuarios/login')
            return
        }

        const compararSenha = bcrypt.compareSync(senha,usuario.senha)
        //comparar senha que o usuario digitou com o hash cadastrado no banco
        if(!compararSenha){
            req.flash("error","A senha está incorreta.")
            res.redirect('/usuarios/login')
            return
        }

        //inicializar a sessão 
        req.session.usuario = usuario.id
        req.session.data = usuario

        req.flash("success",`Bem vindo: ${usuario.nome}`) //se aparecer essa mensagem significa que está logado

        req.session.save(()=>{
            res.redirect("/tarefas")
        })
    }

    static logout(req,res){
        req.session.destroy()
        res.redirect("/usuarios/login")
    }

    static async removerConta(req,res){

        const uid = req.session.usuario

        if(!uid){
            res.render("erros/httpErros",{code:401})
            return
        } 

        const usuario = await Usuario.findById(uid)

        if(uid !== usuario.id){
            res.render("erros/httpErros",{code:401})
            return
        }

        await Tarefa.deleteMany({"usuario._id": ObjectId(usuario.id)}) //deleta todas as tarefas do usuario logado

        await Usuario.findByIdAndDelete(usuario.id) //deleta a conta do usuario que estava logado

        res.redirect("/usuarios/login")
    }
}

module.exports = usuarioController
