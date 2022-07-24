const router = require('express').Router();

// import models 
const QuestionModel = require('../../models/Question');

// create a user
router.post('/register', async (req, res) => {
    try {
        const { title, body, tags, user_id } = req.body;
        if (!title || !body || !user_id) {
            return res.status(400).json({
                success: false,
                msg: 'All fields are required'
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
                return res.status({
                    success: true,
                    data: doc
                })
            })
            .catch((err) => {
                return res.status({
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