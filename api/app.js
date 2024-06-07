var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const conn = require("./db/config")

conn()


const routes = require("./routes/router")

const AmigosRouter = require('./routes/AmigosRoutes')

const swaggerRouter = require('./routes/router_apidocs');

app.use(swaggerRouter)

app.use('/Amigos', AmigosRouter)

app.use("/api", routes)

app.listen(3000, function(){
    console.log("Servidor Online!")
})
module.exports = app;
