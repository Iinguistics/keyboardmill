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


// UPDATE user profile  
//@route  PUT api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
     user.password = req.body.password
    }

    const updatedUser = await user.save();
 
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
    });
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



// GET all users 
//@route  GET api/users
//@access Private/Admin
const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})

    if(users){
    res.json(users);

    }else{
        res.status(404)
        throw new Error('Users not found');
    }
});


// Delete user 
//@route  DELETE api/users/remove/:id
//@access Private/Admin
const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        res.status(404)
        throw new Error('User not found');

    }else{
        res.json({ user });
    }
});


// GET user by ID 
//@route  GET api/users/profile/edit/:id
//@access Private/Adim
const getUserProfileEdit = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')

    if(user){
    res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
});


// UPDATE user  
//@route  PUT api/profile/edit/:id
//@access Private/Admin
const editUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const updatedUser = await user.save();
 
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    });
    }else{
        res.status(404)
        throw new Error('User not found')
    }
});


module.exports = { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUser, getUserProfileEdit, editUserProfile }