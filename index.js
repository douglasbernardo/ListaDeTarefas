const express = require('express')
const app = express()
const session = require("express-session")
const conn = require("./db/connection")

const FileStore = require("session-file-store")(session)

//rotas
const TaskRoutes = require("./routes/TaskRoutes")
const UserRoutes = require("./routes/UserRoutes")

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

//envrequire("dotenv").config()
require("dotenv").config()

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
      secure: false,
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

// set session to res
app.use((req, res, next) => {
  // console.log(req.session
  if(req.session.usuario) {
    res.locals.session = req.session;
  }
  next();
});

app.use('/tarefas',TaskRoutes)
app.use('/usuarios',UserRoutes)

app.get("/",(req,res,next)=>{
  res.redirect("/usuarios/cadastro")
  next()
})


app.use(function(req, res, next) {
  res.render("erros/httpErros",{code:404})
  return
});



app.listen(2000,console.log("servidor rodando"))
