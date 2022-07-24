const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// import config 
const config = require('./config/config');

// importing app 
const app = require('./app');
mongoose.connect(config.MONGOOSE.URL)
    .then(() => {
        app.listen(config.PORT, () => {
            console.log('Server Started');
        })
        console.log('DataBase Connected');
    })