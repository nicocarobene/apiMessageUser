import express from 'express'
import {success, error} from '../../network/response.js'
import {AllChats, addChat, listChat} from './controller.js'
import { LoginUser } from '../Middleware/LoginUser.js'
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
// img?: string
// notification?: number
// check: boolean
chat.get('/', LoginUser, (req,resp)=>{
    const {userID}= req
    AllChats({userID})
    .then(chats=>{
        const userFriend = chats.map(chat=>{
            const user= chat.users.filter(user=>user._id.toString() !== userID)
            return user
        }).flat()

        const lastMessage= chats.map(chat=>{
            const last= chat.message.length === 0 ? 0 : chat.message.length -1
            return chat.message[last]
        })
        const response = chats.map((chat,index)=>{
            const {updatedAt, message} = lastMessage.at(index)
            return {
                id: chat._id,
                name: userFriend[index].name,
                user: userFriend[index].user,
                date: updatedAt,
                prevmessage: message,
                notification: chat.notification,
                check: chat.check,
                img: chat.img
            }
        })
        success(req,resp, response, 200)
    })
    .catch(e=>{
        error(req,resp,'Internal Error', 500, e)
    })
})

chat.get('/:chatID', LoginUser, (req,resp)=>{
    const {userID}= req
    const {chatID}= req.params
    listChat({chatID,userID})
    .then(users=>{
        success(req,resp, users, 200)
    })
    .catch(e=>{
        error(req,resp,'Internal Error', 500, e)
    })
})
export default chat