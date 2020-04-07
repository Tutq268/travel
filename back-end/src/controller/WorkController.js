import {work} from './../services/index'
import WorkModel from './../model/WordModel'
let addNewWork = async (req,res)=>{
    try {
        const item = req.body
        item.account = req.user._id
        const newWork = await work.createNewWork(item)
        return res.json({
            result: "ok",
            message: "tạo công việc mới thành công",
            data: newWork
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let findAllWork = async (req,res)=>{
    try {
        const findAll = await work.findAllWorkById(req.user._id)
        return res.json({
            result: "ok",
            message: "lấy tất cả công việc thành công",
            data: findAll
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let updateDealineWork = async (req,res)=>{
    try {
        const item = req.body
        const updateDealine = await work.updateDealine(item)
        return res.json({
            result: "ok",
            message: updateDealine,
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

let addSubtask = async (req,res) =>{
    const {_id,taskTitle} = req.body
    try {
        const addNewTask = await work.addSubTask(_id,taskTitle)
        return res.json({
            result: "ok",
            message: "add new task success",
            data: addNewTask
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let changeStatusWork = async (req,res) =>{
    try {
        await WorkModel.updateStautsWork(req.body)
        return res.json({
            result: "ok",
            message: "change status work success",
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

let changeStatusSubtask = async (req,res) =>{
    try {
        const changeStatus = await work.changeStatus(req.body)
        return res.json({
            result: "ok",
            message: "change status work success",
            data: changeStatus
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let addUserToWork = async (req,res) =>{
    try {
        const {userId,workId} = req.body
        const accountId = req.user._id
        const addUser =  await work.addUserWork(userId,workId,accountId)
        return res.json({
            result: "ok",
            message: addUser,
            data :null
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

let removeUserToWork = async (req,res) =>{
    try {
        const {userId,workId} = req.body
        const removeUser = await work.removeUserToWork(userId,workId)
        return res.json({
            result: "ok",
            message: removeUser,
            data :null
        })
    } catch (error) {
        return res.json({
            result: "failed",
            message: error,
            data: null
        })
    }
}

module.exports ={
    addNewWork:addNewWork,
    findAllWork:findAllWork,
    updateDealineWork:updateDealineWork,
    addSubtask:addSubtask,
    changeStatusWork:changeStatusWork,
    changeStatusSubtask:changeStatusSubtask,
    addUserToWork:addUserToWork,
    removeUserToWork:removeUserToWork
}