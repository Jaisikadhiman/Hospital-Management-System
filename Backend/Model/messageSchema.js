import mongoose, { mongo } from "mongoose"
import validator from  "validator"

const messageSchema= mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name contain atleast 3  characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Lastt name contain atleast 3  characters"]
    },
   email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"provide valid email"]
    },
   phone:{
        type:String,
        required:true,
        minLength:[10,"phone number contain only 10 digits"],
        maxLength:[10,"phone number contain only 10 digits"]
    },
    message:{
        type:String,
        required:true,
        minLength:[15,"message contain atleast 10 characters"],
      
    }
})
export const MessageModel = mongoose.model("MessageModel",messageSchema);