const express = require('express')
const app = express()
const conn = require("./db/connection")

const rotasTarefas = require("./rotas/rotasTarefas")

//HANDLEBARS SETTINGS
const handleBars = require("express-handlebars")
app.engine("handlebars",handleBars.engine())
app.set("view engine","handlebars")
//END SETTINGS

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/tarefas',rotasTarefas)


app.listen(2000,console.log("servidor rodando"))