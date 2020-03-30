import express from 'express'
import {notif} from './../controller/index'
import requireAuth from './../middlewares/requireAuth'
let router = express.Router()

let initNotificationRouter = (app) =>{
    router.get("/get-all",requireAuth,notif.getAllNotif)
    router.put("/read/:notifId",requireAuth,notif.readNotificationItem)
    return app.use("/api/notification",router)
}

module.exports = initNotificationRouter