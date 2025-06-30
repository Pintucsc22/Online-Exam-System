const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);  // Only mount examRoutes here

app.get('/', (req, res) => {
  res.send('🎯 Online Exam System API is running');
});

module.exports = app;

