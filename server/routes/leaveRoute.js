import express from "express";
import {
  createLeave,
  getLeaves,
  approveLeave,
  rejectLeave,
} from "../controllers/leaveController.js";

import { protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/create-leave", protectRoute, createLeave);
router.get("/get-leave", protectRoute, getLeaves);
router.put("/approve/:leaveId", protectRoute, approveLeave);
router.put("/reject/:leaveId", protectRoute, rejectLeave);

export default router;
