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

let getTourDetail = async (req,res)=>{
    const {tourId} = req.params
    try {
        const getTourInfo = await tour.getTourInfo(tourId)
        return res.json({
            result : "ok",
            message: "get data tour detail success",
            data: getTourInfo
        })
    } catch (error) {
        return res.json({
            result : "failed",
            message: error,
            data: null
        })
    }

}

let getMyInfo = async (req,res) =>{
   
    try {
        const myInfo = await tour.getMyInfo(req.user._id)
        return res.json({
            result: "ok",
            message: "get my info success",
            data: myInfo
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let logout = (req,res)=>{
    return res.json({
        result: "ok",
        message : "đăng xuất thành công",
        data: null
    })
}

let editTourInfo = async (req,res)=>{
    try {
        const updateInfoTour = await tour.updateTour(req.body)
        return res.json({
            result: "ok",
            message:"Cập nhật tour thành công",
            data: updateInfoTour
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let setStarTour = async (req,res)=>{
    try {
        const updateStart = await tour.updateStartTour(req.body)
        return res.json({
            result: "ok",
            message:updateStart,
            data: null
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message:error,
            data: null
        })
    }
}
module.exports ={
    getListTour : getListTour,
    getAllUser: getAllUser,
    addNewTour:addNewTour,
    addBookedTour:addBookedTour,
    getTourDetail:getTourDetail,
    getMyInfo:getMyInfo,
    logout:logout,
    editTourInfo:editTourInfo,
    setStarTour:setStarTour
}