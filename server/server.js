const express = require('express')
const app = express()
const path = require('path')
const api = require('./routes/api')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "..", 'node_modules')))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/transactionsDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use('/', api)


const port = 8990

app.listen(port, function() {
    console.log(`Running on port ${port}`)
})