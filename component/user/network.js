import express from 'express'
import {success, error} from '../../network/response.js'
import { addUser } from './controller.js'

const user = express.Router()
user.get('/')
user.post('/',(req,resp)=>{
    const {name, user, password}= req.body
    addUser(name,user,password)
    .then((User)=>{
        success(req, resp, User, 201);
    })
    .catch(e=>{
        error(req,resp,'Informacion invalidad', 500, 'Error en el controlador')
    })

})

export default user