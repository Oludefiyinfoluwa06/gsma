const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    fileId: mongoose.Schema.Types.ObjectId,
    filename: String,
    imgUrl: String,
});

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
