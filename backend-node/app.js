const express = require('express')
const bodyParser = require('body-parser')
const migrate = require('./util/migrations')
const app = express()
const port = 3001

const authRoutes = require('./routes/auth')
const { response } = require('express')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes)

migrate()

app.listen(port)