const dotenv = require('dotenv')
dotenv.config()
const express = require('express') 
const app = express()
const cors = require('cors')
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const imageRoutes = require('./routes/image.routes')
const enhanceRoutes = require('./routes/enhance.routes')
const fs = require('fs')
const path = require('path')
const cookies = require('cookie-parser')

connectToDb()

// Configure CORS with specific options
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3500'], // Add your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookies())

// Ensure upload directories exist
const uploadDirs = ['uploads'];
uploadDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use('/users', userRoutes)
app.use("/image", imageRoutes)
app.use("/image/enhance", enhanceRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!',
    message: err.message 
  });
});

module.exports = app