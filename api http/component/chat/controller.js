import { AllChatsDB, addChatDB, listChatsDB } from "./store.js"

export function addChat({users}){
    if(!users || !Array.isArray(users)){
      throw new Error('Invalid user list')
    }
    const chat= {users}
    return addChatDB(chat)
}
export const AllChats=({userID})=>{
  if(!userID)throw new Error('Not valid credential')
  return AllChatsDB({userID})
}

export function listChat({chatID,userID}){
   return listChatsDB({chatID, userID})
}