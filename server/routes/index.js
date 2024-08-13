import express from "express";
import userRoutes from "./userRoutes.js";
import profileRoutes from "./profileRoutes.js";
import leaveRoutes from "./leaveRoute.js"; 
import taskRoutes from "./taskRoutes.js";
import attendanceRoutes from "./attendanceRoutes.js";
import projectRoutes from "./projectRoute.js";


const router = express.Router();

router.use("/user", userRoutes); 
router.use("/profile", profileRoutes);
router.use("/leave", leaveRoutes); 
router.use("/task", taskRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/project", projectRoutes); 
export default router;
