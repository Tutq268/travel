import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let Schema = mongoose.Schema

let SubTaskModel = new Schema({
    sub_title: {type: String,required: true},
    status: {type: String,default: "pending"},
    work: {type: Schema.Types.ObjectId,ref: "Word"},
    createAt : {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})
SubTaskModel.statics={
    createNewSubTask(item){
        return this.create(item)
    },
    updateStatus(id,status){
        return this.findByIdAndUpdate(id,{status:status}).exec()
    }
}


module.exports = mongoose.model("Subtask",SubTaskModel)