import { Schema, model } from "mongoose";

const mySchema= new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chats',
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type:Date,
        required:true
    },
    file: String
}, {
    timestamps: true
})

const Model = model('Messages',mySchema)

export default Model;