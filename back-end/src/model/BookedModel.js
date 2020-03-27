import mongoose from 'mongoose'
const Schema = mongoose.Schema

let BookedSchema = new Schema({
    user : {type: Schema.Types.ObjectId,required: true,ref: "User"},
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

BookedSchema.statics ={
    addNewBooked(item){
        return this.create(item)
    }
}

module.exports = mongoose.model("Booked",BookedSchema)