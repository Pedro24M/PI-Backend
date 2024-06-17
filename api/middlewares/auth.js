// middlewares/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


// Carregar variáveis de ambiente
dotenv.config();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  console.log(token)
  if (token) {
    try {
       const payload = jwt.verify(token, process.env.SEGREDO);
       console.log(payload);
       next();
    } catch(err) {
     res.status(401).json({msg: 'acesso negado'});
    } 
  } else {
   res.status(400).json({msg: 'token invalido'});
  }
 }

module.exports = authenticateToken;