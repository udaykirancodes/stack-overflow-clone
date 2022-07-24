const router = require('express').Router();

// import models 
const UserModel = require('../../models/User');

// create a user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: 'All fields are required'
            })
        }
        let user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                success: false,
                msg: 'Email already exists'
            })
        }
        user = new UserModel({
            name: name,
            email: email,
            password: password
        })
        let u = await user.save();
        return res.status(200).json({
            success: true,
            user: u,
            msg: 'User Created'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
})


// login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: 'All fields are required'
            })
        }
        let user = await UserModel.findOne({ $and: [{ email: email }, { password: password }] });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'Email or password error'
            })
        }
        if (user) {
            return res.status(200).json({
                success: true,
                user: user,
                msg: 'User logged in'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
})

module.exports = router; 