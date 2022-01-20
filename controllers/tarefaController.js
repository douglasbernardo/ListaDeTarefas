
const Tarefa = require("../models/Tarefa")

class tarefaController
{

    static mostraFormulario(req,resp){
        resp.render("tarefas/novaTarefa",{layout:false})
    }

    static async adicionarTarefa(req,resp){
        
        const titulo = req.body.titulo
        const descricao = req.body.descricao

        const data = new Tarefa({titulo,descricao})
        
        if(!titulo && !descricao){
            console.log("Preencha o titulo e a descrição")
            return
        }

        if(!titulo){
            console.log("Preencha o titulo corretamente")
            return
        }
        if(!descricao){
            console.log("Preencha a descrição corretamente")
            return
        }

        await data.save()

        resp.redirect('/tarefas')
    }

    static async minhasTarefas(req,resp){
        const tarefas = await Tarefa.find().lean()
        resp.render('tarefas/tarefas',{tarefas})
    }
}

module.exports = tarefaController