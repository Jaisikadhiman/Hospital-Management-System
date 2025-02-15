const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
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

module.exports = mongoose.model("Doctor", doctorSchema);
