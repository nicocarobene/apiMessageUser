import { Schema, model } from "mongoose";

const userSchema= new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    passwordHash:{
        type: String,
        required: true,
    }
})

const User = model('Users',userSchema)

export default User;