
const router = require("express").Router()

const usuarioController = require("../controllers/usuarioController")

router.get("/cadastro",usuarioController.formularioCadastro)
router.post("/cadastro",usuarioController.cadastro)
router.get("/login",usuarioController.formularioLogin)
router.post("/login",usuarioController.login)

router.get("/logout",usuarioController.logout)

module.exports = router