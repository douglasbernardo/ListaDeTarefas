module.exports = {
    validarUsuarioCadastro(req,res,nome,email,senha,confirmarSenha){

        if(!nome && !email && !senha && !confirmarSenha){
            req.flash('errors',"O nome é obrigatório")
            res.redirect("/usuarios/cadastro")
            return
        }
        if(!nome){
            req.flash('error',"O nome é obrigatório")
            res.redirect("/usuarios/cadastro")
            return
        }
        if(!email){
            req.flash('error',"O e-mail é obrigatório")
            res.redirect("/usuarios/cadastro")
            return
        }
        if(!senha){
            req.flash('error',"A senha é obrigatório")
            res.redirect("/usuarios/cadastro")
            return
        }
        if(!confirmarSenha){
            req.flash('error',"A confirmação de senha é obrigatório")
            res.redirect("/usuarios/cadastro")
            return
        }

        if(senha !== confirmarSenha){
            req.flash('error',"As senhas não são iguais")
            res.redirect("/usuarios/cadastro")
            return
        }

        //validação do email
        if(email){
            //validação do email com regex
            let regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
            if(!regex_validation.test(email)){
                req.flash('error',"E-mail não é válido")
                res.redirect("/usuarios/cadastro")
            }
        }else{
            req.flash('error',"E-mail não pode ser vazio")
            res.redirect("/usuarios/cadastro")
        }

        return true
    },

    validarUsuarioLogin(req,res,email,senha){
        if(!email && !senha){
            req.flash('success',"Os dados são obrigatórios")
            res.redirect("/usuarios/login")
            return
        }
        if(!email){
            req.flash('success',"O e-mail é obrigatório")
            res.redirect("/usuarios/login")
            return
        }
        if(!senha){
            req.flash('success',"A senha é obrigatório")
            res.redirect("/usuarios/login")
            return
        }

        //validação do email
        if(email){
            //validação do email com regex
            let regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
            if(!regex_validation.test(email)){
                req.flash('success',"E-mail não é válido")
                res.redirect("/usuarios/login")
            }
        }else{
            req.flash('success',"E-mail não pode ser vazio")
            res.redirect("/usuarios/login")
        }

        return true
    }
}