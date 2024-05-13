const User = require("../models/user");
const validator = require('validator');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { email, password } = req.body;

    if (email === '' || password === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Enter a valid email' });

    if (password.length < 8) return res.status(400).json({ error: 'Password must be 8 characters or more' });

    const emailExists = await User.findOne({ email });

    if (emailExists) return res.status(400).json({ error: 'Email exists already' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.create({ email, password: hash });

    return res.status(201).json({ message: 'Registration successful' });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (email === '' || password === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Email does not exist' });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(400).json({ error: 'Enter a correct password' });

    return res.status(201).json({ message: 'Login successful' });
}

const getOtp = async (req, res) => {
    const { email } = req.body;

    if (email === '') return res.status(400).json({ error: 'Enter your email' });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Email does not exist' });
}

module.exports = {
    signup,
    login,
    getOtp,
}