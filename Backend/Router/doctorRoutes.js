const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Add Doctor (Only Admin)
router.post("/add", authenticateUser, authorizeRoles("Admin"), async (req, res) => {
    try {
        const { userId, specialization, experience, availability, fees } = req.body;
        const newDoctor = new Doctor({ userId, specialization, experience, availability, fees });
        await newDoctor.save();
        res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Doctors (For Patients)
router.get("/list", async (req, res) => {
    try {
        const doctors = await Doctor.find().populate("userId", "firstName lastName email phone");
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Doctor Details (Only Admin)
router.put("/update/:id", authenticateUser, authorizeRoles("Admin"), async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Doctor details updated", doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Doctor (Only Admin)
router.delete("/delete/:id", authenticateUser, authorizeRoles("Admin"), async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
