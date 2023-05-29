import Chat from "./model.js"

export const addChatDB= (chat) => {
    return new Promise((resolve, reject)=>{
      if(!chat) return reject('dates was wrong')
      const myChat= new Chat(chat)
      myChat.save()
       .then(newchat=> resolve(newchat))
       .catch(e=>reject(e))
    })
   

}
export const listChatsDB=(userId)=>{
    return new Promise((resolve,reject)=>{
        if(!userId){
            return reject('credential was wrong')
        }
        Chat.find({_id: userId }).populate('users', {
            passwordHash:0,
            __v:0,
            message: 0
        })
          .then(chats=>resolve(chats))
          .catch(e=>reject(e))
    })
}
