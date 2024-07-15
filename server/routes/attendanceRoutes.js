import express from "express";
import {
  createAttendance,
  updateAttendance,
  getAttendance,
} from "../controllers/attendanceController.js";
const router = express.Router();
router.post("/", createAttendance);
router.put("/:userId", updateAttendance); 
router.get("/", getAttendance);
export default router;
