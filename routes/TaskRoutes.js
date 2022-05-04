
const router = require("express").Router()

const TaskController = require("../controllers/TaskController")

const checkUser = require("../helpers/checkUser").userAuth

router.get("",checkUser,TaskController.myTasks)
router.get("/adicionarTarefa",checkUser,TaskController.newTaskForm)
router.post("/adicionarTarefa",checkUser,TaskController.addTask)
router.post("/excluir/:id",checkUser,TaskController.deleteTask)
router.get("/editar/:id",checkUser,TaskController.formEdit)
router.post("/editar",checkUser,TaskController.editTask)
router.post("/done/:id",checkUser,TaskController.DoneTask)

module.exports = router