const Chat = require('../models/chat');
const UserProfile = require('../models/profile');

const getChatMessages = async (req, res) => {
    const { room } = req.params;

    try {
        const messages = await Chat.find({ room });
        return res.status(200).json({ messages });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

const saveChatMessage = async (req, res) => {
    const { room, message } = req.body;

    try {
        const newMessage = new Chat({
            room,
            user: req.user._id,
            message
        });

        await newMessage.save();

        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

const getUsers = async (req, res) => {
    const { query } = req.params;

    try {
        const users = await UserProfile.find({
            username: { $regex: query, $options: 'i' }
        }).select('_id firstname lastname');

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch search results' });
    }
};

module.exports = {
    getChatMessages,
    saveChatMessage,
    getUsers
};
