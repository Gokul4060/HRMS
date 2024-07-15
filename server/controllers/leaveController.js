import Leave from "../models/leaveModel.js";
import User from "../models/user.js";

export const createLeave = async (req, res) => {
  try {
    const { startDate, endDate, leaveType, approver, reason } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const leave = new Leave({
      startDate,
      endDate,
      leaveType,
      approver,
      reason,
      userId,
      totalDays, 
    });

    await leave.save();

    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const getLeaves = async (req, res) => {
  try {
    console.log("Fetching leaves...");

    const leaves = await Leave.find().populate("userId"); 

    console.log("Fetched leaves:", leaves);

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    console.error("Error fetching leaves:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status: "approved" },
      { new: true }
    );

    if (!leave) {
      return res
        .status(404)
        .json({ status: false, message: "Leave not found" });
    }

    res.status(200).json({ status: true, data: leave });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};


export const rejectLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status: "rejected" },
      { new: true }
    );

    if (!leave) {
      return res
        .status(404)
        .json({ status: false, message: "Leave not found" });
    }

    res.status(200).json({ status: true, data: leave });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
