import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const AttendanceRecords = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    fetchAttendanceRecords();
  }, []);
  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get("/api/attendance");
      const parsedRecords = response.data.map((record) => ({
        ...record,
        timeIn: record.timeIn ? new Date(record.timeIn) : null,
        timeOut: record.timeOut ? new Date(record.timeOut) : null,
      }));
      setRecords(parsedRecords);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      toast.error("Failed to fetch attendance records");
    }
  };
  const formatSecondsToHHMMSS = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${hours}:${minutes}:${remainingSeconds}`;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "-");
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#4799F9" }}>
        Attendance Records
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Time In</th>
              <th className="py-2 px-4 border">Time Out</th>
              <th className="py-2 px-4 border">Work Hours</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td className="py-2 px-4 border">{record.userId}</td>
                <td className="py-2 px-4 border">{formatDate(record.date)}</td>
                <td className="py-2 px-4 border">
                  {record.timeIn ? record.timeIn.toLocaleTimeString() : "N/A"}
                </td>
                <td className="py-2 px-4 border">
                  {record.timeOut ? record.timeOut.toLocaleTimeString() : "N/A"}
                </td>
                <td className="py-2 px-4 border">
                  {record.totalWorkTime
                    ? formatSecondsToHHMMSS(record.totalWorkTime)
                    : "N/A"}
                </td>
                <td className="py-2 px-4 border">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AttendanceRecords;
