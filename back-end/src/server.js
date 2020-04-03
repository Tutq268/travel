import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import initAuthRouter from './routes/AuthRoutes'
import initTourRouter from './routes/TourRoutes'
import initUserRouter from './routes/UserRoutes'
import initWorkRouter from './routes/WorkRoutes'
import initNotificationRouter from './routes/NotificationRoutes'
import connectDB from './config/connectDB'
import cors from 'cors'

let app = express()
connectDB()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'true'}))
app.use(cors())

initAuthRouter(app)
initTourRouter(app)
initUserRouter(app)
initNotificationRouter(app)
initWorkRouter(app)
server.listen(8686,(req,res) =>{
    console.log("im listening on Port: 8686")
})