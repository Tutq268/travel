import express from 'express'
import {user} from './../controller/index'
import requireAuth from './../middlewares/requireAuth'
let router = express.Router()

let initUserRouter = (app) =>{
    router.post("/edit-info",requireAuth,user.updateInfoAccount)
    return app.use("/api/user",router)
}

module.exports = initUserRouter