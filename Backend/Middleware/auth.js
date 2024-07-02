import jwt from "jsonwebtoken"
import { CatchAsyncError } from "./CatchAsyncMiddleware.js"
import ErrorHandler from "./errorMiddleware.js";
import { UserModel } from "../Model/UserSchema.js";
export const isAdminAuth=CatchAsyncError(async (req,resp,next)=>{
    const token= req.cookies.AdminToken;
    if(!token){
        return next(new ErrorHandler("Admin not authenticated",400))
    }
    const verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
   req.user=await UserModel.findById(verify.id);
   if(req.user.role !== "Admin"){
    return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`,400))
   }
    next();
})
export const isPatientAuth=CatchAsyncError(async (req,resp,next)=>{
    const token= req.cookies.PatientToken;
    if(!token){
        return next(new ErrorHandler("Patient not authenticated",400))
    }
    const verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
   req.user=await UserModel.findById(verify.id);
   if(req.user.role !== "Patient"){
    return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`,400))
   }
    next();
})