import express from "express"
import userController, { AdminLogout, PatientLogout, addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login } from "../controller/userController.js";
import { authenticateUser, authorizeRoles } from "../Middleware/auth.js"
const router = express.Router();

// User authentication
router.post("/user/register", userController)
router.post("/login", login)

// Admin routes (Protected)
router.post("/admin", authenticateUser, authorizeRoles("Admin"), addNewAdmin)
router.get("/admin/me", authenticateUser, authorizeRoles("Admin"), getUserDetails)
router.get("/admin/logout", authenticateUser, authorizeRoles("Admin"), AdminLogout)


// Patient routes (Protected)
router.get("/patient/me", authenticateUser, authorizeRoles("Patient"), getUserDetails)
router.get("/patient/logout", authenticateUser, authorizeRoles("Patient"), PatientLogout)


// Doctor routes (Admin only)
router.post("/doctor/addnew", authenticateUser, authorizeRoles("Admin"), addNewDoctor);
router.get("/doctors", getAllDoctors)
export default router;

// import express from "express";
// // import { login, register, AdminLogout, PatientLogout } from "../controllers/authController.js";
// import { authenticateUser, authorizeRoles } from "../Middleware/auth.js";
// // import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails } from "../controllers/userController.js";

// const router = express.Router();

// // User authentication
// router.post("/register", register);
// router.post("/login", login);

// // Admin routes (Protected)
// router.post("/admin/add", authenticateUser, authorizeRoles("Admin"), addNewAdmin);
// router.get("/admin/me", authenticateUser, authorizeRoles("Admin"), getUserDetails);
// router.get("/admin/logout", authenticateUser, authorizeRoles("Admin"), AdminLogout);

// // Patient routes (Protected)
// router.get("/patient/me", authenticateUser, authorizeRoles("Patient"), getUserDetails);
// router.get("/patient/logout", authenticateUser, authorizeRoles("Patient"), PatientLogout);

// // Doctor routes (Admin only)
// router.post("/doctor/add", authenticateUser, authorizeRoles("Admin"), addNewDoctor);
// router.get("/doctors", authenticateUser, authorizeRoles("Admin", "Patient"), getAllDoctors);

// export default router;
