const router = require('express').Router();
const mongoose = require('mongoose');
const Answer = require('../../models/Answer');
const Comment = require('../../models/Comment');
// import models 
const QuestionModel = require('../../models/Question');
const UserModel = require('../../models/User');

// create a user
router.post('/add', async (req, res) => {
    console.log('Question : Add');
    try {
        const { title, body, tags, user_id } = req.body;
        if (!title || !body || !user_id) {
            return res.status(400).json({
                success: false,
                msg: 'All fields are required'
            })
        }
        if (!mongoose.isValidObjectId(user_id)) {
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
        // save 
        let question = new QuestionModel({
            title: title,
            body: body,
            tags: tags,
            user_id: user_id
        })
        await question
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
        console.log(error.message);
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
})

// single question 
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid Object Id'
            })
        }
        let result = {};
        let question = await QuestionModel.findById(id);
        if (question) {
            // if we find question 
            let ans = await Answer.find({ question_id: question._id });
            let com = await Comment.find({ question_id: question._id });
            result = { question, answers: ans, comments: com }
            return res.status(200).json({
                success: true,
                data: result
            })
        } else {
            return res.status(400).json({
                success: false,
                msg: 'Question not found'
            })
        }

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
})

module.exports = router; 