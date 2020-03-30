import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    notifType: {type: String,default: ""},
    content: {type: String,default: ""},
    sendUser: {type: Schema.Types.ObjectId,ref: "User"},
    tourId: {type: Schema.Types.ObjectId,ref: "Tour"},
    isRead: {type: Boolean,default: false},
    receviceUser: {type: Schema.Types.ObjectId,ref:"User"},
    createAt: {type: Number,default: Date.now()},
    updateAt: {type: Number,default: null}
})

NotificationSchema.statics = {
    createNew(item){
        return this.create(item)
    },
    findByIdAndTour(userId,tourId){
        return this.findOne({
                        $and: [{
                            receviceUser: userId,
                            tourId: tourId
                        }]}).exec()
    },
    findByIdAndType(userId,tourId){
        return this.findOne({
            $and: [{
                receviceUser: userId,
                tourId: tourId,
                notifType : "add_user"
            }]}).exec()
    },
    findAll(userId){
        return this.find({receviceUser: userId}).populate({path: "sendUser",select: "-password"}).exec()
    },
    updateRead(notifId){
        return this.findByIdAndUpdate(notifId,{isRead: true}).exec()
    }
}

export default mongoose.model("Notification",NotificationSchema)