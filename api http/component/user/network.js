import express from 'express'
import multer from 'multer'
import {success, error} from '../../network/response.js'
import { addUser, findUser } from './controller.js'
import { listOfUserDB } from './store.js'

const user = express.Router()

const upload= multer({
    dest: 'uploads/'
})
user.get('/',(req,resp)=>{
    listOfUserDB()
    .then(users=>success(req, resp, users, 200))
    .catch(e=>error(req,resp,'Informacion invalidad', 500, 'e'))
})

user.post('/login',(req,resp)=>{
    const {user,password} =req.body
    findUser({user,password})
    .then(user=>success(req, resp, user, 200))
    .catch(e=>error(req,resp,'Informacion invalidad', 500, 'e'))
})

user.post('/', upload.single('file'), (req,resp)=>{
    const {name, user, password, chat}= req.body
    addUser(name,user,password)
    .then((User)=>{
        success(req, resp, User, 201);
    })
    .catch(e=>{
        error(req,resp,'Informacion invalidad', 500, 'Error en el controlador')
    })

})

export default user