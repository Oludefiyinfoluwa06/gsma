const { signup, login, getOtp } = require('../controllers/authControllers');

const router = require('express').Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/get-otp', getOtp)

module.exports = router;