

module.exports = {
    usuarioAuth(req,resp,next){
        const userId = req.session.usuarioId
        if(!userId){
            resp.redirect("/usuarios/login")
            return
        }
        next()
    }
}