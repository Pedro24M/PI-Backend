const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');
const authenticateToken = require('../middlewares/auth');

var token1

// Carregar variáveis de ambiente
dotenv.config();

// Verificar se o segredo está sendo carregado corretamente
console.log('JWT_SECRET:', process.env.SEGREDO);

function cifrarSenha(password, salt) {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest('hex');
}

// Função para cifrar a senha
function cifrarSenha(password, salt) {
  if (!password || !salt) {
    throw new Error('Password e salt são obrigatórios');
  }
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  return hash.digest('hex');
}

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = cifrarSenha(password, salt);
    const newUser = new User({ name, email, password: hashedPassword, salt });
    await newUser.save();
    console.log('Novo usuário criado:', newUser);
    res.status(201).json({ msg: 'Usuário criado com sucesso!', user: newUser });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Função para fazer login e gerar token JWT
exports.entrar = async (req, res) => {
    const usuarioEncontrado = await User.findOne({ email: req.body.email });
    console.log(usuarioEncontrado)
    if (usuarioEncontrado) {
      const senhaCifrada = cifrarSenha(req.body.password, usuarioEncontrado.salt);
      if (usuarioEncontrado.password === senhaCifrada) {
        res.json({ token: jwt.sign({email: usuarioEncontrado.email}, process.env.SEGREDO, {expiresIn: '60m'}) });
      } else {
        res.status(401).json({ msg: "acesso negado" });
      }
    } else {
      res.status(400).json({ msg: "credenciais invalidas" });
    }
  }
// Função para obter todos os usuários
exports.getAllUsers = async (req, res) => {
        const users = await User.find({});
        res.json(users);
    };


// Função para obter um usuário pelo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log('Usuário encontrado:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: 'Erro ao obter usuário' });
  }
};

// Função para atualizar um usuário pelo ID
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = cifrarSenha(password, salt);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password: hashedPassword, salt }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log('Usuário atualizado:', updatedUser);
    res.status(200).json({ msg: 'Usuário atualizado com sucesso!', user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

// Função para excluir um usuário pelo ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log('Usuário excluído:', deletedUser);
    res.status(200).json({ msg: 'Usuário excluído com sucesso!', deletedUser });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
};