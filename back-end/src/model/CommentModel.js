import mongoose from 'mongoose'

const Schema = mongoose.Schema

let CommentSchema = new Schema({
    content: {type: String,required: true},
    user: {type: Schema.Types.ObjectId,ref: "User"},
    work :{type: Schema.Types.ObjectId,ref: "Word"},
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

module.exports = mongoose.model("Comment",CommentSchema)