const router = require('express').Router();

const { createEvent, getAllEvents, getMyEvents, getEventDetails, editEvent, deleteEvent } = require('../controllers/eventController');
const { authenticate } = require('../middlewares/auth');

router.post('/create', authenticate, createEvent);
router.get('/all', authenticate, getAllEvents);
router.get('/my-events', authenticate, getMyEvents);
router.get('/:id', authenticate, getEventDetails);
router.post('/:id/edit', authenticate, editEvent);
router.delete('/:id/delete', authenticate, deleteEvent);

module.exports = router;