const { userProfileSetUp, profile, profilePicUpload, userProfileUpdate } = require('../controllers/profileController');
const upload = require('../middlewares/upload');

const router = require('express').Router();

router.post('/profile-setup', userProfileSetUp);
router.post('/profile-update', userProfileUpdate);
router.get('/', profile);
router.post('/picture-upload', upload.single('profilePicture'), profilePicUpload);

module.exports = router;