const router = require('express').Router();

const { createEvent, getAllEvents, getMyEvents } = require('../controllers/eventController');
const { authenticate } = require('../middlewares/auth');

router.post('/create', authenticate, createEvent);
router.get('/all', authenticate, getAllEvents);
router.get('/my-events', authenticate, getMyEvents);

module.exports = router;