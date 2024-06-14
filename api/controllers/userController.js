const User = require('../models/user');

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        console.log('Novo usuário criado:', newUser);
        res.status(201).json({ msg: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

// Função para obter todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log('Usuários encontrados:', users);
        res.status(200).json(users);
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
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
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
