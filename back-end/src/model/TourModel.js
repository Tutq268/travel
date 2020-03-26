import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TourSchema = new Schema({
    tourname: {type: String,required: true},
    tourtrip: {type: String,default: ""},
    ticketCount: {type: Number,default: 0},
    tourHold: [{type: Schema.Types.ObjectId,ref: "User"}],
    tourBooked: [{type: Schema.Types.ObjectId,ref: "User"}],
    ticketPrice: {type: Number,default: 0},
    tourTime: {type: String,default: ""},
    departureData: {type: Number,default: null},
    users: [{type: Schema.Types.ObjectId,ref: "User"}],
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

TourSchema.statics ={

}

module.exports = mongoose.model("Tour",TourSchema)