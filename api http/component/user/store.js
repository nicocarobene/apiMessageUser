import User from "./model.js";
import bcrypt from 'bcrypt'
const salt= 10
export async function addUserDB(name, user, password){
    const passwordHash = await bcrypt.hash(password, salt) 
    const myuser= new User({name, user, passwordHash})
    const newUser= await myuser.save()
    console.log(newUser)
    return newUser
}

export const  listOfUserDB =()=>{
    return User.find()
}