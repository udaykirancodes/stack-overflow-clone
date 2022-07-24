const router = require('express').Router();

// import models 
const AnswerModel = require('../../models/Answer');
const UserModel = require('../../models/User');
const QuestionModel = require('../../models/Question');


// create a 
router.post('/add', async (req, res) => {
    try {
        const { question_id, answer, user_id } = req.body;
        if (!question_id || !answer || !user_id) {
            return res.status(400).json({
                success: false,
                msg: 'All fields are required'
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
        // find if question exists 
        let question = await QuestionModel.findById(question_id);
        if (!question) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid User'
            })
        }

        // save 
        let ans = new AnswerModel({
            answer: answer,
            user_id: user_id
        })
        await ans
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
        console.log(error.message)
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
})

module.exports = router; 