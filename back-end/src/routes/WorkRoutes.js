import express from 'express'
import {work} from './../controller/index'
import requireAuth from './../middlewares/requireAuth'
let router = express.Router()

let initWorkRouter = (app) =>{
    router.post("/add-new",requireAuth,work.addNewWork)
    return app.use("/api/work",router)
}

module.exports = initWorkRouter