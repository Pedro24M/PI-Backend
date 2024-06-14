const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'Email already exists' });

        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('Authorization', 'Bearer ' + token).status(201).json({ token });
    } catch (error) {
        console.error('Error creating user:', error);  // Adicionei mais detalhes ao log de erro
        res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Email or password is wrong' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Email or password is wrong' });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('Authorization', 'Bearer ' + token).status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);  // Adicionei mais detalhes ao log de erro
        res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
    }
};
