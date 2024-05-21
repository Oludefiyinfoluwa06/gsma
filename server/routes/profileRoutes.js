const { userProfileSetUp, profile, profilePicUpload } = require('../controllers/profileController');

const router = require('express').Router();

// const methodOverride = require('method-override');
const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');

// const storage = new GridFsStorage({
//     url: process.env.dbURI,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }

//                 const filename = buf.toString('hex') + path.extname(file.originalname);

//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'profilePictures'
//                 };

//                 resolve(fileInfo);
//             });
//         });
//     }
// });

const upload = multer({ storage: multer.memoryStorage() });

router.post('/profile-setup', userProfileSetUp);
router.get('/', profile);
router.post('/picture-upload', upload.single('profilePicture'), profilePicUpload);

module.exports = router;