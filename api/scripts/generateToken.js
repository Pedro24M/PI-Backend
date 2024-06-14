// scripts/generateToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Substitua pelo ID do usuário ou outra informação que deseja incluir no token
const userId = "user123"; 

// Leia a chave secreta do arquivo .env
const secret = process.env.JWT_SECRET || "your-secret-key";

// Dados que você deseja incluir no token
const payload = {
    userId: userId
};

// Opções de configuração do token (opcional)
const options = {
    expiresIn: '1h' // Expira em 1 hora
};

// Gerar o token
const token = jwt.sign(payload, secret, options);

console.log("Generated JWT Token:", token);
