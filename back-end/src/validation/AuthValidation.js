import {check} from 'express-validator'

let checkSignUp = [
    check("phone","Nhập sai số điện thoại").matches(/^(0)[0-9]{9,10}$/).isLength({min: 10,max: 11})
]

module.exports={
    checkSignUp: checkSignUp
}