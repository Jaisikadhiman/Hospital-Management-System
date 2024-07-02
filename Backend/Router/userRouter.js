import express from "express"
import userController, { AdminLogout, PatientLogout, addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login } from "../controller/userController.js";
import { isAdminAuth, isPatientAuth } from "../Middleware/auth.js"
const router = express.Router();
router.post("/user/register",userController)
router.post("/login",login)
router.post("/admin",isAdminAuth,addNewAdmin)
router.get("/doctors",getAllDoctors)
router.get("/admin/me",isAdminAuth,getUserDetails)
router.get("/patient/me",isPatientAuth,getUserDetails)
router.get("/admin/logout",isAdminAuth,AdminLogout)
router.get("/patient/logout",isPatientAuth,PatientLogout)
router.post("/doctor/addnew",isAdminAuth,addNewDoctor);
export default router;