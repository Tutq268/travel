import blueBird from 'bluebird'
import mongoose from 'mongoose'
require("dotenv").config()
let connectDB = () =>{
    mongoose.Promise = blueBird

    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

    return mongoose.connect(URI,{useNewUrlParser:true})
}
module.exports = connectDB