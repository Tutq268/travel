import UserModel from './../model/UserModel'

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

module.exports = {
    getAllUser:getAllUser
}