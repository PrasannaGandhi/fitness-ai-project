const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- Import Routes ---
const authRoutes = require('./routes/auth');
const fitnessRoutes = require('./routes/fitness');
const expertRoutes = require('./routes/expert'); // New Expert/Voice Route

const app = express();
app.use(express.json()); // Body parser for JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Basic Health Check Route ---
app.get('/', (req, res) => {
  res.send('AI Fitness API is running...');
});

// --- API Routes ---
app.use('/api/auth', authRoutes); // User Registration and Login
app.use('/api/fitness', fitnessRoutes); // Personalized Plan Generation
app.use('/api/expert', expertRoutes); // Voice Expert Call (New Feature)

// --- Server Listener ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
