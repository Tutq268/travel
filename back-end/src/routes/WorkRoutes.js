import express from 'express'
import {work} from './../controller/index'
import requireAuth from './../middlewares/requireAuth'
let router = express.Router()

let initWorkRouter = (app) =>{
    router.post("/add-new",requireAuth,work.addNewWork)
    router.get("/find-all",requireAuth,work.findAllWork)
    router.post("/update-deadline",requireAuth,work.updateDealineWork)
    router.post("/add-subtask",requireAuth,work.addSubtask)
    router.post("/change-status-work",requireAuth,work.changeStatusWork)
    router.post("/change-status-subtask",requireAuth,work.changeStatusSubtask)
    router.post("/add-user",requireAuth,work.addUserToWork)
    router.post("/remove-user",requireAuth,work.removeUserToWork)
    return app.use("/api/work",router)
}

module.exports = initWorkRouter