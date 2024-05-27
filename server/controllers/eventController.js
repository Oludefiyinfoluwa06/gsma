const Event = require("../models/event");

const createEvent = async (req, res) => {
    const { title, description, date } = req.body;

    if (!title || !description || !date) return res.status(400).json({ error: 'Input fields cannot be empty' });

    const event = await Event.create({ userId: req.user._id, title, description, date });

    return res.status(201).json({ message: 'Event created successfully', event });
}

const getAllEvents = async (req, res) => {
    const events = await Event.find().sort({ createdAt: -1 });

    return res.status(200).json({ events });
}

const getMyEvents = async (req, res) => {
    const events = await Event.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({ events });
}

module.exports = {
    createEvent,
    getAllEvents,
    getMyEvents
}