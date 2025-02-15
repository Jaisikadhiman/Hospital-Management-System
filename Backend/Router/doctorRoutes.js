
import express from "express"; // ✅ Use import instead of require
import { authenticateUser, authorizeRoles } from "../Middleware/auth.js"; // ✅ Add .js extension
import Doctor from "../Model/doctor.js";
const router = express.Router();

// Add Doctor (Only Admin)
router.post("/add", authenticateUser, authorizeRoles("Admin"), async (req, res) => {
    try {
        console.log("hiiiiiiiiiiiiiiiiiiii")
        const { userId, name, specialization, experience, availability, fees } = req.body;
        console.log("doctor:::", req.body)
        const newDoctor = new Doctor({ userId, name, specialization, experience, availability, fees });
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
export default router;
