import express from "express";
import {
  createEmployee,
  fetchEmployee,
  updateEmployee,
} from "../controllers/profileController.js";
import { protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/create", protectRoute, createEmployee);
router.get("/getAll", protectRoute, fetchEmployee);
router.put("/update", protectRoute, updateEmployee); 

export default router;
