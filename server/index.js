const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let gfs;

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('Connection successful');
        const conn = mongoose.connection;
        conn.once('open', () => {
            gfs = Grid(conn.db, mongoose.mongo);
            gfs.collection('profilePictures');
        });
        app.listen(port, () => console.log(`Server running on port: http://localhost:${port}!`));
    })
    .catch(err => console.log(err, 'Connection unsuccessful'));

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.get('/api/profile/:picture', async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: 'Picture not found' });
    }
})

app.delete('/api/profile/:picture', async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.status(200).json({ message: 'Picture deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'An error occurred' });
    }
})