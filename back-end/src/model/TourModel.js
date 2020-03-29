import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)

const TourSchema = new Schema({
    tourname: {type: String,required: true},
    tourtrip: {type: String,default: ""},
    ticketCount: {type: Number,default: 0},
    admin: {type: Schema.Types.ObjectId,ref: "User"},
    tourBookedCount: {type: Number,default:0},
    tourBooked: [{type: Schema.Types.ObjectId,ref: "Booked"}],
    ticketPrice: {type: Number,default: 0},
    tourTime: {type: String,default: ""},
    departureDate: {type: Number,default: null},
    airlines: {type: String,default: ""},
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
        return this.findById(tourId).populate({path: "users",select: "-password"}).exec()
    },
    findTourByIdAndPopulate(tourId){
        return this.findOne({"_id" : tourId}).populate({path: "tourBooked",populate: {path: "user",select: "-password"}}).populate("users","username").exec()
    },
    updateTourInfo(item){
        return this.findByIdAndUpdate(item._id,item).exec()
    }
}

module.exports = mongoose.model("Tour",TourSchema)