import WorkModel from './../model/WordModel'
import SubtaskModel from './../model/SubTaskModel'

let createNewWork = (item)=>{
    return new Promise(async (resolve,reject)=>{
        const createNew = await WorkModel.createNew(item)
        if(!createNew){
            return reject("Tạo work mới thất bại")
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

module.exports = {
    createNewWork:createNewWork,
    findAllWorkById:findAllWorkById,
    updateDealine:updateDealine,
    addSubTask:addSubTask,
    changeStatus:changeStatus
}