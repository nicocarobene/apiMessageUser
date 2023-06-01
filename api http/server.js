import express from 'express'
import http from 'http'
import cors from 'cors'
import { routes } from './network/routes.js'
import connect from './db.js'
import { connectWS, socket } from './socket.js'
import { PORT } from './config.js'

connect()

const app= express()
const server= http.createServer(app)

app.use(express.json())
app.use(cors())

routes(app)

const serverHTTP = server.listen(PORT,()=>console.log(`Server listten in PORT ${PORT}`))
connectWS(serverHTTP)

socket.io.on('connection',(socket)=>{console.log('Usuario connected', socket.id)})