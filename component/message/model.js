import { Schema, model } from "mongoose";

const mySchema= new Schema({
    user: String,
    message: {
        type: String,
        required: true,
    },
    date: Date 
})

const Model = model('Messages',mySchema)

export default Model;