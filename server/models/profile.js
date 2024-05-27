const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    email: String,
    username: String,
    fullname: String,
    institutionName: String,
    major: String,
    yearOfStudy: String,
    studentId: String,
});

const UserProfile = mongoose.model('userProfiles', userProfileSchema);
module.exports = UserProfile;