const UserProfile = require("../models/profile");
const User = require('../models/user');

const userProfileSetUp = async (req, res) => {
    const { username, fullname, institutionName, major, yearOfStudy, studentId } = req.body;

    if ( username === '' || fullname === '' || institutionName === '' || major === '' || yearOfStudy === '' || studentId === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    const isValidStudentId = (studentId) => {
        const regex = /^LUC\/[A-Z]+\/[A-Z]+\/\d{2}\/\d{1,3}$/;
        return regex.test(studentId);
    }

    const isStudentId = isValidStudentId(studentId);

    if (!isStudentId) return res.status(400).json({ error: 'Enter a valid student ID' });

    const user = await User.findById(req.user._id);

    const userProfile = await UserProfile.create({ userId: req.user._id, email: user.email, username, fullname, institutionName, major, yearOfStudy, studentId });

    return res.status(201).json({ message: 'Profile setup successful' });
}

const userProfileUpdate = async (req, res) => {
    const { username, fullname, institutionName, major, yearOfStudy, studentId } = req.body;

    if (username === '' || fullname === '' || institutionName === '' || major === '' || yearOfStudy === '' || studentId === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    const isValidStudentId = (studentId) => {
        const regex = /^LUC\/[A-Z]+\/[A-Z]+\/\d{2}\/\d{1,3}$/;
        return regex.test(studentId);
    }

    const isStudentId = isValidStudentId(studentId);

    if (!isStudentId) return res.status(400).json({ error: 'Enter a valid student ID' });

    const user = await User.findById(req.user._id);

    await UserProfile.findOneAndUpdate({ userId: req.user._id }, { email: user.email, username, fullname, institutionName, major, yearOfStudy, studentId }, { new: true });

    return res.status(200).json({ message: 'Profile update successful' });
}

const profile = async (req, res) => {
    const profile = await UserProfile.findOne({ userId: req.user._id });

    if (!profile) return res.status(400).json({ error: 'User profile does not exist' });

    return res.status(200).json({ profile });
}

const profilePicUpload = async (req, res) => {
    if (!req.file) {
        return res.status(400).json('No file uploaded.');
    }

    const imgUrl = `http://localhost:5000/api/profile/${req.file.filename}`;

    return res.status(201).json({ message: 'Profile picture updated successfully', profileImg: imgUrl });
}

module.exports = {
    userProfileSetUp,
    userProfileUpdate,
    profile,
    profilePicUpload
}