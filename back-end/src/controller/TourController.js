import {tour} from './../services/index'

let getListTour = async (req,res) =>{
    const userId = req.user._id
    try {
        const allTour = await tour.getAllTour(userId)
        return res.json({
            result: "ok",
            message: "lấy tour thành công",
            data: allTour
        })
    } catch (error) {
       return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let getAllUser = async (req,res) =>{
    try{
        const getAllUser = await tour.getAllUser()
        return res.json({
            result: "ok",
            message: "get user success",
            data: getAllUser
        })
    }catch(err){
        return res.json({
            result: "failed",
            message: err,
            data:null
        })
    }
}

let addNewTour = async (req,res) =>{
    try{
        const addNewTour = await tour.addNewTour(req.body)
        return res.json({
            result: "ok",
            message: "thêm tour thành công",
            data: addNewTour
        })
    }catch(err){
    return res.json({
            result: "failed",
            message: err,
            data: null
            })
    }
}

let addBookedTour = async (req,res) =>{
    const {tourId,countBooked} = req.body.bookedTour
    const userId = req.user._id
    try {
        const updateBookedTour = await tour.updateBookTour(tourId,countBooked,userId)
        return res.json({
            result: "ok",
            message:"Chốt vé thành công",
            data: updateBookedTour
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data:null
        })
    }
}

module.exports ={
    getListTour : getListTour,
    getAllUser: getAllUser,
    addNewTour:addNewTour,
    addBookedTour:addBookedTour
}