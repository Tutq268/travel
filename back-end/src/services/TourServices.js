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
        if(!findTour){
            return reject("Không tìm tháy tour. Vui lòng thử lại")
        }
        const arrBooked = []
        for(let i =0;i<+countBooked;i++){
            const item ={
                user : userId
            }
            const addNewBooked = await BookedModel.addNewBooked(item)
            if(!addNewBooked){
                return reject("Chốt vé thất bại. vui long thử lại")
            }
            arrBooked.push(addNewBooked._id)
        }
        findTour.tourBooked = findTour.tourBooked.concat(await Promise.all(arrBooked))
        findTour.save()
        return resolve(findTour)
    })
}

module.exports = {
    getAllUser:getAllUser,
    addNewTour:addNewTour,
    getAllTour:getAllTour,
    updateBookTour:updateBookTour
}