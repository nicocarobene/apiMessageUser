import express from 'express'
import {success, error} from '../../network/response.js'
import {addChat, listChat} from './controller.js'
const chat = express.Router()

chat.post('/', (req,resp)=>{
    const { users }= req.body
    addChat({users})
      .then(chatDB=>{
        console.log({chatDB})
        success(req, resp, chatDB, 201)
      })
      .catch(e=> error(req,resp,'Internal error', 500, e))
})

chat.get('/:userId', (req,resp)=>{
    const {userId}= req.params
    listChat(userId)
    .then(users=>{
        success(req,resp, users, 200)
    })
    .catch(e=>{
        error(req,resp,'Internal Error', 500, err)
    })
})
export default chat