const userProfile = require("../models/profile");

const userProfileSetUp = async (req, res) => {
    const { email, username, fullname, institutionName, major, yearOfStudy, studentId, universityEmail, profilePicture } = req.body;

    if (email === '' || username === '' || fullname === '' || institutionName === '' || major === '' || yearOfStudy === '' || studentId === '' || universityEmail === '' || profilePicture === '') return res.status(400).json({ error: 'Input fields cannot be empty' });

    const universityDomains = ['lincoln.edu.ng', 'nsukk.edu.ng'];

    const isUniversityEmail = (email) => {
        const domain = email.split('@')[1];
        return universityDomains.includes(domain);
    };

    const isStudent = isUniversityEmail(email);

    if (!isStudent) return res.status(400).json({ error: 'Enter a valid university email' });

    const isValidStudentId = (studentId) => {
        const regex = /^LUC\/[A-Z]+\/[A-Z]+\/\d{2}\/\d{1,3}$/;
        return regex.test(studentId);
    }

    const isStudentId = isValidStudentId(studentId);

    if (!isStudentId) return res.status(400).json({ error: 'Enter a valid student ID' });
}

const profile = async (req, res) => {
    const { email } = req.query;

    const profile = await userProfile.findOne({ email });

    if (!profile) return res.status(400).json({ error: 'User profile with this email does not exist' });

    return res.status(200).json({ profile: profile });
}

module.exports = {
    userProfileSetUp,
    profile
}