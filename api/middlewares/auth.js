// middlewares/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


// Carregar variáveis de ambiente
dotenv.config();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (jwt.verify(token, process.env.JWT_SECRET)) {
      next();
    } else {
     res.status(401).json({msg: 'acesso negado'});
    }
 }

module.exports = authenticateToken;