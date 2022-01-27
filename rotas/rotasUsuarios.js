
const router = require("express").Router()

const usuarioController = require("../controllers/usuarioController")

router.get("/cadastro",usuarioController.mostraFormulario)


module.exports = router