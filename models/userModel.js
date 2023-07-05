const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps:true})

// static signup method
userSchema.statics.signup = async function(username,password){
    // validation
    if(!username || !password){
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({username})

    if(exists){
        throw Error('Username already in use')
    }

    const user = await this.create({username, password})

    return user
}

// static Login method
userSchema.statics.login = async function(username,password){
    if(!username || !password){
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({username})

    if(!user){
        throw Error('User does not exist');
    }

    const match = user?.password === password ? true : false
    if(!match) {
         throw Error('Incorrect Password');
    }

    return user
}

module.exports = mongoose.model('Users', userSchema)