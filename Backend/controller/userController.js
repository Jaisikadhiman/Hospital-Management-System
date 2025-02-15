import { CatchAsyncError } from "../Middleware/CatchAsyncMiddleware.js"
import ErrorHandler from "../Middleware/errorMiddleware.js"
import { UserModel } from "../Model/UserSchema.js";
import { generateToken } from "../Utils/generateToken.js"
import jwt from 'jsonwebtoken';
import cloudinary from "cloudinary"
const userController = CatchAsyncError(async (req, resp, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body;
    console.log(req.body);
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role) {
        return next(new ErrorHandler("fill all details", 400))
    }
    let user = await UserModel.findOne({ email })
    if (user) {
        return next(new ErrorHandler("user already exist", 400))
    }
    const ans = await UserModel.create({ firstName, lastName, email, phone, role, nic, dob, password, gender });
    // console.log("ans:::::", ans);
    ans.save();
    const token = jwt.sign( { id: ans._id, role: ans.role }, process.env.JWT_SECRET_KEY);
    // console.log("Generated Token:", token);
    return resp.status(200).json({
        message: "user registered",
        user: ans,
        token: token,
        status:200
    })

})

export const login = CatchAsyncError(async (req, resp, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("fill all details", 400))
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password and confirmPassword not matched", 400))
    }
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400))
    }
    const isPassMatch = await user.comparePassword(password);
    if (!isPassMatch) {
        return next(new ErrorHandler("Invalid email or password", 400))
    }
    if (role !== user.role) {
        return next(new ErrorHandler("role not matched with found matched", 400))
    }
    generateToken(user, "user login sucessfully", 200, resp);


})

export const addNewAdmin = CatchAsyncError(async (req, resp, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return next(new ErrorHandler("fill all details", 400))
    }
    let isRegisterd = await UserModel.findOne({ email });
    if (isRegisterd) {
        return next(new ErrorHandler(`${isRegisterd.role} is already registered`, 400))
    }
    const admin = await UserModel.create({ firstName, lastName, email, phone, nic, dob, password, gender, role: "Admin" })
    resp.status(200).json({
        success: true,
        message: "Admin registered"
    })
})
export const getAllDoctors = CatchAsyncError(async (req, resp, next) => {
    const doctors = await UserModel.find({ role: "Doctor" });
    resp.status(200).json({
        success: true,
        doctors,
    })
})
export const getUserDetails = CatchAsyncError(async (req, resp, next) => {
    const user = req.user;
    resp.status(200).json({
        success: true,
        user,
    })
})

export const AdminLogout = CatchAsyncError(async (req, resp, next) => {
    resp.status(200).cookie("AdminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin Logout Successfully"
    })
})
export const PatientLogout = CatchAsyncError(async (req, resp, next) => {
    resp.status(200).cookie("PatientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Patient Logout Successfully"
    })
})

export const addNewDoctor = CatchAsyncError(async (req, resp, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar required", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/webp", "image/jpeg"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("file format not supported", 400))
    }
    const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment) {
        return next(new ErrorHandler("fill all details", 400))
    }
    const isRegistered = await UserModel.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already exist`, 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "cloudinary error",
            cloudinaryResponse.error || "unknown cloudinary error"
        )
    }
    const doctor = await UserModel.create({
        firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment, role: "Doctor", docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    resp.status(200).json({
        success: true,
        message: "new doctor registered",
        doctor
    })
})
export default userController;