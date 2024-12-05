const express = require('express')
const router = express.Router();

const { body } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken');

const {createUser,loginUser,getUserData,updateUser} = require('../controller/auth');

// ROUTE 1: create user using: POST "/api/auth/create/user". No Login required
router.post('/createuser',[
    body('name','Enter Valid Nmae').notEmpty().isLength({min:3}),
    body('email','Enter Vaid Email').notEmpty().isEmail(),
    body('password','Enter Valid Password').notEmpty().isLength({min:6})
],createUser);


// ROUTE 2: login user using: POST "/api/auth/login" No login required
router.post('/login',[
    body('email','Please enter valid email').isEmail(),
    body('password','Password Cannot be empty').exists()
],loginUser);

// ROUTE 3: get user data POST "/api/auth/get_user_data" : Login User
router.post("/get_user_data",authenticateToken,getUserData);

// Route 4: update user data PUT "/api/auth/update_user" : Login Required
router.put('/update_user',authenticateToken,updateUser)

module.exports = router