const express = require('express')
const app = express()
const session = require("express-session")
const {flash} = require("express-flash-message")
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

app.use(express.static('public'))

require("dotenv").config()

//session middleware
app.use(
  session({
    name: 'session',
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

// flash messages
app.use(flash());

// set session to res
app.use((req, resp, next) => {
  // console.log(req.session)
  if (req.session.usuario) {
    resp.locals.session = req.session;
  }

  next();
});

//console.log(process.env.SECRET_SESSION)

app.use('/tarefas',rotasTarefas)

app.use('/usuarios',rotasUsuarios)


app.listen(2000,console.log("servidor rodando"))