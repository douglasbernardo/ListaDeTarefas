module.exports = {
    validarUsuarioCadastro(req,resp,nome,email,senha,confirmarSenha){
        
        if(!nome && !email && !senha && !confirmarSenha){
            req.flash('error',"Os dados são obrigatórios")
            resp.redirect("/usuarios/cadastro")
            return
        }
        if(!nome){
            req.flash('error',"O nome é obrigatório")
            resp.redirect("/usuarios/cadastro")
            return
        }
        if(!email){
            req.flash('error',"O e-mail é obrigatório")
            resp.redirect("/usuarios/cadastro")
            return
        }
        if(!senha){
            req.flash('error',"A senha é obrigatório")
            resp.redirect("/usuarios/cadastro")
            return
        }
        if(!confirmarSenha){
            req.flash('error',"A confirmação de senha é obrigatório")
            resp.redirect("/usuarios/cadastro")
            return
        }

        if(senha !== confirmarSenha){
            req.flash('error',"As senhas não são iguais")
            resp.redirect("/usuarios/cadastro")
            return
        }

        //validação do email
        if(email){
            //validação do email com regex
            let regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
            if(!regex_validation.test(email)){
                req.flash('error',"E-mail não é válido")
                resp.redirect("/usuarios/cadastro")
            }
        }else{
            req.flash('error',"E-mail não pode ser vazio")
            resp.redirect("/usuarios/cadastro")
        }

        return true
    },

    validarUsuarioLogin(req,resp,email,senha,confirmarSenha){
        if(!email && !senha && !confirmarSenha){
            req.flash('error',"Os dados são obrigatórios")
            resp.redirect("/usuarios/login")
            return
        }
        if(!email){
            req.flash('error',"O e-mail é obrigatório")
            resp.redirect("/usuarios/login")
            return
        }
        if(!senha){
            req.flash('error',"A senha é obrigatório")
            resp.redirect("/usuarios/login")
            return
        }
        if(!confirmarSenha){
            req.flash('error',"A confirmação de senha é obrigatório")
            resp.redirect("/usuarios/login")
            return
        }

        if(senha !== confirmarSenha){
            req.flash('error',"As senhas não são iguais")
            resp.redirect("/usuarios/login")
            return
        }

        //validação do email
        if(email){
            //validação do email com regex
            let regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
            if(!regex_validation.test(email)){
                req.flash('error',"E-mail não é válido")
                resp.redirect("/usuarios/login")
            }
        }else{
            req.flash('error',"E-mail não pode ser vazio")
            resp.redirect("/usuarios/login")
        }

        return true
    }
}