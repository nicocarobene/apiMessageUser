import express from 'express'
import multer from 'multer'
import { addMessage, deleteMessageUser, getMessage, updateMessage } from './controller.js'
import {success, error} from '../../network/response.js'
import { config } from 'dotenv'

const message = express.Router()

const upload= multer({
    dest:'public/files/'
})

message.get('/',(req,resp)=>{
    const {chat} =req.query || null
    getMessage(chat)
    .then(messageList=>{
        success(req,resp, messageList, 200)
    })
    .catch(e=>{
        error(req,resp, 'Unexpected Error', 500, e)
    })
})

message.post('/',upload.single('file') ,(req,resp)=>{
    const {file}= req
    const { user, message, chat}= req.body
    addMessage(user, message, chat, file)
    .then((fullMessage)=>{
        success(req, resp, fullMessage, 201);
    })
    .catch(e=>{
        error(req,resp,'Informacion invalidad', 400, 'Error en el controlador')
    })
})

message.patch('/:id',(req,resp)=>{
    const {id}= req.params
    const { message } =req.body
    updateMessage(id, message)
        .then(data=>{
            success(req,resp, data, 200)
        })
        .catch(e=>{
            error(req,resp, 'Error interno',500, e)
        })
})
message.delete('/:id',(req,resp)=>{
    const {id}= req.params
    deleteMessageUser(id)
        .then(({user,message})=>{
            success(req,resp, `Message of ${user} was deleted` + `${message}`, 201)
        })
        .catch(e=>{
            error(req,resp, 'Error interno',500, e)
        })
})
export default message