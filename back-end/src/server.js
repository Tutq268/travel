import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import initRouter from './routes/index'

let app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'true'}))


initRouter(app)
server.listen(8686,(req,res) =>{
    console.log("im listening on Port: 8686")
})