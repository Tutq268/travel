import mongoose from 'mongoose'

let schema = mongoose.Schema

let WordSchema = new schema({
    work_title: {type: String,required: true},
    status_work: {type: String,default: 'pedding'},
    deadline: {type: Number,default: null},
    account : {type: schema.Types.ObjectId,ref: 'User'},
    users: [{type: schema.Types.ObjectId,ref: 'User'}],
    subs: [{type: schema.Types.ObjectId,ref: 'Subtask'}],
    comments: [{type: schema.Types.ObjectId,ref: "Comment"}],
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

WordSchema.statics ={
    createNew(item){
        return this.create(item)
    },
    findAllWork(userId){
        return this.find({
            $or :[
                {"account" : userId},
                {"users" : {$in :[userId]}}
            ]
        }).populate("users","avatar").exec()
    },
    updateDeadline(item){
        return this.findByIdAndUpdate(item._id,item).exec()
    }
}

module.exports = mongoose.model("Word",WordSchema)