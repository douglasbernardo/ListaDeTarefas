
const router = require("express").Router()

const tarefaController = require("../controllers/tarefaController")

const checkUser = require("../helpers/checkUser").userAuth

router.get("",checkUser,tarefaController.minhasTarefas)
router.get("/adicionarTarefa",checkUser,tarefaController.mostraFormulario)
router.post("/adicionarTarefa",checkUser,tarefaController.adicionarTarefa)
router.post("/excluir/:id",checkUser,tarefaController.excluirTarefa)
router.get("/editar/:id",checkUser,tarefaController.formularioEdicao)
router.post("/editar",checkUser,tarefaController.editar)
router.post("/done/:id",checkUser,tarefaController.tarefaFeita)

module.exports = router