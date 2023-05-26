import Model from "./model.js"

export function Add(message){
    const myMessage= new Model(message)
    myMessage.save()
}

export async function List(user){
    if(!user){
      const list= await Model.find()
      return list 
    }
    const listUser= await Model.find({user})
    return listUser
}
export async function updateMessage(id, message){
    const foundMessage = await Model.findOne({_id: id})
    console.log(foundMessage)
    foundMessage.message= message
    const newMessage = await foundMessage.save()
    return newMessage
}
export async function deleteUserDB(id){
    const deleteuser = await Model.findByIdAndDelete({ _id : id})
    const {user}= deleteuser
    return user
}