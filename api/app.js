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

app.listen(3000, function(){
    console.log("Servidor Online!")
})
module.exports = app;
