const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json());

// headers 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next();
})

// routes 
const routes = require('./routes/index');
app.use('/api', routes);

// static resources 
app.use('/upload', express.static(path.join(__dirname, '/..uploads/')))
module.exports = app;