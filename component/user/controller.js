import { addUserDB } from "./store.js";

export function addUser(name, user, password){
    return new Promise(async (resolve, reject)=>{
    if(!name || !user || !password){
        return reject('Date was wrong')
    }
    const newUser= await addUserDB(name, user, password)
    resolve(newUser)
})
}