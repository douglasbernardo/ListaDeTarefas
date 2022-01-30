
const router = require("express").Router()

const tarefaController = require("../controllers/tarefaController")

const checarUsuario = require("../helpers/checarUsuario").usuarioAuth

router.get("",checarUsuario,tarefaController.minhasTarefas)
router.get("/adicionarTarefa",tarefaController.mostraFormulario)
router.post("/adicionarTarefa",checarUsuario,tarefaController.adicionarTarefa)
router.post("/excluir/:id",checarUsuario,tarefaController.excluirTarefa)
router.get("/editar/:id",checarUsuario,tarefaController.formularioEdicao)
router.post("/editar",checarUsuario,tarefaController.editar)
router.post("/done/:id",checarUsuario,tarefaController.tarefaFeita)


module.exports = router