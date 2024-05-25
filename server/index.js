const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
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

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('Connection successful');
        const conn = mongoose.connection;
        conn.once('open', () => {
            const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: 'profilePictures'
            });
            app.locals.gfs = gfs;
        });
        app.listen(port, () => console.log(`Server running on port: http://localhost:${port}!`));
    })
    .catch(err => console.log(err, 'Connection unsuccessful'));

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);