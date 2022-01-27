
const router = require("express").Router()

const usuarioController = require("../controllers/usuarioController")

router.get("/cadastro",usuarioController.mostraFormulario)
router.post("/cadastro",usuarioController.cadastro)


module.exports = router