import Model from "./model.js"

export function Add(fullMessage){
    const myMessage= new Model(fullMessage)
    myMessage.save()
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