import express from "express"
import { appointment, deleteDetails, getAppointmentDetails, updateDetails } from "../controller/appointmentController.js";
import { authenticateUser, authorizeRoles } from "../Middleware/auth.js";
const router= express.Router();
router.post("/appointment/create",authenticateUser, authorizeRoles("Patient"), appointment);
router.get("/appointment/get",authenticateUser, authorizeRoles("Patient"), getAppointmentDetails);
router.put("/appointment/update/:id",authenticateUser, authorizeRoles("Patient"), updateDetails);
router.delete("/appointment/delete/:id",authenticateUser, authorizeRoles("Patient"), deleteDetails);
export default router;