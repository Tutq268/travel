import UserModel from './../model/UserModel'
import TourModel from './../model/TourModel'
import BookedModel from './../model/BookedModel'
let getAllUser = () =>{
    return new Promise(async (resolve,reject) =>{
        const getUser = await UserModel.findAllUser()
        if(!getUser){
            return reject("Lấy user thất bại")
        }else{
            return resolve(getUser)
        }
    })
}

let addNewTour = data =>{
    return new Promise(async (resolve,reject) =>{
        const addNew = await TourModel.createNewTour(data)
        if(!addNew){
            return reject("Thêm tour mới thất bại")
        }
        return resolve(addNew)
    })
}

let getAllTour = (userId) =>{
    return new Promise(async (resolve,reject) =>{
        const getAllTour = await TourModel.getAllTour(userId)
        if(!getAllTour){
            return reject("Lấy tour thất bại")
        }
        return resolve(getAllTour)
    })
}

let updateBookTour = (tourId,countBooked,userId) =>{
    return new Promise(async (resolve,reject) =>{
        const findTour = await TourModel.findTourById(tourId)
        if(findTour.tourBookedCount + (+countBooked) > findTour.ticketCount){
            return reject("Số lượng cần đặt quá lớn. không còn đủ chỗ")
        }
        if(!findTour){
            return reject("Không tìm tháy tour. Vui lòng thử lại")
        }
        const itemBooked = {
            user: userId,
            tour: tourId,
            count: +countBooked
        }
        const newBookedTour = await BookedModel.addNewBooked(itemBooked)
        if(!newBookedTour){
            return reject("Chốt vé thất bại. Vui lòng thử lại")
        }
        findTour.tourBookedCount = findTour.tourBookedCount + (+countBooked)
        findTour.tourBooked = findTour.tourBooked.concat(newBookedTour._id)
        findTour.save()
        return resolve({count: findTour.tourBookedCount,bookedId: newBookedTour._id,tourId: findTour._id})
    })
}

let getTourInfo = (tourId) =>{
    return new Promise(async (resolve,reject) =>{
        const findTour = await TourModel.findTourByIdAndPopulate(tourId)
        if(!findTour){
            return reject("không tìm thấy tour, vui lòng thử lại")
        }
        return resolve(findTour)
    })
}

let getMyInfo = (userId) =>{
    return new Promise(async (resolve,reject) =>{
        const getInfo = await UserModel.findUserById(userId)
        if(!getInfo){
            return reject("Lấy thông tin thất bại")
        }
        return resolve(getInfo)
    })
}

let updateTour = item =>{
    return new Promise(async (resolve,reject) =>{
        const updateTour = await TourModel.updateTourInfo(item)
        if(updateTour.nModified === 0){
            return reject("cập nhật thông tin tour thất bại")
        }else{
            const findTour = await TourModel.findTourById(item._id)
            return resolve(findTour)
        }
    })
}
module.exports = {
    getAllUser:getAllUser,
    addNewTour:addNewTour,
    getAllTour:getAllTour,
    updateBookTour:updateBookTour,
    getTourInfo:getTourInfo,
    getMyInfo:getMyInfo,
    updateTour:updateTour
}