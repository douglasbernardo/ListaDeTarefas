
const router = require("express").Router()
const UserController = require("../controllers/UserController")

router.get("/cadastro",UserController.formularioSignUp)
router.post("/cadastro",UserController.signUp)
router.get("/login",UserController.formLogin)
router.post("/login",UserController.login)

router.get("/logout",UserController.logout)

router.get("/removerConta",UserController.removerConta)

module.exports = router