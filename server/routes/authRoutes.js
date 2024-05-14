const { signup, login, getOtp, resetPassword } = require('../controllers/authControllers');

const router = require('express').Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/get-otp', getOtp);
router.put('/reset-password', resetPassword);

module.exports = router;