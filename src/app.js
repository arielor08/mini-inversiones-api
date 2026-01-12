const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const invRoutes = require('./routes/investments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/inversiones', invRoutes);

app.get('/', (req, res) => res.json({ message: 'Mini Inversiones API' }));

module.exports = app;
