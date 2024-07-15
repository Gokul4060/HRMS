import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const Attendance = () => {
  const { user } = useSelector((state) => state.auth);
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);
  const [status, setStatus] = useState("Absent");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [records, setRecords] = useState([]);
  const WORK_DURATION_HOURS = 1;
  const WORK_DURATION_SECONDS = WORK_DURATION_HOURS * 60 * 60;
  useEffect(() => {
    let interval;
    if (timeIn && !timeOut) {
      interval = setInterval(() => {
        const elapsed = calculateElapsedTime();
        setElapsedTime(elapsed);
        if (elapsed >= WORK_DURATION_SECONDS) {
          handleTimeOut();
        }
      }, 1000);
    } else if (timeIn && timeOut) {
      setElapsedTime(calculateElapsedTime(timeOut));
    }
    return () => clearInterval(interval);
  }, [timeIn, timeOut]);
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

      const userRecord = parsedRecords.find(
        (record) => record.userId === user._id
      );
      if (userRecord) {
        setTimeIn(userRecord.timeIn);
        setTimeOut(userRecord.timeOut);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      toast.error("Failed to fetch attendance records");
    }
  };
  const handleTimeIn = async () => {
    if (!timeIn) {
      const currentTime = new Date();
      console.log("Current Time:", currentTime);
      setTimeIn(currentTime);
      setStatus("Present");
      const newRecord = {
        userId: user._id,
        date: new Date().toLocaleDateString(),
        timeIn: currentTime,
        timeOut: null,
        totalWorkTime: null,
        status: "Present",
      };
      setRecords([...records, newRecord]);
      try {
        const response = await axios.post("/api/attendance", newRecord);
        console.log("Time In response:", response.data);
        toast.success(`Attendance record created`, { autoClose: 2000 });
      } catch (error) {
        console.error("Error saving Time In:", error);
        toast.error("Error saving Time In record");
      }
    }
  };
  const handleTimeOut = async () => {
    if (!timeOut && timeIn) {
      const currentTime = new Date();
      setTimeOut(currentTime);
      const totalSecondsWorked = calculateTotalWorkTime(currentTime);
      const existingRecord = records.find(
        (record) =>
          record.timeIn.getTime() === timeIn.getTime() &&
          record.timeOut === null
      );
      if (!existingRecord) {
        console.error("No matching record found to update.");
        return;
      }
      const updatedRecord = {
        userId: user._id,
        _id: existingRecord._id,
        timeOut: currentTime,
        totalWorkTime: totalSecondsWorked,
        status: "Present",
      };
      try {
        const response = await axios.put(
          `/api/attendance/${existingRecord.userId}`,
          updatedRecord
        );
        console.log("Time Out response:", response.data);
        toast.success(`Attendance record closed`, { autoClose: 2000 });
        const updatedRecords = records.map((record) => {
          if (
            record.timeIn.getTime() === timeIn.getTime() &&
            record.timeOut === null
          ) {
            return {
              ...record,
              timeOut: currentTime,
              totalWorkTime: totalSecondsWorked,
              status: "Present",
            };
          }
          return record;
        });
        setRecords(updatedRecords);
      } catch (error) {
        console.error("Error saving Time Out:", error);
        toast.error("Error saving Time Out record");
      }
    }
  };
  const calculateElapsedTime = (endTime = new Date()) => {
    if (timeIn) {
      const elapsedMilliseconds = endTime - timeIn;
      return elapsedMilliseconds / 1000;
    }
    return 0;
  };
  const calculateTotalWorkTime = (currentTime) => {
    if (timeIn && currentTime) {
      const totalWorkMilliseconds = currentTime.getTime() - timeIn.getTime();
      return totalWorkMilliseconds / 1000;
    }
    return 0;
  };
  const formatSecondsToHHMMSS = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${hours}:${minutes}:${remainingSeconds}`;
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${remainingSeconds}s / ${WORK_DURATION_HOURS} hr`;
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

  const userRecords = records.filter((record) => record.userId === user._id);
  const exportRecords = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Date",
      "Time In",
      "Time Out",
      "Total Work Hours",
      "Worked Time",
      "Status",
    ];
    const tableRows = [];
    userRecords.forEach((record) => {
      const recordData = [
        formatDate(record.date),
        record.timeIn ? record.timeIn.toLocaleTimeString() : "N/A",
        record.timeOut ? record.timeOut.toLocaleTimeString() : "N/A",
        WORK_DURATION_HOURS,
        formatSecondsToHHMMSS(record.totalWorkTime),
        record.status,
      ];
      tableRows.push(recordData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Attendance Records", 14, 15);
    doc.save(`attendance_records_${new Date().toLocaleDateString()}.pdf`);
  };
  return (
    <div className="h-full py-4">
      <p className="text-xs">{user?._id}</p>
      <ToastContainer />
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 border rounded-lg col-span-2">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#4799F9" }}
            >
              Today's Attendance
            </h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {new Date()
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, "-")}
                </p>
                <div className="mt-6 border rounded-2xl p-2 text-center">
                  <p className="text-sm text-gray-500">Time In at</p>
                  <p className="text-md font-bold text-gray-800">
                    {timeIn ? timeIn.toLocaleTimeString() : "N/A"}
                  </p>
                </div>
                <div className="mt-4 flex justify-center">
                  {!timeIn ? (
                    <button
                      onClick={handleTimeIn}
                      className="bg-green-500 text-white px-6 py-2 rounded-full text-xs shadow-md hover:bg-green-700"
                    >
                      Mark Present
                    </button>
                  ) : (
                    <button
                      onClick={handleTimeOut}
                      className="bg-green-500 text-white px-6 py-2 rounded-full text-xs shadow-md hover:bg-green-700"
                    >
                      Time Out
                    </button>
                  )}
                </div>
                {elapsedTime > 0 && (
                  <div className="mt-6 text-center text-sm">
                    Time Left today :
                    <span className="text-red-500">
                      {Math.floor((WORK_DURATION_SECONDS - elapsedTime) / 3600)}
                      h{" "}
                      {Math.floor(
                        ((WORK_DURATION_SECONDS - elapsedTime) % 3600) / 60
                      )}
                      m
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <div style={{ width: "120px", height: "120px" }}>
                  <CircularProgressbar
                    value={elapsedTime}
                    text={formatTime(elapsedTime)}
                    maxValue={WORK_DURATION_SECONDS}
                    styles={buildStyles({
                      textColor: "#000000",
                      pathColor: `linear-gradient(90deg, rgba(17, 47, 255, 0.8) 0%, rgba(31,198,204,1) 100%)`,
                      trailColor: "#C2C8D6",
                      textSize: "10px",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 border rounded-lg">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#4799F9" }}
            >
              Statistics
            </h2>
            <div className="mb-2 rounded-xl border-2 p-2">
              <h3 className="text-xs font-bold flex justify-between items-center">
                <span>Today</span>
                <span className="text-xs font-thin">
                  {formatTime(elapsedTime)}
                </span>
              </h3>
              <div className="w-full h-2 bg-gray-200 mt-2 rounded-xl">
                <div
                  className="h-2 bg-blue-500 rounded-xl"
                  style={{
                    width: `${(elapsedTime / WORK_DURATION_SECONDS) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="mb-2 rounded-xl border-2 p-2">
              <h3 className="text-xs font-bold flex justify-between items-center">
                <span>This week</span>
                <span className="text-xs font-thin">
                  {formatTime(elapsedTime)}
                </span>
              </h3>
              <div className="w-full h-2 bg-gray-200 mt-2 rounded-xl">
                <div
                  className="h-2 bg-green-500 rounded-xl"
                  style={{
                    width: `${(elapsedTime / WORK_DURATION_SECONDS) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="mb-2 rounded-xl border-2 p-2">
              <h3 className="text-xs font-bold flex justify-between items-center">
                <span>This month</span>
                <span className="text-xs font-thin">
                  {formatTime(elapsedTime)}
                </span>
              </h3>
              <div className="w-full h-2 bg-gray-200 mt-2 rounded-xl">
                <div
                  className="h-2 bg-yellow-500 rounded-xl"
                  style={{
                    width: `${(elapsedTime / WORK_DURATION_SECONDS) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="mb-2 rounded-xl border-2 p-2">
              <h3 className="text-xs font-bold flex justify-between items-center">
                <span>Remaining</span>
                <span className="text-xs font-thin">
                  {formatTime(WORK_DURATION_SECONDS - elapsedTime)}
                </span>
              </h3>
              <div className="w-full h-2 bg-gray-200 mt-2 rounded-xl">
                <div
                  className="h-2 bg-red-500 rounded-xl"
                  style={{
                    width: `${
                      ((WORK_DURATION_SECONDS - elapsedTime) /
                        WORK_DURATION_SECONDS) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white p-6 border rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="border-b-2 p-2 text-sm text-gray-800">Date</th>
                  <th className="border-b-2 p-2 text-sm text-gray-800">
                    Time In
                  </th>
                  <th className="border-b-2 p-2 text-sm text-gray-800">
                    Time Out
                  </th>
                  <th className="border-b-2 p-2 text-sm text-gray-800">
                    Total Work Hours
                  </th>
                  <th className="border-b-2 p-2 text-sm text-gray-800">
                    Worked Time
                  </th>
                  <th className="border-b-2 p-2 text-sm text-gray-800">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {userRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="border-b p-2 text-sm text-gray-500">
                      {formatDate(record.date)}
                    </td>
                    <td className="border-b p-2 text-sm text-gray-500">
                      {record.timeIn
                        ? record.timeIn.toLocaleTimeString()
                        : "N/A"}
                    </td>
                    <td className="border-b p-2 text-sm text-gray-500">
                      {record.timeOut
                        ? record.timeOut.toLocaleTimeString()
                        : "N/A"}
                    </td>
                    <td className="border-b p-2 text-sm text-gray-500">
                      {WORK_DURATION_HOURS}
                    </td>
                    <td className="border-b p-2 text-sm text-gray-500">
                      {formatSecondsToHHMMSS(record.totalWorkTime)}
                    </td>
                    <td className="border-b p-2 text-sm text-gray-500">
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={exportRecords}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs shadow-md hover:bg-blue-700"
            >
              Export Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Attendance;
