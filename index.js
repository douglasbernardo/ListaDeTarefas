const express = require('express')
const app = express()
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("express-flash")
const env = require("dotenv").config()
const conn = require("./db/connection")

const FileStore = require("session-file-store")(session)

//rotas
const rotasTarefas = require("./rotas/rotasTarefas")
const rotasUsuarios = require("./rotas/rotasUsuarios")

//HANDLEBARS SETTINGS
const handleBars = require("express-handlebars")
const process = require('process')

const hbs = handleBars.create({
  partialsDir: ["views/partials/"], //partials path
});

app.engine("handlebars",hbs.engine)
app.set("view engine","handlebars")
//END SETTINGS

app.use(express.urlencoded({extended: true,}),)

app.use(express.json())
app.use(cookieParser("secret"))

app.use(express.static('public'))

//session middleware
app.use(
  session({
    name: 'session',
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: true,
      maxAge: 36000000,
      expires: new Date(Date.now() + 36000000),
      httpOnly:  false,
    },
  }),
)

app.use((req,res,next)=>{
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

//app.use(flash());
// set session to res
app.use((req, res, next) => {
  // console.log(req.session)
  if (req.session.usuario) {
    res.locals.session = req.session;
  }
  next();
});


app.use('/tarefas',rotasTarefas)
app.use('/usuarios',rotasUsuarios)

app.use(function(req, res, next) {
  res.render("erros/httpErros",{code:404})
  return
});


app.listen(2000)