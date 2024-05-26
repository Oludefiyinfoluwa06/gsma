const UserProfile = require("../models/profile");

const userProfileSetUp = async (req, res) => {
    const { email, username, fullname, institutionName, major, yearOfStudy, studentId } = req.body;

    if (email === '' || username === '' || fullname === '' || institutionName === '' || major === '' || yearOfStudy === '' || studentId === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    const emailExists = await UserProfile.findOne({ email });

    if (emailExists) return res.status(400).json({ error: 'Email exists already' });

    const isValidStudentId = (studentId) => {
        const regex = /^LUC\/[A-Z]+\/[A-Z]+\/\d{2}\/\d{1,3}$/;
        return regex.test(studentId);
    }

    const isStudentId = isValidStudentId(studentId);

    if (!isStudentId) return res.status(400).json({ error: 'Enter a valid student ID' });

    await UserProfile.create({ email, username, fullname, institutionName, major, yearOfStudy, studentId });

    return res.status(201).json({ message: 'Profile setup successful' });
}

const userProfileUpdate = async (req, res) => {
    const { username, fullname, institutionName, major, yearOfStudy, studentId } = req.body;

    const { email } = req.params;

    if (username === '' || fullname === '' || institutionName === '' || major === '' || yearOfStudy === '' || studentId === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    const isValidStudentId = (studentId) => {
        const regex = /^LUC\/[A-Z]+\/[A-Z]+\/\d{2}\/\d{1,3}$/;
        return regex.test(studentId);
    }

    const isStudentId = isValidStudentId(studentId);

    if (!isStudentId) return res.status(400).json({ error: 'Enter a valid student ID' });

    await UserProfile.findOneAndUpdate(email, {username, fullname, institutionName, major, yearOfStudy, studentId }, { new: true });

    return res.status(201).json({ message: 'Profile setup successful' });
}

const profile = async (req, res) => {
    const { email } = req.query;

    const profile = await UserProfile.findOne({ email });

    if (!profile) return res.status(400).json({ error: 'User profile with this email does not exist' });

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