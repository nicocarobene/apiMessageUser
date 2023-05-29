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
    message:[{
        type: Schema.Types.ObjectId,
        ref: 'Messages'
    }],
    passwordHash:{
        type: String,
        required: true,
    }
})

const User = model('Users', userSchema)

export default User;