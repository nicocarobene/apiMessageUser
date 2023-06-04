import { socket } from '../../socket.js'
import { Add, List, deleteMessageUserDB, updateMessage as storeUpdate } from './store.js'

export function addMessage(userID, message, chat, file) {
    return new Promise((resolve, reject) => {
        if (!userID || !chat || !message) {
            console.error('[messageController] No hay chat usuario o mensaje')
            return reject('Los datos son incorrectos')
        }

        const fileUrl = file ? 'http://localhost:3060/app/files/' + file.filename : null

        const fullMessage = fileUrl
            ? {
                chat,
                user: userID,
                message,
                date: new Date(),
                file: fileUrl
            }
            : {
                chat,
                user: userID,
                message,
                date: new Date()
            }
        Add(fullMessage)
            .then(newMessage => { 
                socket.io.emit('message', newMessage)
                resolve(newMessage) 
            })
            .catch(e=> {console.log(e)})
    })
}

export function getMessage(chat) {
    return new Promise((resolve, reject) => {
        //req.query.chat === filterMessage
        resolve(List(chat))
    })
}

export function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            return reject('Invalid date')
        }
        const result = await storeUpdate(id, message)
        resolve(result)
    })
}

export function deleteMessageUser(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject('Invalid credential')
        }
        deleteMessageUserDB(id)
            .then(({ user, message }) => resolve({ user, message }))
            .catch(e => reject(e))
    })
}