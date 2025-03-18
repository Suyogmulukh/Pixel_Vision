const dotenv = require ('dotenv')
dotenv.config()
const express = require ('express') 
const app = express()
const cors = require('cors')
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const imageRoutes = require('./routes/image.routes')

const cookies = require('cookie-parser')

connectToDb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookies())

// Removed diskStorage and related code

app.use('/uploads', express.static('uploads')); // Serve static files

app.get('/', (req, res) =>{
    res.send("about page")
})

// Remove the upload image sources and related code
// app.post('/upload', upload.single('image'), async (req, res) => { 
//     try {
//         const image = req.file.path; 
//         const imageUpload = await imagemodel({ originalImage: image, enhancedImage: '' });
//         await imageUpload.save();
//         res.send({ msg: 'image uploaded', imageId: imageUpload._id });
//     } catch (error) {
//         res.send({ 'error': "unable to upload" });
//     }
// })

app.use('/users', userRoutes)
app.use('/image', imageRoutes)

module.exports = app