import WorkModel from './../model/WordModel'
import SubtaskModel from './../model/SubTaskModel'
import NotificationModel from './../model/NotificationModel'

let createNewWork = (item)=>{
    return new Promise(async (resolve,reject)=>{
        const createNew = await WorkModel.createNew(item)
        if(!createNew){
            return reject("Tạo work mới thất bại")
        }
    
        if(item.users.length > 0){
            let addNotif = item.users.map(async user =>{
                const newNotif = {
                    notifType: "add_work",
                    content: "đã thêm bạn vào một công việc mới",
                    sendUser: item.account,
                    tourId: createNew._id,
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
        return resolve(createNew)
    })
}

let findAllWorkById = (userId) =>{
    return new Promise(async (resolve,reject) =>{
        const getAll = await WorkModel.findAllWork(userId)
        if(!getAll){
            return reject("lấy danh sách công việc thất bại. vui lòng thử lại")
        }
        resolve(getAll)
    })
}

let updateDealine = (item) => {
    return new Promise(async (resolve,reject) =>{
        const updateTime = await WorkModel.updateDeadline(item)
        if(!updateTime){
            return reject("update deadline that bai")
        }
        return resolve("update deadline thanh cong")
    })
}

let addSubTask = (workId,taskTitle) =>{
    return new Promise(async (resolve,reject) =>{
        const findWork = await WorkModel.findWorkById(workId)
        if(!findWork){
            return reject("Không tìm thấy công việc này")
        }
        const item = {
            sub_title: taskTitle,
            work: workId
        }
        const createNewTask = await SubtaskModel.createNewSubTask(item)
        if(!createNewTask){
            return reject("thêm task mới thất bại. vui lòng thử lại")
        }
        findWork.subs = findWork.subs.concat(createNewTask._id)
        findWork.save()
        return resolve(createNewTask)
    })
}

let changeStatus = (data) =>{
    return new Promise(async (resolve,reject) =>{
        const updateStatusSubTask = await SubtaskModel.updateStatus(data.subTaskId,data.status)
        if(!updateStatusSubTask){
            return reject("change status subtask failed")
        }
        const findWork = await WorkModel.findByIdAndPopulate(data.workId)
        if(!findWork){
            return reject("khong tim thay thông tin công việc")
        }
        return resolve(findWork)
    })
}


let addUserWork = (userId,workId,accountId) =>{
    return new Promise(async (resolve,reject) =>{
        const findWork = await WorkModel.findWorkById(workId)
        if(!findWork){
            return reject("không tìm thấy dữ liệu của công việc")
        }
        if(!findWork.users.includes(userId)){
            findWork.users = findWork.users.concat(userId)
            findWork.save()

            const newNotif = {
                notifType: "add_work",
                content: "đã thêm bạn vào một công việc mới",
                sendUser: accountId,
                tourId: workId,
                receviceUser : userId
            }
            const createNewNotif = await NotificationModel.createNew(newNotif)
            if(!createNewNotif){
                return reject("tạo thông báo thất bại")
            }
            return resolve("thêm thành viên vào công việc thành công")
        }else{
            return reject("Thành viên đã được thêm vào công việc này rồi")
        }
    })
}

let removeUserToWork = (userId,workId) =>{
    return new Promise(async (resolve,reject) =>{
        const findWork = await WorkModel.findWorkById(workId)
        if(!findWork){
            return reject("không tìm thấy dữ liệu của công việc")
        }
        if(findWork.users.includes(userId)){
            findWork.users = findWork.users.filter(user => !user.equals(userId))
            findWork.save()
            return resolve("remove success")
        }else{
            return reject("thành viên này chưa có trong công việc nên k thể xoá được. vui lòng thử lại")
        }
    })
}

module.exports = {
    createNewWork:createNewWork,
    findAllWorkById:findAllWorkById,
    updateDealine:updateDealine,
    addSubTask:addSubTask,
    changeStatus:changeStatus,
    addUserWork:addUserWork,
    removeUserToWork:removeUserToWork
}