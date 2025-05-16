// backend/server.js
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  
  // Listen on all network interfaces (not just localhost)
  app.listen(PORT, '0.0.0.0', () => 
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
  );
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
});

