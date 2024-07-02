import mongoose from "mongoose"
import validator from "validator"
const appointmentSchema = mongoose.Schema({
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
    appointment_date: {
        type: String,
        required: true,

    },
    doctor: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First name contain atleast 3  characters"]
        },
        lastname: {
            type: String,
            required: true,
            minLength: [3, "First name contain atleast 3  characters"]
        }
    },
    hasVisited: {
        type: Boolean,
        default: false,

    },
    address: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patient_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
})
export const appointmentModel= mongoose.model("appointmentModel",appointmentSchema);