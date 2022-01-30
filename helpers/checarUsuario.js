
module.exports = {
    usuarioAuth(req,resp,next){
        const user = req.session.usuario

        if(!user){
            resp.redirect("/usuarios/login")
            return
        }
        next()
    }
}