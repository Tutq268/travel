import UserModel from './../model/UserModel'
import TourModel from './../model/TourModel'
import BookedModel from './../model/BookedModel'
import NotificationModel from './../model/NotificationModel'
import HoldModel from './../model/HoldModel'
let getAllUser = (userId) =>{
    return new Promise(async (resolve,reject) =>{
        const getUser = await UserModel.findAllUser()
        if(!getUser){
            return reject("Lấy user thất bại")
        }else{
         const filterUser = getUser.filter(user => !user._id.equals(userId))
            return resolve(filterUser)
        }
    })
}

let addNewTour = data =>{
    return new Promise(async (resolve,reject) =>{
        const addNew = await TourModel.createNewTour(data)
        if(!addNew){
            return reject("Thêm tour mới thất bại")
        }
        else{
            if(data.users.length >0){
                let addNotif = data.users.map(async user =>{
                    const newNotif = {
                        notifType: "add_user",
                        content: "đã thêm bạn vào một tour mới",
                        sendUser: data.admin,
                        tourId: addNew._id,
                        receviceUser : user
                    }
                    const createNewNotif = await NotificationModel.createNew(newNotif)
                    if(!createNewNotif){
                        return reject("Thêm thông báo thất bại")
                    }
                    return createNewNotif
                })
                await Promise.all(addNotif)
            }
            return resolve(addNew)
        }
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

let updateBookTour = (tourId,countBooked,userId,holdId) =>{
    return new Promise(async (resolve,reject) =>{
        const findTour = await TourModel.findTourById(tourId)
        if(holdId){
            const removeHold = await HoldModel.removeHold(holdId)
            if(removeHold.n ===0){
                return reject("Chốt tour thất bại do k update được số tour đang giữ")
            }
            const newTourHold = findTour.tourHold.filter(hold => !hold.equals(holdId))
            findTour.tourHold = newTourHold
            findTour.save()
        }
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
        if(!userId.equals(findTour.admin)){
            const newNotifAdd = {
                notifType: "booked_ticket",
                content: `đã chốt được ${countBooked} chỗ trong tour ${findTour.tourname}`,
                sendUser: userId,
                tourId: findTour._id,
                receviceUser : findTour.admin
            }
            await NotificationModel.createNew(newNotifAdd)
        }
        if(findTour.users.length > 0){
            const pushNotifBookedTicket = findTour.users.map(async user =>{
                if(!userId.equals(user._id)){
                    const newNotifAdd = {
                        notifType: "booked_ticket",
                        content: `đã chốt được ${countBooked} trong tour ${findTour.tourname}`,
                        sendUser: userId,
                        tourId: findTour._id,
                        receviceUser : user._id
                    }
                    const addNewNotif = await NotificationModel.createNew(newNotifAdd)
                    if(!addNewNotif){
                        return reject("Chỉnh sửa thêm user thất bại")
                    }
                    return addNewNotif
                }
            })
            await Promise.all(pushNotifBookedTicket)
        }
        return resolve({count: findTour.tourBookedCount,bookedId: newBookedTour._id,tourId: findTour._id,tourHold: findTour.tourHold})
    })
}

const updateHoldTour = (tourId,count,userId) =>{
    return new Promise(async (resolve,reject) =>{
        const findTour = await TourModel.findTourById(tourId)
        if(!findTour){
            return reject("Không tìm thấy tour")
        }
        if(findTour.tourBookedCount + count > findTour.ticketCount){
            return reject("Không còn chỗ để giữ vé")
        }
        const itemHoldTour = {
            user :userId,
            tour: tourId,
            count: count
        }
        const createNewHoldTour = await HoldModel.addNewHold(itemHoldTour)
        if(!createNewHoldTour){
            return reject("Giữ vé thất bại")
        }
        findTour.tourHold = findTour.tourHold.concat(createNewHoldTour._id)
        findTour.save()
        if(!userId.equals(findTour.admin)){
            const newNotifAdd = {
                notifType: "hold_ticket",
                content: `đã giữ ${count} chỗ trong tour ${findTour.tourname}`,
                sendUser: userId,
                tourId: findTour._id,
                receviceUser : findTour.admin
            }
            await NotificationModel.createNew(newNotifAdd)
        }
        if(findTour.users.length > 0){
            const pushNotifHoldTicket = findTour.users.map(async user =>{
                if(!userId.equals(user._id)){
                    const newNotifAdd = {
                        notifType: "hold_ticket",
                        content: `đã giữ ${count} chỗ trong tour ${findTour.tourname}`,
                        sendUser: userId,
                        tourId: findTour._id,
                        receviceUser : user._id
                    }
                    const addNewNotif = await NotificationModel.createNew(newNotifAdd)
                    if(!addNewNotif){
                        return reject("Chỉnh sửa thêm user thất bại")
                    }
                    return addNewNotif
                }
            })
            await Promise.all(pushNotifHoldTicket)
        }
        return resolve(createNewHoldTour)

    })
}
let getInfoHold = holdId =>{
    return new Promise(async (resolve,reject)=>{
        const getHoldInfo = await HoldModel.getHold(holdId)
        if(!holdId){
            return reject("get hold tour failed")
        }
        return resolve(getHoldInfo)
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
            if(findTour.users.length > 0){
                const pushNotifEditAddUser = findTour.users.map(async user =>{
                    const checkNotifUser = await NotificationModel.findByIdAndType(user._id,findTour._id)
                    if(!checkNotifUser){
                        const newNotifAdd = {
                            notifType: "add_user",
                            content: "đã thêm bạn vào một tour mới",
                            sendUser: findTour.admin,
                            tourId: findTour._id,
                            receviceUser : user._id
                        }
                    const addNewNotif = await NotificationModel.createNew(newNotifAdd)
                    if(!addNewNotif){
                        return reject("Chỉnh sửa thêm user thất bại")
                    }
                    return addNewNotif
                    }
                })
                await Promise.all(pushNotifEditAddUser)
            }
            return resolve(findTour)
        }
    })
}

let updateStartTour = data =>{
    return new Promise(async (resolve,reject)=>{
        const updateStart = await TourModel.updateTourInfo(data)
        if(!updateStart){
            return reject("xét ưu tiên thất bại")
        }else{
            return resolve("xét ưu tiên thành công")
        }
    })
}

let findTourSearch = (keyword,userId) =>{
    return new Promise(async (resolve,reject) =>{
        const findTour = await TourModel.findTourByKeyword(keyword,userId)
        if(!findTour){
            return reject("không tìm thấy tour nào hết")
        }
        return resolve(findTour)
    })
}

module.exports = {
    getAllUser:getAllUser,
    addNewTour:addNewTour,
    getAllTour:getAllTour,
    updateBookTour:updateBookTour,
    getTourInfo:getTourInfo,
    getMyInfo:getMyInfo,
    updateTour:updateTour,
    updateStartTour:updateStartTour,
    updateHoldTour:updateHoldTour,
    getInfoHold:getInfoHold,
    findTourSearch:findTourSearch
}