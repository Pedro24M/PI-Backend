const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');
const authenticateToken = require('../middlewares/auth');

// Carregar variáveis de ambiente
dotenv.config();

// Verificar se o segredo está sendo carregado corretamente
console.log('JWT_SECRET:', process.env.JWT_SECRET);



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
  try {
    console.log('Tentativa de login:', req.body);
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });

    if (!usuario) {
      console.log('Usuário não encontrado:', email);
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const hashedInputPassword = cifrarSenha(password, usuario.salt);
    console.log('Senha cifrada para comparação:', hashedInputPassword);

    if (usuario.password !== hashedInputPassword) {
      console.log('Senha incorreta para o usuário:', email);
      return res.status(401).json({ msg: "Acesso negado" });
    }

    const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

// Função para obter todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
      // Verificar se o token JWT é fornecido no cabeçalho de autorização
      const token = req.headers['Authorization'];
      console.log('Token recebido:', token); // Adicionando log para verificar o token recebido
  
      // Se o token não estiver presente, retornar erro 401
      if (!token) {
        console.log('Token não fornecido');
        return res.status(401).json({ error: 'Token não fornecido' });
      }
  
      // Extrair o token da string de autorização
      const extractedToken = token.split(' ')[1]; // Assumindo que o token segue o formato "Bearer <token>"
  
      // Verificar se o token JWT é válido
      jwt.verify(extractedToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.log('Token inválido:', err.message); // Adicionando log para verificar o erro de token inválido
          return res.status(401).json({ error: 'Token inválido' });
        }
  
        // Se o token for válido, buscar todos os usuários no banco de dados
        const users = await User.find();
        console.log('Usuários encontrados:', users);
        res.status(200).json(users);
      });
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      res.status(500).json({ error: 'Erro ao obter usuários' });
    }
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
