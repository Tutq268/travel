import express from 'express'
import {user} from './../controller/index'
import requireAuth from './../middlewares/requireAuth'
let router = express.Router()

let initUserRouter = (app) =>{
    
    return app.use("/api/user",requireAuth,user.updateInfoAccount)
}

module.exports = initUserRouter