const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bodyParser = require("body-parser")
const conn = require("./db/connection")

app.use(bodyParser.json())
app.use(cookieParser('secret'))
app.use(session({cookie: {maxAge: null}}))


//HANDLEBARS SETTINGS
const handleBars = require("express-handlebars")

const hbs = handleBars.create({
  partialsDir: ["views/partials/"], //partials path
});

app.engine("handlebars",hbs.engine)
app.set("view engine","handlebars")
//END SETTINGS


//FLASH MESSAGES SETTINGS
app.use((req, res, next)=>{
  res.locals.message = req.session.message
  delete req.session.message
  next()
})


app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

const rotasTarefas = require("./rotas/rotasTarefas")
app.use('/tarefas',rotasTarefas)


// app.get("/teste",(req,resp)=>{
//   req.session.message = {
//     type: 'danger',
//     intro: 'Campos vazios! ',
//     message: 'Preencha os campos corretamente.' 
//   } 

//   console.log(req.session.message.message)
// })
app.listen(2000,console.log("servidor rodando"))