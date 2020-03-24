import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const User = mongoose.model("User")

module.exports = (req,res,next) => {
    const { authorization } = req.headers
    if(!authorization){
        return res.status(400).send({error: "You must be logged in."})
    }
    const token = authorization.replace('Bearer ','')
    jwt.verify(token,"SECRET_KEY",async (err,payload) =>{
        if(err){
            return res.status(404).send({error:"You must be logged in."})
        }else{
            console.log(payload)
            const {userId} = payload

            const user = await User.findById(userId)
            req.user = user
            next()
        }
    })
}