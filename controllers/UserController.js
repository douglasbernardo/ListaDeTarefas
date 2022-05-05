
const User = require("../models/User")
const Task = require("../models/Task")
const { validateUserLogin, validateSignUpUser } = require("../helpers/validateUser")
const bcrypt = require("bcrypt")
const { ObjectId } = require("mongodb")

class UserController
{

    static formSignUp(req,res){
        res.render("users/signUpForm",{layout:false})
    }

    static formLogin(req,res){
        res.render("users/loginForm")
    }

    static async signUp(req,res){
        const {nome,email,senha,confirmarSenha} = req.body

        if(!validateSignUpUser(req,res,nome,email,senha,confirmarSenha)){
            console.log("Não foi possivel fazer o seu cadastro")
            return
        }

        let usuarioEmail = await User.findOne({email})

        if(usuarioEmail){
            req.flash("error","E-mail já cadastrado")
            res.redirect("/usuarios/cadastro")
        }

        //fazer um hash da senha
        const senhaHash = bcrypt.hashSync(senha,10)
        
        const usuario = new User({
            nome:nome,
            email:email,
            senha:senhaHash
        })

        await usuario.save()
        
        req.session.message = {type:"success", message:"Sua conta foi criada, faça o login para acessa-lá"}

        req.session.save(()=>{
            res.redirect("/usuarios/login")
        })
    }

    static async login(req,res){

        const {email,senha} = req.body
        validateUserLogin(req,res,email,senha)

        const usuario = await User.findOne({email})

        if(!usuario){
            req.session.message = { type:"danger", message:"E-mail não foi encontrado"}
            req.session.save(()=>{
                res.redirect("/usuarios/login")
            })
        }

        const compararSenha = bcrypt.compareSync(senha,usuario.senha)
        //comparar senha que o usuario digitou com o hash cadastrado no banco
        if(!compararSenha){
            req.session.message = {type:"danger", message:"Senha inválida"}
            req.session.save(()=>{
                res.redirect("/usuarios/login")
            })
        }

        //inicializar a sessão 
        req.session.usuario = usuario.id
        req.session.data = usuario

        req.session.message = {type:"success", message:`Bem vindo(a): ${usuario.nome}`}

        req.session.save(()=>{
            res.redirect("/tarefas")
        })
    }

    static logout(req,res){
        req.session.destroy()
        res.redirect("/usuarios/login")
    }

    static async deleteMyAccount(req,res){
        const uid = req.session.usuario

        if(!uid){
            res.render("errors/httpErrors",{code:401})
            return
        } 

        const usuario = await User.findById(uid)

        if(uid !== usuario.id){
            res.render("errors/httpErrors",{code:401})
            return
        }

        await Task.deleteMany({"usuario._id": ObjectId(usuario.id)}) //deleta todas as tarefas do usuario logado

        await User.findByIdAndDelete(usuario.id) //deleta a conta do usuario que estava logado

        res.redirect("/usuarios/login")
    }
}

module.exports = UserController
