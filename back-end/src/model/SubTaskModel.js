import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let Schema = mongoose.Schema

let SubTaskModel = new Schema({
    sub_title: {type: String,required: true},
    status: {type: String,default: "pedding"},
    createAt : {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})



module.exports = mongoose.model("Subtask",SubTaskModel)