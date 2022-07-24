const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Users', UserSchema); 