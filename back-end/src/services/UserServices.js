import UserModel from './../model/UserModel'

let updateInfoAccount = (item,userId) =>{
    return new Promise(async (resolve,reject) =>{
        let updateUser = await UserModel.findByIdAndUpdate(userId,item)
        if(updateUser.nModified === 0){
            return reject("cập nhật thông tin thất bại")
        }
        return resolve("Chinh Sửa Thành Công")
    })
}
module.exports ={
    updateInfoAccount:updateInfoAccount
}