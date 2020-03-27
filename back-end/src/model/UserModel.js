import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
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

UserSchema.statics= {
    createNewUser(item){
        return this.create(item)
    },
    findByUser(username){
        return this.findOne({"username" : username}).exec()
    },
    findAllUser(){
        return this.find({}).select("-password").exec()
    }
}

UserSchema.methods ={
    comparePassword(password){
        return bcrypt.compare(password,this.password)
    }
}

module.exports = mongoose.model("User",UserSchema)