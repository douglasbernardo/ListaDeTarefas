
const { ObjectId } = require("mongodb")

const Task = require("../models/Task")

const User = require("../models/User")

class TaskController
{
    static newTaskForm(req,res){
        res.render("tasks/newTask",{layout:false})
    }

    static async addTask(req,res){

        const {titulo,descricao} = req.body
        const status = false //true=tarefa feita ----- false = tarefa não feita

        if(!titulo && !descricao){
            req.session.message = { type:"danger", message:"Preencha o titulo e a descrição"}
            req.session.save(()=>{
                res.redirect("/tarefas/adicionarTarefa")
            })
        }
        const usuario = await User.findById({_id:ObjectId(req.session.usuario)})
        
        const dadosTarefa = new Task({
            titulo,
            descricao,
            status,
            usuario:{
                _id:usuario._id,
                nome:usuario.nome,
                email:usuario.email,
            }
        })

        await dadosTarefa.save()

        req.session.message = { type:"success", message:`Tarefa ${titulo} adicionada com sucesso`}
        req.session.save(()=>{
            res.redirect("/tarefas")
        })
    }

    static async myTasks(req,res){
        const tarefas = await Task.find({'usuario._id': ObjectId(req.session.usuario)}).lean()
        res.render('tasks/tasks',{tarefas})
    }

    static async deleteTask(req,res){
        const id = req.params.id
        
        await Task.deleteOne({_id : id})

        res.redirect("/tarefas")
    }

    static async DoneTask(req,res){
        const id = req.params.id

        const tarefa = await Task.findByIdAndUpdate(id)

        tarefa.status = true //tarefa foi feita

        tarefa.save() //salvar alteração
        
        res.redirect("/tarefas")
    }

    static async formEdit(req,res){
        const id = req.params.id

        const tarefa = await Task.findOne({_id:id}).lean()

        /*
            Caso o id da tarefa a ser editada não pertença ao usuario logado, 
            ele não conseguira editar essa tarefa
        */
        
        if(tarefa.usuario._id.toString() !== req.session.usuario){ 
            res.render("errors/httpErrors",{code:203})
            return
        }

        res.render("tasks/editTask",{tarefa:tarefa})

    }

    static async editTask(req,res){

        const id = req.body.id
        const titulo = req.body.titulo
        const descricao = req.body.descricao

        if(!titulo){
            req.session.message = { type:"danger", message:"O titulo deve ser preenchido"}
            req.session.save(()=>{
                res.redirect("/tarefas/editar")
            })
        }
        if(!descricao){
            req.session.message = { type:"danger", message:"A descrição deve ser preenchida"}
            req.session.save(()=>{
                res.redirect("/tarefas/editar")
            })
        }

        const tarefa = await Task.findByIdAndUpdate(id)

        tarefa.titulo = titulo

        tarefa.descricao = descricao

        tarefa.save()

        res.redirect("/tarefas")
    }
}

module.exports = TaskController