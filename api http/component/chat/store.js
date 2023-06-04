import Chat from "./model.js"

export const addChatDB = (chat) => {
    return new Promise((resolve, reject) => {
        if (!chat) return reject('dates was wrong')
        const myChat = new Chat(chat)
        myChat.save()
            .then(newchat => resolve(newchat))
            .catch(e => reject(e))
    })


}

export const AllChatsDB=({userID})=>{
    return new Promise(async(resolve, reject)=>{
        Chat.find({users: userID}).populate('users message',{
            passwordHash:0,
            __v:0,
            chat:0
        })
        .then(chats=>{
            resolve(chats)
        })
        .catch(e=> reject(e))

    })
}

export const listChatsDB = ({ chatID, userID }) => {
    return new Promise(async (resolve, reject) => {
        if (!chatID || !userID) {
            return reject('credential was wrong')
        }
        Chat.findById({ _id: chatID }).populate({
            path: 'message',
            model: 'Messages',
            populate: {
                path: 'user',
                model: 'Users',
                select: 'name user'
            }
        })
            .then(chat => {
                const isUserExist = chat.users.some(user => userID === user.toString())
                if (!isUserExist) {
                    throw new Error('Access is denied')
                }
                resolve(chat)
            })
           .catch(e=>reject(e))

    })
}
