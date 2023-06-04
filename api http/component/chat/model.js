import { Schema, model } from "mongoose";
const chatSchema= new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    message: [{
        type: Schema.Types.ObjectId,
        ref: 'Messages'
    }]
})

const Chat= new model('Chats', chatSchema)
export default Chat