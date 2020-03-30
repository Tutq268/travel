import NotificationModel from './../model/NotificationModel'

let getAllNotification = (userId) =>{
    return new Promise(async (resolve,reject) =>{
        const allNotif = await NotificationModel.findAll(userId)
        if(!allNotif){
            return reject("Lấy danh sách thông báo thất bại. đã xảy ra lỗi")
        }
        return resolve(allNotif)
    })
}
let updateReadNotif = notifId =>{
    return new Promise(async (resolve,reject) =>{
        const updateRead = await NotificationModel.updateRead(notifId)
        if(updateRead.nModified === 0){
            return reject("update read that bai")
        }
        return resolve("update read thanh cong")
        })
}
module.exports ={
    getAllNotification:getAllNotification,
    updateReadNotif:updateReadNotif
}