const router = require('express').Router();


// auth routes 
const Auth = require('./auth/index');
router.use('/auth', Auth);

// base route
router.get('/', (req, res) => {
    res.send('Hey!');
})
module.exports = router; 