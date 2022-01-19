
const Tarefa = require("../models/Tarefa")

class tarefaController{

    static mostraFormulario(req,resp){
        resp.render("tarefas/formularioCadastro",{layout:false})
    }

    static adicionarTarefa(req,resp){
        
        const titulo = req.body.titulo

        console.log(titulo)
       
    }
}

module.exports = tarefaController