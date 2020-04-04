import {work} from './../services/index'
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

module.exports ={
    addNewWork:addNewWork,
    findAllWork:findAllWork,
    updateDealineWork:updateDealineWork
}