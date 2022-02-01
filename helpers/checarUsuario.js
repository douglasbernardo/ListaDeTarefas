
module.exports = {
    usuarioAuth(req,resp,next){
        
        const usuario = req.session.usuario

        if(!usuario){
            resp.redirect("/usuarios/login")
            return
        }
        next()
    }
}