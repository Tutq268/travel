import express from 'express'
import WordController from './../controller/WordController'
require("dotenv").config()
let router = express.Router()

let initRouter = (app) =>{
    router.get("/test",WordController.getAllWord)
    router.get("/add-new",WordController.addNewWord)
    router.get("/edit-word",WordController.editWord)

    return app.use("/",router)
}

module.exports = initRouter