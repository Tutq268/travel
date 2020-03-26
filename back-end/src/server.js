import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import initAuthRouter from './routes/AuthRoutes'
import initTourRouter from './routes/TourRoutes'
import connectDB from './config/connectDB'
import requireAuth from './middlewares/requireAuth'
import cors from 'cors'

let app = express()
connectDB()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'true'}))
app.use(cors())

initAuthRouter(app)
initTourRouter(app)
server.listen(8686,(req,res) =>{
    console.log("im listening on Port: 8686")
})