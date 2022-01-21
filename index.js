const express = require('express')
const app = express()
const {flash} = require("express-flash-message")
const session = require("express-session")
const conn = require("./db/connection")

const rotasTarefas = require("./rotas/rotasTarefas")

//HANDLEBARS SETTINGS
const handleBars = require("express-handlebars")

//PARTIALES SETTINGS
const hbs = handleBars.create({
  partialsDir: ["views/partials/"],
});

app.engine("handlebars",hbs.engine)
app.set("view engine","handlebars")
//END SETTINGS


//FLASH MESSAGES SETTINGS
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
)

app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/tarefas',rotasTarefas)


app.listen(2000,console.log("servidor rodando"))