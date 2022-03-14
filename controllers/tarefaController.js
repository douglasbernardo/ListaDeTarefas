
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
            req.session.message = { type:"danger", message:"Preencha o titulo e a descrição"}
            req.session.save(()=>{
                res.redirect("/tarefas/adicionarTarefa")
            })
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

        req.session.message = { type:"success", message:`Tarefa ${titulo} adicionada com sucesso`}
        req.session.save(()=>{
            res.redirect("/tarefas")
        })
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

        /*
            Caso o id da tarefa a ser editada não pertença ao usuario logado, 
            ele não conseguira editar essa tarefa
        */
        
        if(tarefa.usuario._id.toString() !== req.session.usuario){ 
            res.render("erros/httpErros",{code:203})
            return
        }

        res.render("tarefas/editarTarefa",{tarefa:tarefa})

    }

    static async editar(req,res){

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

        const tarefa = await Tarefa.findByIdAndUpdate(id)

        tarefa.titulo = titulo

        tarefa.descricao = descricao

        tarefa.save()

        res.redirect("/tarefas")
    }
}

module.exports = tarefaController