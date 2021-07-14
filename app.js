const express = require('express')

const animal = require('./routes/animal.route')
const app = express()

const mongoose = require('mongoose')

require('dotenv').config();

let mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/animals', animal)
app.use('/', animal)

const port =(process.env.PORT || 5000)

app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})