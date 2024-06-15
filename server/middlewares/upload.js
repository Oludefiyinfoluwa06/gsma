require('dotenv').config();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.dbURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: `${Date.now()}-${file.originalname}`,
                bucketName: 'profilePictures',
            };

            resolve(fileInfo);
        }).catch(err => {
            console.log('Error: ' + err);
        });
    },
});

const upload = multer({ storage });

module.exports = {
    upload
};
