
const { ObjectId } = require("mongodb")

const Tarefa = require("../models/Tarefa")

const Usuario = require("../models/Usuario")

class tarefaController
{
    static mostraFormulario(req,res){
        res.render("tarefas/novaTarefa",{layout:false})
    }

    static async adicionarTarefa(req,res){

        const {titulo,descricao} = req.body
        const status = false //true=tarefa feita ----- false = tarefa não feita

        if(!titulo && !descricao){
            req.flash("info","this message will be displayed");
            res.redirect('/tarefas/adicionarTarefa');
        }
        const usuario = await Usuario.findById({_id:ObjectId(req.session.usuario)})
        
        const dadosTarefa = new Tarefa({
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

        req.flash("success","Tarefa adicionada com sucesso")

        res.redirect("/tarefas")
    }

    static async minhasTarefas(req,res){
        const tarefas = await Tarefa.find({'usuario._id': ObjectId(req.session.usuario)}).lean()
        res.render('tarefas/tarefas',{tarefas})
    }

    static async excluirTarefa(req,res){
        const id = req.params.id
        
        await Tarefa.deleteOne({_id : id})

        res.redirect("/tarefas")
    }

    static async tarefaFeita(req,res){
        const id = req.params.id

        const tarefa = await Tarefa.findByIdAndUpdate(id)

        tarefa.status = true //tarefa foi feita

        tarefa.save() //salvar alteração
        
        res.redirect("/tarefas")
    }

    static async formularioEdicao(req,res){
        const id = req.params.id

        const tarefa = await Tarefa.findOne({_id:id}).lean()

        res.render("tarefas/editarTarefa",{tarefa:tarefa})
    }

    static async editar(req,res){

        const id = req.body.id
        const titulo = req.body.titulo
        const descricao = req.body.descricao

        if(!titulo){
            req.flash("error",'Preencha o titulo')
            res.redirect("/tarefas/adicionarTarefa")
            return
        }
        if(!descricao){
            req.flash("error",'Preencha a descrição')
            res.redirect("/tarefas/adicionarTarefa")
            return
        }

        const tarefa = await Tarefa.findByIdAndUpdate(id)

        tarefa.titulo = titulo

        tarefa.descricao = descricao

        tarefa.save()

        res.redirect("/tarefas")
    }
}

module.exports = tarefaController