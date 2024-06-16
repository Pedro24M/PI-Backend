require('dotenv').config();
const mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

try {
    mongoose.connect(process.env.MONGODB_URL)
}
catch (err) {
    console.log(err)
}

const userRouter = require('./routes/router_user');
const authRouter = require('./routes/auth');
const routerApidocs = require('./routes/route_apidocs')
const routerAgenda = require("./routes/router_agenda")
const AmigosRouter = require('./routes/AmigosRoutes')
const routerFesta = require('./routes/servico')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', routerApidocs);
app.use("/agenda", routerAgenda)
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/Amigos', AmigosRouter)
app.use('/services', routerFesta)


module.exports = app;
