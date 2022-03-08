module.exports = {
<<<<<<< HEAD
    usuarioAuth(req,res,next){
        
=======
    usuarioAuth(req,resp,next){
>>>>>>> 5c3c4e25405d14413a5e3ddd2138cf79bee4ff92
        const usuario = req.session.usuario

        if(!usuario){
            res.redirect("/usuarios/login")
            return
        }
        next()
    }
}