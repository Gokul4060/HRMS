import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  timeIn: { type: Date, required: true },
  timeOut: { type: Date },
  totalWorkTime: { type: Number },
  
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    default: "Present",
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
