const { userProfileSetUp, profile, userProfileUpdate, user } = require('../controllers/profileController');
const { authenticate } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/profile-setup', authenticate, userProfileSetUp);
router.post('/profile-update', authenticate, userProfileUpdate);
router.get('/', authenticate, profile);
router.get('/:userId', authenticate, user);

module.exports = router;
