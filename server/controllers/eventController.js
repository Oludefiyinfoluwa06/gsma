const Event = require("../models/event");

const createEvent = async (req, res) => {
    const { title, description, date } = req.body;

    if (!title || !description || !date) return res.status(400).json({ error: 'Input fields cannot be empty' });

    await Event.create({ title, description, date, createdBy: req.user._id });

    return res.status(201).json({ message: 'Event created successfully' });
}

const getAllEvents = async (req, res) => {
    const events = await Event.find().sort({ createdAt: -1 });

    return res.status(200).json({ events });
}

const getMyEvents = async (req, res) => {
    const events = await Event.find({ createdBy: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({ events });
}

const getEventDetails = async (req, res) => {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ error: 'Event not found' });

    return res.status(200).json({ event });
}

const editEvent = async (req, res) => {
    const { title, description, date } = req.body;
    const { id } = req.params;

    if (!title || !description || !date) return res.status(400).json({ error: 'Input fields cannot be empty' });

    await Event.findByIdAndUpdate(id, { title, description, date, createdBy: req.user._id }, { new: true });

    return res.status(200).json({ message: 'Event updated successfully' });
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    await Event.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Event deleted successfully' });
}

module.exports = {
    createEvent,
    getAllEvents,
    getMyEvents,
    getEventDetails,
    editEvent,
    deleteEvent
}