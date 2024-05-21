const mongoose = require('mongoose');

const profilePicSchema = new mongoose.Schema({
    email: String,
    picture: String,
});

const ProfilePicture = mongoose.model('profilePictures', profilePicSchema);
module.exports = ProfilePicture;