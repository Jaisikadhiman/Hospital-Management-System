import express from "express";
import { authenticateUser, authorizeRoles } from "../middlewares/authMiddleware.js";
import { getAllUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", authenticateUser, authorizeRoles("Admin"), getAllUsers);
router.delete("/user/:id", authenticateUser, authorizeRoles("Admin"), deleteUser);

export default router;
