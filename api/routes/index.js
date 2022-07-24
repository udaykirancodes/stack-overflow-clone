const router = require('express').Router();

// auth routes 
const Auth = require('./auth/index');
router.use('/auth', Auth);

// question routes 
const Question = require('./questions/index');
router.use('/questions', Question);

// answer routes 
const Answer = require('./answers/index');
router.use('/answers', Answer);

// comment routes 
const Comment = require('./comment/index');
router.use('/comment', Comment);

// base route
router.get('/', (req, res) => {
    res.send('Hey!');
})
module.exports = router; 