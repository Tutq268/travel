import {user} from './../services/index'

let updateInfoAccount = async (req,res) =>{
    try {
        const item = req.body
        const updateInfo = await user.updateInfoAccount(item,req.user._id)
        return res.json({
            result: "ok",
            message: updateInfo,
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

module.exports={
    updateInfoAccount:updateInfoAccount
}