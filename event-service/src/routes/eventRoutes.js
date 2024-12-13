const router = require('express').Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
//router.put('/:id', eventController.updateEvent);
//router.delete('/:id', eventController.deleteEvent);

module.exports = router;