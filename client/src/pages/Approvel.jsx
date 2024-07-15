import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveLeave, rejectLeave } from "../redux/slices/leaveSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveRequest = () => {
  const dispatch = useDispatch();
  const { approvalRequests } = useSelector((state) => state.leave);

  const handleApprove = (id) => {
    dispatch(approveLeave(id));
    toast.success("Leave approved.");
  };

  const handleReject = (id) => {
    dispatch(rejectLeave(id));
    toast.error("Leave rejected.");
  };

  return (
    <div className="bg-white mt-5 p-5 rounded-2xl">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
      {approvalRequests && approvalRequests.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50">Start Date</th>
              <th className="px-6 py-3 bg-gray-50">End Date</th>
              <th className="px-6 py-3 bg-gray-50">Leave Type</th>
              <th className="px-6 py-3 bg-gray-50">Approver</th>
              <th className="px-6 py-3 bg-gray-50">Reason</th>
              <th className="px-6 py-3 bg-gray-50">Total Days</th>
              <th className="px-6 py-3 bg-gray-50">Status</th>
              <th className="px-6 py-3 bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {approvalRequests.map((leave) => (
              <tr key={leave._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave.leaveType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave.approver}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave.totalDays}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave.status === "Pending" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(leave._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-full"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(leave._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-full"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leave requests available.</p>
      )}
    </div>
  );
};

export default LeaveRequest;
