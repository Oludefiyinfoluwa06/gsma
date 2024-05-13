const { userProfileSetUp, profile } = require('../controllers/profileController');

const router = require('express').Router();

router.post('/profile-setup', userProfileSetUp);
router.post('/profile', profile);