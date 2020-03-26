import {tour} from './../services/index'

let getListTour = async (req,res) =>{
    return res.json("123")
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

module.exports ={
    getListTour : getListTour,
    getAllUser: getAllUser
}