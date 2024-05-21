const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    email: String,
    username: String,
    fullname: String,
    institutionName: String,
    major: String,
    yearOfStudy: String,
    studentId: String,
    profilePicture: String,
});

const UserProfile = mongoose.model('userProfiles', userProfileSchema);
module.exports = UserProfile;