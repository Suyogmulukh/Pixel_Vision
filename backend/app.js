const dotenv = require ('dotenv')
dotenv.config()
const express = require ('express')
const app = express()
const cors = require('cors')
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')

const cookies = require('cookie-parser')

connectToDb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookies())

app.get('/', (req, res) =>{
    res.send("about page")
})


app.use('/users', userRoutes)

module.exports = app    