const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    },
    comment: {
        type: String,
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Comments', commentSchema); 