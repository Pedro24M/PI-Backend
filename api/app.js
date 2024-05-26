require('dotenv').config();
const mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

mongoose.connect(process.env.MONGODB_URL)

const routerAgenda = require("./routes/router_agenda")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/agenda", routerAgenda)


module.exports = app;
