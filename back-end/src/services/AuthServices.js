import UserModel from './../model/UserModel'
import bcrypt from 'bcrypt'
import uuid from 'uuid/v4'

let saltRound = 7
let createAccount = (username,phone,password) =>{
    return new Promise(async (resolve,reject) =>{
       const findByUsername = await UserModel.findByUser(username)
       if(findByUsername){
           return reject("Tài khoản đã tồn tại.")
       }
       let salt = bcrypt.genSaltSync(saltRound)
       let userItem = {
           username: username,
           phone: phone,
           password : bcrypt.hashSync(password,salt)
       }

       let newUser = await UserModel.createNewUser(userItem)
       if(!newUser) return reject({failed: "Tạo tài khoản thất bại"})
       return resolve(newUser)
    })
}

let signInAccount = (username,password) =>{
    return new Promise(async (resolve,reject) =>{
        const findByUsername = await UserModel.findByUser(username)
        if(!findByUsername){
            return reject("Tài khoản không tồn tại")
        }
        const checkPassword = await findByUsername.comparePassword(password)
        if(!checkPassword){
            return reject("Sai mật khẩu")
        }
        return resolve(findByUsername)
    })
}

module.exports = {
    createAccount : createAccount,
    signInAccount: signInAccount
}