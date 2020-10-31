const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

// Auth user & get token   
//@route  POST api/users/login
const authUser = asyncHandler(async(req,res)=>{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
    
        if(user && (await user.matchPasswords(password))){
           res.json({
               _id: user._id,
               name: user.name,
               email: user.email,
               isAdmin: user.isAdmin,
               token: generateToken(user._id)
           });
        }else{
           res.status(401)
           throw new Error('Invalid email or password')
        }
    });


// GET user profile  
//@route  GET api/users/profile
//@access Private
const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
});


// Register new user   
//@route  POST api/users/register
const registerUser = asyncHandler(async(req,res)=>{
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email })

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});


module.exports = { authUser, getUserProfile, registerUser }