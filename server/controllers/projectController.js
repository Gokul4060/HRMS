import Project from "../models/project.js";
import mongoose from "mongoose";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  const { name, description, startDate, endDate, teamMembers } = req.body;

  const project = new Project({
    name,
    description,
    startDate,
    endDate,
    teamMembers,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, teamMembers } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        name,
        description,
        startDate,
        endDate,
        teamMembers,
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Attempting to delete project with ID:", id); // Debugging line

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error); // Debugging line
    res.status(500).json({ message: error.message });
  }
};
