require('dotenv').config();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.dbURI,
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: 'profilePictures',
            filename: `${Date.now()}-${file.originalname}`
        }
    }
});

module.exports = multer({ storage: storage });