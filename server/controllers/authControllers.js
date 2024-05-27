const User = require("../models/user");
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

const signup = async (req, res) => {
    const { email, password } = req.body;

    if (email === '' || password === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Enter a valid email' });

    if (password.length < 8) return res.status(400).json({ error: 'Password must be 8 characters or more' });

    const emailExists = await User.findOne({ email });

    if (emailExists) return res.status(400).json({ error: 'Email exists already' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    const token = createToken(user._id);

    return res.status(201).json({ message: 'Registration successful', token, user: user._id });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (email === '' || password === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Email does not exist' });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(400).json({ error: 'Enter a correct password' });

    const token = createToken(user._id);

    return res.status(200).json({ message: 'Login successful', token, user: user._id });
}

const getOtp = async (req, res) => {
    const { email } = req.body;

    if (email === '') return res.status(400).json({ error: 'Enter your email' });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Email does not exist' });

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const otp = Math.floor(Math.random() * 900000);

        const mailOptions = {
            from: 'gsma@gmail.com',
            to: email,
            subject: 'Your OTP for email verification',
            text: `Your OTP is ${otp}`
        }

        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(400).json({ error: 'An error occured' });
            }

            return res.status(201).json({ message: 'OTP sent succesfully', otp: otp });
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
}

const resetPassword = async (req, res) => {
    const { email, password } = req.body;

    if (password.length < 8) return res.status(400).json({ error: 'Password must be 8 characters or more' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ email }, { password: hash });

    return res.json({ message: 'Password updated successfully' });
}

module.exports = {
    signup,
    login,
    getOtp,
    resetPassword
}