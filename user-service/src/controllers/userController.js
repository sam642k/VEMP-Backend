const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body;
        // Check if user already exists
        const userExists = await User.findOne({ where: { email } });
        if(userExists) 
            return res.status(400).json({ message: 'User already exists' });
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10)
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if(!user || !(bcrypt.compareSync(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(!user) 
            res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};