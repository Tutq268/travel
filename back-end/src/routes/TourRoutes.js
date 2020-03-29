import express from 'express'
import {tour} from './../controller/index'
import requireAuth from './../middlewares/requireAuth'
let router = express.Router()

let initTourRouter = (app) =>{
    router.get("/get-list",requireAuth,tour.getListTour)
    router.get("/all-user",requireAuth,tour.getAllUser)
    router.post("/add-new",requireAuth,tour.addNewTour)
    router.post("/booked-tour",requireAuth,tour.addBookedTour)
    router.get("/tour-detail/:tourId",requireAuth,tour.getTourDetail)
    router.get("/get-me",requireAuth,tour.getMyInfo)
    router.get("/logout",requireAuth,tour.logout)
    router.post("/edit-tour",requireAuth,tour.editTourInfo)
    return app.use("/api/tour",router)
}

module.exports = initTourRouter