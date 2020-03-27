import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TourSchema = new Schema({
    tourname: {type: String,required: true},
    tourtrip: {type: String,default: ""},
    ticketCount: {type: Number,default: 0},
    admin: {type: Schema.Types.ObjectId,ref: "User"},
    tourBooked: [{type: Schema.Types.ObjectId,ref: "User"}],
    ticketPrice: {type: Number,default: 0},
    tourTime: {type: String,default: ""},
    departureDate: {type: Number,default: null},
    users: [{type: Schema.Types.ObjectId,ref: "User"}],
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

TourSchema.statics ={
    createNewTour(item){
        return this.create(item)
    },
    getAllTour(userId){
        return this.find({
                $or: [
                    {"admin" : userId},
                    {"users" : {$in :[userId]}}
                ]
            }).populate({path: "users",select: "-password"}).exec()
    },
    updateBookedTour(tourId,count){
        return this.findByIdAndUpdate(tourId,{tourBooked: count})
    },
    findTourById(tourId){
        return this.findById(tourId).exec()
    }
}

module.exports = mongoose.model("Tour",TourSchema)