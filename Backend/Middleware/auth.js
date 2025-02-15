// import jwt from "jsonwebtoken"
// import { CatchAsyncError } from "./CatchAsyncMiddleware.js"
// import ErrorHandler from "./errorMiddleware.js";
// import { UserModel } from "../Model/UserSchema.js";
// export const isAdminAuth=CatchAsyncError(async (req,resp,next)=>{
//     const token= req.cookies.AdminToken;
//     if(!token){
//         return next(new ErrorHandler("Admin not authenticated",400))
//     }
//     const verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
//    req.user=await UserModel.findById(verify.id);
//    if(req.user.role !== "Admin"){
//     return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`,400))
//    }
//     next();
// })
// export const isPatientAuth=CatchAsyncError(async (req,resp,next)=>{
//     const token= req.cookies.PatientToken;
//     if(!token){
//         return next(new ErrorHandler("Patient not authenticated",400))
//     }
//     const verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
//    req.user=await UserModel.findById(verify.id);
//    if(req.user.role !== "Patient"){
//     return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`,400))
//    }
//     next();
// })


import jwt from "jsonwebtoken";
import { CatchAsyncError } from "./CatchAsyncMiddleware.js";
import ErrorHandler from "./errorMiddleware.js";
import { UserModel } from "../Model/UserSchema.js";

export const authenticateUser = CatchAsyncError(async (req, res, next) => {
    // Extract token from headers
    console.log("honeyyyyyy");
    const token = req.headers.authorization?.split(" ")[1];
    console.log("authenticateUser tokeb:::::::::", token);
    if (!token) {
        return next(new ErrorHandler("Access Denied: No token provided", 401));
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch user from database
    req.user = await UserModel.findById(decoded.id);
    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }

    next();
});
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Access Denied: ${req.user.role} is not authorized`, 403)
            );
        }
        next();
    };
};
