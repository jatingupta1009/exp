const jwt= require('jsonwebtoken');
const User= require('../models/User');

//generate token
const generateToken= (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

//regiter user
exports.registerUser= async (req, res)=>{   
    const {username, email, password}= req.body;
    console.log(username, email, password); 

    if(!username || !email || !password)
    {
        return res.status(400).json({message: 'Please fill all fields'});
    }
    
    try
    {
        const userExists= await User.findOne({email});
        if(userExists)
        {
            return res.status(400).json({message: 'User already exists'});
        }   

        const user= await User.create({username, email, password});

        if(user)
        {   
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            });
        }
        else
        {
            res.status(400).json({message: 'Invalid user data'});
        }       
    }
    catch(error)
    {
        res.status(500).json({message: 'Server error'});
    }
}

//login user
exports.loginUser= async (req, res)=>{
    const {email, password}= req.body;    
    
    if(!email || !password)
    {
        return res.status(400).json({message: 'Please fill all fields'});
    }   
    
    try
    {
        const user= await User.findOne({email});
        if(user && (await user.matchPassword(password)))
        {
            res.json({
                _id: user._id,
                username: user.username,    
                email: user.email,
                token: generateToken(user._id)
            });
        }
        else
        {
            res.status(401).json({message: 'Invalid email or password'});
        }   
    }
    catch(error)
    {
        res.status(500).json({message: 'Server error'});
    }   
}

//get user info
exports.getUserInfo= async (req, res)=>{
    const {id}= req.body;          
    try
    {
        const user= await User.findById(id).select('-password');
        if(user)
        {   
            res.json(user); 
        }
        else
        {
            res.status(404).json({message: 'User not found'});
        }   
    }
    catch(error)
    {
        res.status(500).json({message: 'Server error'});
    }
}