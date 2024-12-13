const Event = require('../models').Event;

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event)
            return res.status(404).json({message: 'Event not found'});
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, visibility, createdBy } = req.body;
        // check if name already exists
        const eventExists = await Event.findOne({ where: { name } });
        if (eventExists)
            return res.status(400).json({ message: 'Event already exists' });
        const event = await Event.create({
            name,
            description,
            date,
            visibility,
            createdBy
        });
        res.status(201).json(event);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
};