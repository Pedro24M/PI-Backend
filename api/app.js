require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Conexão ao MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
});

const routerApidocs = require('./routes/router_apidocs');
const userRouter = require('./routes/router_user');
const authRouter = require('./routes/auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

<<<<<<< HEAD
app.use('/api-docs', routerApidocs);
app.use('/user', userRouter);
app.use('/auth', authRouter);

=======
//Db Connection
const conn = require("./db/config")

conn()

// Routes
const routes = require("./routes/router")

app.use("/api", routes)

app.listen(3000, function(){
    console.log("Servidor Online!")
})
>>>>>>> a9bfd14f49795b4dd1f1a8492754bac0f852736b
module.exports = app;
