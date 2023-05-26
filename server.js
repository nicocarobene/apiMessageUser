import express from 'express'
import dotenv from 'dotenv'
import { routes } from './network/routes.js'
import connect from './db.js'
dotenv.config()
connect()
const app= express()

app.use(express.json())

routes(app)

const PORT= process.env.PORT || 3001

app.listen(PORT,()=>console.log(`Server listten in PORT ${PORT}`))