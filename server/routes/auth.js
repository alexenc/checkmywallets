const express = require('express');
const router = express.Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')
const auth = require('../middleware/auth')

//Create an user
//api/users
router.post('/',    
    authController.authenticateUser
);

router.get('/', 
    auth,   
    authController.userAuthenticated
);

module.exports = router