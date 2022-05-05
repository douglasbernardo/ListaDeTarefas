module.exports = {
    validateSignUpUser(req,res,nome,email,senha,confirmarSenha){

        if(!nome && !email && !senha && !confirmarSenha){
            req.session.message = {
                type:"danger",
                message:"Preencha os dados corretamente"
            }
            req.session.save(()=>{
                res.redirect("/usuarios/cadastro")
            })
        }
        if(!nome){
            req.session.message = {
                type:"danger",
                message:"O nome é obrigatório"
            }
            req.session.save(()=>{
                res.redirect("/usuarios/cadastro")
            })
        }
        if(!email){
            req.session.message = {
                type:"danger",
                message:"E-mail é obrigatório"
            }
            req.session.save(()=>{
                res.redirect("/usuarios/cadastro")
            })
        }
        if(!senha){
            req.session.message = {
                type:"danger",
                message:"Senha é obrigatório"
            }
            req.session.save(()=>{
                res.redirect("/usuarios/cadastro")
            })
        }
        if(!confirmarSenha){
            req.session.message = {
                type:"danger",
                message:"Confirmação de senha é obrigatório"
            }
            req.session.save(()=>{
                res.redirect("/usuarios/cadastro")
            })
        }

        if(senha !== confirmarSenha){
            req.session.message = {
                type:"danger",
                message:"As senhas não batem"
            }
            req.session.save(()=>{
                res.redirect("/usuarios/cadastro")
            })
        }

        //validação do email
        if(email){
            //validação do email com regex
            let regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
            if(!regex_validation.test(email)){
                req.session.message = {type:"danger", message:"E-mail inválido"}
                  req.session.save(()=>{
                res.redirect("/usuarios/cadastro")
            })
            }
        }else{
            req.session.message = {type:"danger", message:"E-mail não pode ser vazio"}
            req.session.save(()=>{
                res.redirect("/usuarios/cadastro")
            })
        }

        return true
    },

    validateUserLogin(req,res,email,senha){
        if(!email && !senha){
            req.session.message = { type:"danger", message:"Preencha os dados corretamente"}
            req.session.save(()=>{
                res.redirect("/usuarios/login")
            })
        }
        if(!email){
            req.session.message = {type:"danger", message:"E-mail precisa ser preenchido"}
            req.session.save(()=>{
                res.redirect("/usuarios/login")
            })
        }
        if(!senha){
            req.session.message = {type:"danger", message:"Senha precisa ser preenchida"}
            req.session.save(()=>{
                res.redirect("/usuarios/login")
            })
        }

        //validação do email
        if(email){
            //validação do email com regex
            let regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
            if(!regex_validation.test(email)){
                req.session.message = {type:"danger",message:"E-mail não é válido"}
                req.session.save(()=>{
                    res.redirect("/usuarios/login")
                })
            }
        }else{
            req.session.message = {type:"danger", message:"E-mail precisa ser preenchido"}
            req.session.save(()=>{
                res.redirect("/usuarios/login")
            })
        }

        return true
    }
}