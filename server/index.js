const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('Connection successful')
        app.listen(port, () => console.log(`Server running on port: http://localhost:${port}!`))
    })
    .catch(err => console.log(err, 'Connection unsuccessful'));

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);