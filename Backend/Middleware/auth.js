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




// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.authenticateUser = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(401).json({ message: "Access Denied" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id);
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid Token" });
//     }
// };

// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Forbidden: Access Denied" });
//         }
//         next();
//     };
// };
