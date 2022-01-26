


class usuarioController{
    static mostraFormulario(req,resp){
        resp.render("usuarios/cadastro",{layout:false})
    }
}

module.exports = usuarioController