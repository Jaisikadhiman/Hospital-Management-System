import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    availability: {
        type: String, // Example: "Monday-Friday 9AM-5PM"
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ Correct: Use `export default` instead of `module.exports`
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
