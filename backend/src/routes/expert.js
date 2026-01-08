const express = require('express');
const multer = require('multer');
const { handleVoiceQuery } = require('../controllers/expertController');

const router = express.Router();

// Set up Multer storage for temporary audio file saving
const upload = multer({ dest: 'uploads/' }); 

// Route to handle voice query (uses single upload field named 'audio')
router.post('/voice', upload.single('audio'), handleVoiceQuery);

module.exports = router;
