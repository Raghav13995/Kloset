const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require("cloudinary");
const multer = require("multer");
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

// Connect to database
require('./config/database').databaseconnection();

// Define Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/renterAuth', require('./routes/renterAuth'));
app.use('/api/v1/renter',require('./routes/renterWork'));

// Home route
app.get('/', (req, res) => {
    res.send('Kloset API is running');
});

// Connecting To CLoudinary -----------------------------------------------

cloudinary.config({ 
    cloud_name: "dgkvkldxn", 
    api_key: 969416975499171, 
    api_secret: "AZrqeTmVhicIG7wYZdHFqh7rge4" 
});
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({ imageUrl: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// -------------------------------------------------------------------------

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});