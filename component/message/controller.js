import {Add, List, deleteUserDB, updateMessage as storeUpdate} from './store.js'
export function addMessage(user, message){
    return new Promise((resolve, reject)=>{
        if(!user && !message){
          console.error('[messageController]')
          return reject('Los datos son incorrectos')
        }
        console.log(message)
        const fullMessage= {
            user,
            message,
            date: new Date()
        }
        Add(fullMessage)
        resolve(fullMessage)
    })
}

export function getMessage(user){
    return new Promise((resolve, reject)=>{
        resolve(List(user))
    })
}

export function updateMessage(id,text){
    return new Promise(async (resolve, reject)=>{
        if(!id || !text){
            return reject ('Invalid date')
        }
        const result = await storeUpdate(id, text)
        resolve( result )
    })
}

export function deleteUser(id){
    return new Promise((resolve, reject)=>{
        if(!id){
            return reject ('Invalid credential')
        }
        deleteUserDB(id)
          .then((user)=>resolve(user))
          .catch(e=> reject(e))
    })
}