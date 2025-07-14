const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Routes
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');
const questionRoutes = require('./routes/questions');

// Initialize Express
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Use modular routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/exams/:examId/questions', questionRoutes);  // ✅ FIXED path

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
