module.exports = {
    usuarioAuth(req,res,next){
        const usuario = req.session.usuario

        if(!usuario){
            res.redirect("/usuarios/login")
            return
        }
        next()
    }
}