const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    },
    answer: {
        type: String,
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Answer', answerSchema); 