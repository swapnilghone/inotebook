const { validationResult } = require('express-validator');
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req,res) => {

    // error handling if there are any validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    // wrapping inside try catch to handle any system errors.
    try{
        // check if email already exists
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({
                errors:[
                    {
                        "type": "field",
                        "value": req.body.email,
                        "msg": "Duplicate Email",
                        "path": "email",
                        "location": "body"
                    }
                ]
            });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:passwordHash
        });
        let authToken = jwt.sign({ id: user.id }, JWT_SECRET);
        res.json({authToken});

    }  catch (err) {
        res.status(500).send(`some error occured: ${err.message}`);
    }
}

const loginUser = async (req,res) => {

    console.log(process.env.JWT_SECRET);
    // error handling if there are any validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    try{
        const {email, password} = req.body;
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(400).send({error:"Invalid details"});
        }

        let isMatch = bcrypt.compareSync(password,user.password);

        if(!isMatch){
            return res.status(400).send({error:"Invalid details"});
        }

        let authToken = jwt.sign({ id: user.id },JWT_SECRET);
        let name = user.name;
        res.json({authToken,name});

    } catch(err){
        res.status(500).send(`Internal server Error: ${err.message}`);
    }
}

const getUserData =  async (req,res) => {

    try {
        let userId = req.userId;
        let userData = await User.findById(userId).select('-password');
        res.send(userData);
    } catch (err) {
        res.status(500).send(`Internal server Error: ${err.message}`);
    }
}

const updateUser = async (req,res) =>{
    try {
        let userId = req.userId;
        const {name,password} = req.body;
        let userData = {};

        if(name){userData.name = name;}
        if(password){
            const salt = bcrypt.genSaltSync(10);
            userData.password = bcrypt.hashSync(password, salt);
        };

        let user = await User.findByIdAndUpdate(userId,{$set: userData},{new: true});

        let authToken = jwt.sign({ id: userId }, JWT_SECRET);
        console.log(authToken);

        user.authToken = authToken;
        res.json({user,authToken});
    } catch (err) {
        res.status(500).send(`Internal Server Error: ${err.message}`);
    }
}

module.exports = {createUser,loginUser,getUserData,updateUser}