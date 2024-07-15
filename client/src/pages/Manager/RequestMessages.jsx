import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { approveLeave, rejectLeave } from '../../redux/slices/leaveSlice';
import moment from 'moment';
import { useGetLeavesQuery } from '../../redux/slices/api/leaveApiSlice';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestMessages = () => {
  const dispatch = useDispatch();
  const { data: leaveData, refetch, isLoading } = useGetLeavesQuery();
  const [tab, setTab] = useState('pending');

  const handleApprove = async (id, name) => {
    try {
      console.log(`Approving leave request with ID ${id}`);
      await axios.put(`/api/leave/approve/${id}`);
      dispatch(approveLeave({ id }));
      toast.success(`Approved ${name}'s leave `);
      refetch();
    } catch (error) {
      console.error('Error approving leave:', error);
      toast.error('Error approving leave request');
    }
  };

  const handleReject = async (id, name) => {
    try {
      console.log(`Rejecting leave request with ID ${id}`);
      await axios.put(`/api/leave/reject/${id}`);
      dispatch(rejectLeave({ id }));
      toast.success(`Rejected ${name}'s leave`);
      refetch();
    } catch (error) {
      console.error('Error rejecting leave:', error);
      toast.error('Error rejecting leave request');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Please Wait...</p>
          <div className="py-2 text-blue-600">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <rect x="10" y="0" width="12" fill="currentColor">
                <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0; 0.15; 1" values="20;100;20;" keySplines="0 0.5 0.5 1;0 0.5 0.25 1" begin="-0.2s"></animate>
              </rect>
              <rect x="45" y="0" width="12" fill="currentColor">
                <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0; 0.15; 1" values="20;100;20;" keySplines="0 0.5 0.5 1;0 0.5 0.25 1" begin="-0.1s"></animate>
              </rect>
              <rect x="80" y="0" width="12" fill="currentColor">
                <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0; 0.15; 1" values="20;100;20;" keySplines="0 0.5 0.5 1;0 0.5 0.25 1"></animate>
              </rect>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  const filteredLeaves = leaveData?.data?.filter(leave => {
    if (tab === 'approved') {
      return leave.status === 'approved';
    } else if (tab === 'rejected') {
      return leave.status === 'rejected';
    } else {
      return leave.status === 'pending';
    }
  });

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setTab("pending")}
          className={`relative p-2 ${
            tab === "pending" ? "text-orange-500 font-bold" : "text-gray-700"
          } focus:outline-none`}
        >
          Pending
          {tab === "pending" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
          )}
        </button>
        <button
          onClick={() => setTab("approved")}
          className={`relative p-2 ${
            tab === "approved" ? "text-green-500 font-bold" : "text-gray-700"
          } focus:outline-none`}
        >
          Approved
          {tab === "approved" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
          )}
        </button>
        <button
          onClick={() => setTab("rejected")}
          className={`relative p-2 ${
            tab === "rejected" ? "text-red-500 font-bold" : "text-gray-700"
          } focus:outline-none`}
        >
          Rejected
          {tab === "rejected" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLeaves.length === 0 ? (
          <p>No {tab} leave requests</p>
        ) : (
          filteredLeaves.map((leave) => (
            <div
              key={leave._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4"
            >
              <div className="p-4">
                <p className="text-lg font-bold mb-2">
                  {leave.userId?.name || "Unknown User"}
                </p>
                <div className="flex flex-wrap -mx-2 mb-2">
                  <div className="w-1/2 px-2">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-bold">Start Date:</span>
                      <br /> {moment(leave.startDate).format("DD/MM/YYYY")}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-bold">Leave Type:</span>
                      <br /> {leave.leaveType}
                    </p>
                  </div>
                  <div className="w-1/2 px-2">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-bold">End Date:</span>
                      <br /> {moment(leave.endDate).format("DD/MM/YYYY")}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-bold">Total Days:</span>
                      <br /> {leave.totalDays}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Approver:</span> {leave.approver}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Reason:</span> {leave.reason}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Status:</span>{" "}
                  <span
                    className={
                      leave.status === "approved"
                        ? "text-green-500"
                        : leave.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {leave.status.toLowerCase()}
                  </span>
                </p>
                {leave.status === "pending" && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() =>
                        handleApprove(leave._id, leave.userId?.name)
                      }
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() =>
                        handleReject(leave._id, leave.userId?.name)
                      }
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
          <thead className="hidden border-b lg:table-header-group">
            <tr className>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Employee Name
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Start date
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                End date
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Leave Type
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Total Days
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Approver
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Reason
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Status
              </td>
            </tr>
          </thead>

          {filteredLeaves.length === 0 ? (
            <p>No {tab} leave requests</p>
          ) : (
            filteredLeaves.map((leave) => (
              <tbody className="bg-white lg:border-gray-300">
                <tr className>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    {leave.userId?.name || "Unknown User"}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    {moment(leave.startDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    {moment(leave.endDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                    {leave.leaveType}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                    {leave.totalDays}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                    {leave.approver}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                    {leave.reason}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                    <span
                      className={
                        leave.status === "approved"
                          ? "text-green-500"
                          : leave.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                    >
                      {leave.status.toLowerCase()}
                    </span>
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>
    </div>
  );
};

export default RequestMessages;
