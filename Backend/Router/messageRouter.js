import express from "express"
import messageController from "../controller/MessageController.js"

const router = express.Router();
router.post("/send",messageController)
export default router;