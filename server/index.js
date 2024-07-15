const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const eventRoutes = require('./routes/eventRoutes');
const chatRoutes = require('./routes/chatRoutes');
const Image = require('./models/picture');
const { upload } = require('./middlewares/upload');
const { authenticate } = require('./middlewares/auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://gsma-client.vercel.app',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('MongoDB connected');

        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

let bucket;

mongoose.connection.on('connected', () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'profilePictures'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chats', chatRoutes);

app.post('/api/pictures/upload', authenticate, upload.single('profilePicture'), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const imgUrl = `http://localhost:5000/api/pictures/${req.file.id}`;

    const newImage = new Image({
        userId: req.user._id,
        fileId: req.file._id,
        filename: req.file.filename,
        imgUrl
    });

    try {
        const profilePic = await newImage.save();
        return res.status(201).json({ message: 'Profile picture updated successfully', profilePic });
    } catch (err) {
        console.error('Error saving profile picture:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/pictures/:fileId', async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.set('Content-Type', file[0].contentType);
        res.set('Content-Disposition', `inline; filename=${file[0].filename}`);

        const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Unable to download file', error);
        res.status(400).json({ error: { text: 'Unable to download file', error } });
    }
});

app.delete('/api/pictures/:filename', async (req, res) => {
    try {
        const file = await bucket.find({ filename: req.params.filename }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }
        await bucket.delete(file[0]._id);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file from GridFS:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ room }) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('chatMessage', (message) => {
        io.to(message.room).emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
