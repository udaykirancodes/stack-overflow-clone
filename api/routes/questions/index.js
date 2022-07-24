const router = require('express').Router();

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
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
})

module.exports = router; 