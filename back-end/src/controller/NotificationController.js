import {notif} from './../services/index'
let getAllNotif = async (req,res) =>{
    try {
        const allNotif = await notif.getAllNotification(req.user._id)
        return res.json({
            result: "ok",
            message: "lấy danh sách thông báo thành công",
            data: allNotif
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let readNotificationItem = async (req,res)=>{
    const {notifId} = req.params
    
    try {

        const updateReadNotif = await notif.updateReadNotif(notifId)
        return res.json({
            result: "ok",
            message: updateReadNotif,
            data: null
        })
    } catch (error) {
        return res.json({
            result: "ok",
            message: error,
            data: null
        })
    }
}

module.exports = {
    getAllNotif:getAllNotif,
    readNotificationItem:readNotificationItem
}