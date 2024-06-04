var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Db Connection
const conn = require("./db/config")

conn()

// Routes
const routes = require("./routes/router")


// Importa o roteador do Swagger
const swaggerRouter = require('./routes/router_apidocs');

// Usa o roteador do Swagger
app.use(swaggerRouter);

// Configuração da porta e inicialização do servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use("/api", routes)

app.listen(3000, function(){
    console.log("Servidor Online!")
})
module.exports = app;
