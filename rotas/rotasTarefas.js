
const router = require("express").Router()

const tarefaController = require("../controllers/tarefaController")

router.get("",tarefaController.minhasTarefas)
router.get("/adicionarTarefa",tarefaController.mostraFormulario)
router.post("/adicionarTarefa",tarefaController.adicionarTarefa)
router.post("/excluir/:id",tarefaController.excluirTarefa)
router.get("/editar/:id",tarefaController.formularioEdicao)
router.post("/editar",tarefaController.editar)
router.post("/done/:id",tarefaController.tarefaFeita)


module.exports = router