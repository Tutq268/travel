import mongoose from 'mongoose'

let schema = mongoose.Schema

let WordSchema = new schema({
    word_title: {type: String,required: true},
    status_word: {type: String,default: 'pedding'},
    account : {type: schema.Types.ObjectId,ref: 'User'},
    users: [{type: schema.Types.ObjectId,ref: 'User'}],
    subs: [{type: schema.Types.ObjectId,ref: 'Subtask'}],
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

module.exports = mongoose.model("Word",WordSchema)