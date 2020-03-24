import jwt from 'jsonwebtoken'
import {auth} from './../services/index'
import {validationResult} from "express-validator"


let createAccount = async (req,res)=>{
    let validationError = validationResult(req)
    if(!validationError.isEmpty()){
        return res.json({
            result: "failed",
            message: "Số điện thoại không hợp lệ",
            data: null
        })
     
    }
    const {username,phone,password} = req.body    
    try{
        const create = await auth.createAccount(username,phone,password)
            return res.json({
                result: "ok",
                message: "Tạo tài khoản thành công",
                data: create
            })
        
    }catch(err){
        res.json({
            result: "failed",
            message: err,
            data: null
        })
    }

}

let singInAccount = async (req,res) =>{
    const {username,password} = req.body
    try{
        const signIn = await auth.signInAccount(username,password)
        const token = jwt.sign({userId: signIn._id},"SECRET_KEY")
        const data = {token : token,userId: signIn._id}
        return res.json({
            result: "ok",
            message: "Đăng nhập thành công",
            data: data
        })
    }catch(err){
        return res.json({
            result: "failed",
            message: err,
            data: null
        })
    }
}

module.exports = {
    createAccount : createAccount,
    singInAccount : singInAccount
}