var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Db Connection
const conn = require("./db/config");
conn(); // Estabelece a conexão com o banco de dados

// Routes
const routes = require("./routes/router");

// Importa o roteador do Swagger
const swaggerRouter = require('./routes/router_apidocs');

// Usa o roteador do Swagger
app.use(swaggerRouter);

// Usa as rotas da API
app.use("/api", routes);

// Configuração da porta e inicialização do servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
