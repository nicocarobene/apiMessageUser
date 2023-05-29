import Chat from "./model.js"
import { addChatDB, listChatsDB } from "./store.js"

export function addChat({users}){
    if(!users || !Array.isArray(users)){
      throw new Error('Invalid user list')
    }
    const chat= {users}
    return addChatDB(chat)
}


export function listChat(userId){
   return listChatsDB(userId)
}