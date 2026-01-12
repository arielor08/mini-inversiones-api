const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const invRoutes = require('./routes/investments');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Security and logging
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/inversiones', invRoutes);

app.get('/', (req, res) => res.json({ message: 'Mini Inversiones API' }));

// 404 and error handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
