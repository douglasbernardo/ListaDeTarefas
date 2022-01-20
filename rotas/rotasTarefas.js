
const router = require("express").Router()

const tarefaController = require("../controllers/tarefaController")

router.get("",tarefaController.minhasTarefas)
router.get("/adicionarTarefa",tarefaController.mostraFormulario)
router.post("/adicionarTarefa",tarefaController.adicionarTarefa)


module.exports = router