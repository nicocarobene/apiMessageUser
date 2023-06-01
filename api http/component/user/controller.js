import jwt from "jsonwebtoken";
import { addUserDB, findUserDB } from "./store.js";
import { SING } from "../../config.js";

export function addUser(name, user, password){
    return new Promise(async (resolve, reject)=>{
    if(!name || !user || !password){
        return reject('Date was wrong')
    }
    const newUser= await addUserDB(name, user, password)
    resolve(newUser)
})
}

export const findUser =({user,password})=>{
    return new Promise((resolve,reject)=>{
        if(!user || !password){
            return reject('Date user or password is missing')
        }
        findUserDB({user,password})
        .then(userFind=>{
            const tokenForUser= {
                id: userFind._id,
                username: userFind.username
            }
            const token= jwt.sign(tokenForUser, SING,{
                expiresIn: 60*60*24*7
            })
            resolve({
                token,
                user: userFind.username,
                message: [],
                chat:[]
            })
        })
        .catch(e=>reject(e))
    })
}