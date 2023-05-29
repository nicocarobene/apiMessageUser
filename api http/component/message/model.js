import { Schema, model } from "mongoose";

const mySchema= new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chats'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    message: {
        type: String,
        required: true,
    },
    date: Date,
    file: String
}, {
    timestamps: true
})

const Model = model('Messages',mySchema)

export default Model;