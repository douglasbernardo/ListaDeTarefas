
const Tarefa = require("../models/Tarefa")

class tarefaController
{

    static mostraFormulario(req,resp){
        resp.render("tarefas/novaTarefa",{layout:false})
    }

    static async adicionarTarefa(req,resp){
        
        const titulo = req.body.titulo
        const descricao = req.body.descricao
        const status = false //true=tarefa feita ----- false = tarefa não feita

        const data = new Tarefa({titulo,descricao,status})
        
        if(!titulo && !descricao){
            const mensagem = await req.flash("danger","Preecha os dados corretamente")
            //resp.redirect("tarefas/novaTarefa",{msgs})
            console.log(mensagem)
            return
        }

        // if(!titulo){
        //    console.log("")
        // }
        // if(!descricao){
        //     const msgs = await req.consumeFlash("info")
        //     resp.redirect("tarefas/novaTarefa",{msgs})
        // }

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

    static async tarefaFeita(req,resp){
        const id = req.params.id

        const tarefa = await Tarefa.findByIdAndUpdate(id)

        tarefa.status = true //tarefa foi feita

        tarefa.save() //salvar alteração
        
        resp.redirect("/tarefas")
    }

    static async formularioEdicao(req,resp){
        const id = req.params.id

        const tarefa = await Tarefa.findOne({_id:id}).lean()

        resp.render("tarefas/editarTarefa",{tarefa:tarefa})
    }

    static async editar(req,resp){

        const id = req.body.id
        const titulo = req.body.titulo
        const descricao = req.body.descricao

        const tarefa = await Tarefa.findByIdAndUpdate(id)

        tarefa.titulo = titulo

        tarefa.descricao = descricao

        tarefa.save()

        resp.redirect("/tarefas")
    }
}

module.exports = tarefaController