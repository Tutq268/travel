import {tour} from './../services/index'
import TourModel from './../model/TourModel'
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
        const getAllUser = await tour.getAllUser(req.user._id)
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
    const {tourId,countBooked,holdId} = req.body.bookedTour
    const userId = req.user._id
    try {
        const updateBookedTour = await tour.updateBookTour(tourId,countBooked,userId,holdId)
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

let addHoldTour = async (req,res)=>{
    try {
        const {tourId,countHold} = req.body
        const updateHold = await tour.updateHoldTour(tourId,+countHold,req.user._id)
        return res.json({
            result: "ok",
            message: "thanh cong",
            data: updateHold
        })
        
    } catch (error) {
        return res.json({
            result: "failed",
            message:error,
            data: null
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

let getHoldTour = async (req,res) =>{
    try {
        const holdId = req.params.holdId
        const getInfoHold = await tour.getInfoHold(holdId)
        return res.json({
            result: "ok",
            message: "success",
            data: getInfoHold
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let removeTour = async (req,res)=>{
    try {
        const {tourId} = req.body
       await TourModel.removeTour(tourId)
        return res.json({
            result: "ok",
            message: "success",
            data: null
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let bookmarkTour = async (req,res) =>{
    try {
        const {tourId} = req.body
        const item = {
            _id : tourId,
            isBookmark: true
        }
        await TourModel.updateTourInfo(item)
        return res.json({
            result: "ok",
            message: "đánh dấu thành công",
            data: null
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let searchTour = async (req,res)=>{
    const {keyword} = req.params
    const userId = req.user._id
    try {
        const findTourSearch = await tour.findTourSearch(keyword,userId)
        return res.json({
            result: "ok",
            message: "lay tou thanh cong",
            data: findTourSearch
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }    
   
}

let removeHoldTour = async (req,res) =>{
    try {
        const {tourId,holdId} = req.body
        const removeHold = await tour.removeHold(tourId,holdId)
        return res.json({
            result: "ok",
            message: "success",
            data: removeHold
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
    setStarTour:setStarTour,
    addHoldTour:addHoldTour,
    getHoldTour:getHoldTour,
    removeTour:removeTour,
    bookmarkTour:bookmarkTour,
    searchTour : searchTour,
    removeHoldTour:removeHoldTour
}