const http = require('http');  
const app = require('./app');   
const port = process.env.PORT || 3500;

const path = require('path');
const fs = require('fs');
const express = require('express');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Make uploads directory accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const server = http.createServer(app);

server.listen(port , () =>{
    console.log(`Server is running on port ${port}`);
});  // server listens on port 3000
