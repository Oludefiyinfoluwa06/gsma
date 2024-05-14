const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    email: String,
    username: String,
    fullname: String,
    institutionName: String,
    major: String,
    yearOfStudy: String,
    studentId: String,
    universityEmail: String,
    profilePicture: String,
});

const userProfile = mongoose.model('userProfiles', userProfileSchema);
module.exports = userProfile;