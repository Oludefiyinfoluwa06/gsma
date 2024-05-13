const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    email: String,
    username: String,
    
});

const userProfile = mongoose.model('userProfiles', profileSchema);
module.exports = userProfile;