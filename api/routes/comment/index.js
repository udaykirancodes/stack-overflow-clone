const router = require('express').Router();

// import models 
const QuestionModel = require('../../models/Question');
const UserModel = require('../../models/User');
const CommentModel = require('../../models/Comment');
const mongoose = require('mongoose');

// create a user
router.post('/add', async (req, res) => {
    try {
        const { question_id, comment, user_id } = req.body;
        if (!comment || !question_id || !user_id) {
            return res.status(400).json({
                success: false,
                msg: 'All fields are required'
            })
        }
        if (!mongoose.isValidObjectId(user_id) || !mongoose.isValidObjectId(question_id)) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid Object Id'
            })
        }
        // find if user exists 
        let user = await UserModel.findById(user_id);
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid User'
            })
        }
        // find if question 
        let question = await QuestionModel.findById(question_id);
        if (!question) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid User'
            })
        }
        // save 
        let ncomment = new CommentModel({
            comment: comment,
            question_id: question_id,
            user_id: user_id
        })
        await ncomment
            .save()
            .then((doc) => {
                res.status(200).send({
                    success: true,
                    data: doc
                })
            })
            .catch((err) => {
                res.status({
                    success: false,
                    msg: 'Error adding question'
                })
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
})

module.exports = router; 