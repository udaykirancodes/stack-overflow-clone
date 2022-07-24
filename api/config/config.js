const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MONGOOSE: {
        URL: process.env.MONGO_URL
    },
    PORT: process.env.PORT,
}