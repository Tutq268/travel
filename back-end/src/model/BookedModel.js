import mongoose from 'mongoose'
const Schema = mongoose.Schema

let BookedSchema = new Schema({
    user : {type: Schema.Types.ObjectId,required: true,ref: "User"},
    count: {type: Number,default :0},
    tour: {type: Schema.Types.ObjectId,ref: "Tour",required: true},
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

BookedSchema.statics ={
    addNewBooked(item){
        return this.create(item)
    }
}

module.exports = mongoose.model("Booked",BookedSchema)