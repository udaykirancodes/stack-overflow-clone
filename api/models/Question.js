const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    tags: {
        type: Array,
        default: []
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Questions', questionSchema); 