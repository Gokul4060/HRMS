import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();


// Route to create a new project
router.post("/create", createProject);
router.get("/project", getProjects);
router.delete("/:id", deleteProject);



export default router;
