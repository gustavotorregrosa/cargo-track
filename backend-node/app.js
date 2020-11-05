const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 4200

const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const movementRoutes = require('./routes/movement')
const { response } = require('express')
require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res, next) => {
    res.send('Im alive')
})

app.use('/auth', authRoutes)
app.use('/categories', categoryRoutes)
app.use('/products', productRoutes)
app.use('/movements', movementRoutes)


app.listen(port)