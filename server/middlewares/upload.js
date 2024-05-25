require('dotenv').config();
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.dbURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'profilePictures'
                };
                resolve(fileInfo);
            });
        });
    }
});

module.exports = multer({ storage: storage });