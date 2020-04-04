import WorkModel from './../model/WordModel'

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

module.exports = {
    createNewWork:createNewWork,
    findAllWorkById:findAllWorkById,
    updateDealine:updateDealine
}