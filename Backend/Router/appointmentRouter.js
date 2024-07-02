import express from "express"
import { appointment, deleteDetails, getAppointmentDetails, updateDetails } from "../controller/appointmentController.js";
import { isPatientAuth } from "../Middleware/auth.js"
const router= express.Router();
router.post("/appointment/create",isPatientAuth, appointment);
router.get("/appointment/get",isPatientAuth, getAppointmentDetails);
router.put("/appointment/update/:id",isPatientAuth, updateDetails);
router.delete("/appointment/delete/:id",isPatientAuth, deleteDetails);
export default router;