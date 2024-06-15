const { userProfileSetUp, profile, profilePicUpload, userProfileUpdate, user } = require('../controllers/profileController');
const upload = require('../middlewares/upload');
const { authenticate } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/profile-setup', authenticate, userProfileSetUp);
router.post('/profile-update', authenticate, userProfileUpdate);
router.get('/', authenticate, profile);
router.get('/:userId', authenticate, user);
router.post('/picture-upload', authenticate, upload.single('profilePicture'), profilePicUpload);

module.exports = router;