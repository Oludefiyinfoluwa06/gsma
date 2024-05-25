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

const profile = async (req, res) => {
    const { email } = req.query;

    const profile = await UserProfile.findOne({ email });

    if (!profile) return res.status(400).json({ error: 'User profile with this email does not exist' });

    return res.status(200).json({ profile });
}

const profilePicUpload = async (req, res) => {
    // const { email } = req.body;
    // console.log(req.body);
    console.log(req.file);

    // if (req.file === undefined) return res.status(400).json({ error: 'Select an image' });

    // const imgUrl = `http://localhost:5000/file/${req.file.filename}`;

    // await ProfilePicture.create({ email, imgUrl });

    // return res.status(201).json({ message: 'Profile picture updated successfully' });
}

module.exports = {
    userProfileSetUp,
    profile,
    profilePicUpload
}