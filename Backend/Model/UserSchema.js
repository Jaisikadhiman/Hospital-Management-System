import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name contain atleast 3  characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Lastt name contain atleast 3  characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "provide valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "phone number contain only 10 digits"],
        maxLength: [10, "phone number contain only 10 digits"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [10, "phone number contain only 10 digits"],
        maxLength: [10, "phone number contain only 10 digits"]
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "password contain atleast 8 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient","Doctor"]
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }

})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}
userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,  
      {  expiresIn:process.env.JWT_EXPIRES}
    )
}
export const UserModel = mongoose.model("UserModel", userSchema);