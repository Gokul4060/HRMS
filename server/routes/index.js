import express from "express";
import userRoutes from "./userRoutes.js";
import profileRoutes from "./profileRoutes.js";
import leaveRoutes from "./leaveRoute.js"; 
import taskRoutes from "./taskRoutes.js";




const router = express.Router();

router.use("/user", userRoutes); 
router.use("/profile", profileRoutes);
router.use("/leave", leaveRoutes); 
router.use("/task", taskRoutes);

export default router;
