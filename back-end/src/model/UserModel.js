import mongoose from 'mongoose'

let schema = mongoose.Schema

let UserSchema = new schema({
    username: {type: String,required: true},
    email:{type: String,default: null},
    phone: {type: String,default: null},
    password: {type: String,required: true},
    avatar: {type: String,default: null},
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

module.exports = mongoose.model("User",UserSchema)