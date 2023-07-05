const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
}

const signupUser = async (req,res) => {
    const {username,password} = req.body;
    
    console.log('Username - ' + username + ' ' + 'Password -' + password)

    try{
        const user = await User.signup(username,password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username, token, success:true})
    }
    catch(error){
        res.status(400).json({error: error.message, success:false});
    }
}


const loginUser = async (req,res) => {
    const {username, password} = req.body;
    console.log('Username - ' + username + '  ' + 'Password -' + password + '  Action - Login')

    try {
        const user = await User.login(username,password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username,token, success:true})

    } catch (error) {
        res.status(400).json({error:error.message, success:false})
    }
}

module.exports = {
    signupUser,
    loginUser
}