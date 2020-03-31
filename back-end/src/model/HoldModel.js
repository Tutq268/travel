import mongoose from 'mongoose'
const Schema = mongoose.Schema

let HoldSchema = new Schema({
    user : {type: Schema.Types.ObjectId,required: true,ref: "User"},
    tour: {type: Schema.Types.ObjectId,ref: "Tour",required: true},
    count: {type: Number,default :0},
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

HoldSchema.statics ={
    addNewHold(item){
        return this.create(item)
    },
    getHold(id){
        return this.findById(id).populate({path: "user",select: "-password"}).exec()
    }
}

module.exports = mongoose.model("Hold",HoldSchema)