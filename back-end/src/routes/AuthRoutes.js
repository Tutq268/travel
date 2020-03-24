import express from 'express'
import {auth} from './../controller/index'
import requireAuth from './../middlewares/requireAuth'
import {authValid} from './../validation/index'
let router = express.Router()

let authRouter = (app) =>{
    router.post("/signup",authValid.checkSignUp,auth.createAccount)
    router.post("/signin",auth.singInAccount)
    return app.use("/api/auth",router)
}
export default authRouter