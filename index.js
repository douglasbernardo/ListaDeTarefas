const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bodyParser = require("body-parser")
const flash = require("express-flash")
const conn = require("./db/connection")


//HANDLEBARS SETTINGS
const handleBars = require("express-handlebars")

const hbs = handleBars.create({
  partialsDir: ["views/partials/"], //partials path
});

app.engine("handlebars",hbs.engine)
app.set("view engine","handlebars")
//END SETTINGS

app.use(express.urlencoded({extended: true,}),)

app.use(express.json())

app.use(express.static('public'))

const rotasTarefas = require("./rotas/rotasTarefas")

//FLASHMESSAGE SETTINGS
app.use(session({ secret: '12345', cookie: { maxAge: null }}))

app.use(flash())
app.use('/tarefas',rotasTarefas)


app.listen(2000,console.log("servidor rodando"))