import Chat from "../chat/model.js"
import User from "../user/model.js"
import Model from "./model.js"

export async function Add(fullMessage){
    const{ chat, user }= fullMessage

    const myMessage= new Model(fullMessage)
    const userDB= await  User.findById({_id: user})
    const chatDB= await Chat.findById({_id: chat})
    const chatIsAlreadyExist= userDB.chat.some(chat=> chat.toString() === chatDB._id.toString())
    if(!chatIsAlreadyExist){
        userDB.chat= userDB.chat.concat(chatDB._id)
    }

    userDB.message= userDB.message.concat(myMessage._id)
    chatDB.message= userDB.message.concat(myMessage._id)

    await myMessage.save()
    await userDB.save()
    await chatDB.save()
    return myMessage
}

export async function List(chat){
    const filterMessage= chat ? {chat} : {}
    console.log(chat)
    const listUser= await Model.find( filterMessage ).populate('user',{
        message: 0,
        passwordHash:0
    })
    return listUser
}
export async function updateMessage(id, message){
    const foundMessage = await Model.findOne({_id: id})
    console.log(foundMessage)
    foundMessage.message= message
    const newMessage = await foundMessage.save()
    return newMessage
}
export async function deleteMessageUserDB(id){
    const deleteuser = await Model.findByIdAndDelete({ _id : id})
    const {user, message}= deleteuser
    return {user, message}
}