import Attendance from "../models/Attendance.js";
import mongoose from "mongoose";
export const createAttendance = async (req, res) => {
  try {

    const { date, timeIn, ...rest } = req.body;
   
    const [day, month, year] = date.split("/");
    const formattedDate = new Date(`${year}-${month}-${day}`); // yyyy-mm-dd format
    const newAttendance = new Attendance({
      ...rest,
      date: formattedDate,
      timeIn: new Date(timeIn), 
    });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ error: "Error creating attendance record" });
  }
};
export const updateAttendance = async (req, res) => {
  const { userId } = req.params; // Assuming your route sends userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const { timeOut, totalWorkTime, status } = req.body;
  try {
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { userId },
      { timeOut, totalWorkTime, status },
      { new: true } 
    );
    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.json(updatedAttendance);
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ error: "Error updating attendance record" });
  }
};
export const getAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Error fetching attendance records" });
  }
};
