import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)

const TourSchema = new Schema({
    tourname: {type: String,required: true},
    tourtrip: {type: String,default: ""},
    ticketCount: {type: Number,default: 0},
    admin: {type: Schema.Types.ObjectId,ref: "User"},
    tourBookedCount: {type: Number,default:0},
    tourHold: [{type: Schema.Types.ObjectId,ref: "Hold"}],
    tourBooked: [{type: Schema.Types.ObjectId,ref: "Booked"}],
    ticketPrice: {type: Number,default: 0},
    isStar: {type: Boolean,default: false},
    tourTime: {type: String,default: ""},
    departureDate: {type: Number,default: null},
    airlines: {type: String,default: ""},
    note: {type: String,default: ""},
    isBookmark: {type: Boolean,default: false},
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
            $and: [{
                $or: [
                    {"admin" : userId},
                    {"users" : {$in :[userId]}}
                ]
            },{"isBookmark": false}]
            }).sort({createAt: -1,isStar: -1})
              .populate({path: "users",select: "-password"})
              .exec()
    },
    updateBookedTour(tourId,count){
        return this.findByIdAndUpdate(tourId,{tourBooked: count})
    },
    findTourById(tourId){
        return this.findById(tourId).populate({path: "users",select: "-password"}).exec()
    },
    findByIdNoPopulate(tourId){
        return this.findById(tourId).exec()
    },
    findTourByIdAndPopulate(tourId){
        return this.findOne({"_id" : tourId})
                    .populate({path: "tourBooked",populate: {path: "user",select: "-password"}})
                    .populate("users","username").exec()
    },
    updateTourInfo(item){
        return this.findByIdAndUpdate(item._id,item).exec()
    }
}

module.exports = mongoose.model("Tour",TourSchema)