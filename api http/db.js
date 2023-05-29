import mongoose from "mongoose"
import { DB_CONECT } from "./config.js"

export default async function connect(){
   try {
      await mongoose.connect(DB_CONECT,{
         useNewUrlParser: true,
       })
       console.log('[db] Conection succesfull')
   } catch (error) {
      console.log(error)
   } 
}


