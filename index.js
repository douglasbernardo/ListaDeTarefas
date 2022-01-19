const express = require('express')
const app = express()
const conn = require("./db/connection")

const rotasTarefas = require("./rotas/rotasTarefas")

//HANDLEBARS SETTINGS
const handleBars = require("express-handlebars")
app.engine("handlebars",handleBars.engine())
app.set("view engine","handlebars")
//END SETTINGS


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render("tarefas/tarefas",{layout:false})
})

app.use('/tarefas',rotasTarefas)

app.get('/teste',(req,resp)=>{
    resp.send("Começando com node na emiolo")
})

app.listen(2000,console.log("servidor rodando"))