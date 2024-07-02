import mongoose from "mongoose"
import { MessageModel } from "../Model/messageSchema.js"
import { CatchAsyncError } from "../Middleware/CatchAsyncMiddleware.js"
import ErrorHandler from "../Middleware/errorMiddleware.js"
const messageController=CatchAsyncError(async (req,resp,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;
    if(!firstName||!lastName||!email||!phone||!message){
       return next(new ErrorHandler("fill all details",404))
    }
await MessageModel.create({firstName,lastName,email,phone,message});
resp.status(200).json({
    success:true,
    message:"message send successfully"
})
})
export default messageController;