const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tricountRoutes = require('./routes/tourPayRoutes');
const requestRoutes = require('./routes/requestRoutes');
const freeCardRoutes = require('./routes/freeCardRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tourPay', tourPayRoutes);
app.use('/request', requestRoutes);
app.use('/freecard', freeCardRoutes);
app.use('/profile', profileRoutes);

module.exports = app;