import jwt from "jsonwebtoken"
import { SING } from "../../config.js"
import { error } from "../../network/response.js"

export const LoginUser =(req,resp,next)=>{
    const {authorization} = req.headers
    let token = null 
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }

    const decodedToken= jwt.verify(token,SING)
    if(!token || !decodedToken.id){
        return error(req,resp, 'Unexpected Error', 400)
    }
    req.userID= decodedToken.id

    next()
}