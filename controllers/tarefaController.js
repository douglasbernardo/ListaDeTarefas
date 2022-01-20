
const { json } = require("express/lib/response")
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
            alert("Preencha o titulo corretamente")
            return
        }
        if(!descricao){
            alert("Preencha a descrição corretamente")
            return
        }

        await data.save()

        resp.redirect('/tarefas')
    }

    static async minhasTarefas(req,resp){
        const tarefas = await Tarefa.find().lean()
        resp.render('tarefas/tarefas',{tarefas})
    }

    static async excluirTarefa(req,resp){
        const id = req.params.id
        
        await Tarefa.deleteOne({_id : id})

        resp.redirect("/tarefas")
    }
}

module.exports = tarefaController