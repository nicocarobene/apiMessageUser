import express from 'express'
import { addMessage, deleteUser, getMessage, updateMessage } from './controller.js'
import {success, error} from '../../network/response.js'
const message = express.Router()

message.get('/',(req,resp)=>{
    const {user}=req.query || null
    getMessage(user)
    .then(messageList=>{
        success(req,resp, messageList, 200)
    })
    .catch(e=>{
        error(req,resp, 'Unexpected Error', 500, e)
    })
})

message.post('/',(req,resp)=>{
    addMessage(req.body.user, req.body.message)
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
    deleteUser(id)
        .then((user)=>{
            success(req,resp, `Usuario ${user} eliminado`, 201)
        })
        .catch(e=>{
            error(req,resp, 'Error interno',500, e)
        })
})
export default message