import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addLeaveRecord,
  updateFormData,
  updateLeaveBalance,
  resetFormData,
  updateTotalDays,
} from "../redux/slices/leaveSlice";
import {
  useGetLeavesQuery,
  useCreateLeaveMutation,
} from "../redux/slices/api/leaveApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import explore from "../assets/undraw_explore_re_8l4v.svg";
import update from "../assets/undraw_services_re_hu5n.svg";

const leaves = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { formData, totalDays, totalLeaveBalance, records } = useSelector(
    (state) => state.leave
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: leaveData,
    isLoading,
    refetch,
  } = useGetLeavesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createLeave, { isLoading: isCreatingLeave }] =
    useCreateLeaveMutation();

  const startDate = formData.startDate ? new Date(formData.startDate) : null;
  const endDate = formData.endDate ? new Date(formData.endDate) : null;

  const calculateDays = (start, end) => {
    if (!start || !end) {
      return 0;
    }
    const timeDiff = end.getTime() - start.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return diffDays;
  };

  useEffect(() => {
    if (startDate && endDate) {
      const days = calculateDays(startDate, endDate);
      dispatch(updateTotalDays(days));
    }
  }, [startDate, endDate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.leaveType ||
      !formData.approver ||
      !formData.reason
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (totalDays > totalLeaveBalance) {
      toast.error("You do not have enough leave balance.");
      return;
    }

    try {
      const leaveData = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        leaveType: formData.leaveType,
        approver: formData.approver,
        reason: formData.reason,
        totalDays,
      };

      const leaveResponse = await createLeave(leaveData).unwrap();
      if (leaveResponse) {
        dispatch(addLeaveRecord(leaveResponse));
        dispatch(updateLeaveBalance(totalLeaveBalance - totalDays));
        dispatch(resetFormData());
        toast.success("Leave applied successfully...");
        refetch();
      } else {
        toast.error("Error creating leave...");
      }
    } catch (error) {
      console.error("Error creating leave:", error);
      toast.error("Error creating leave.");
    }
  };

  const paginatedLeaveRecords = leaveData?.data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil((leaveData?.data?.length || 0) / pageSize);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const leaveUsed = records.reduce((sum, record) => sum + record.totalDays, 0);
  const availableLeave = totalLeaveBalance - leaveUsed;
  const totalLeave = totalLeaveBalance;

  return (
    <div>
      <div className="mt-12">
        <div className=" ">
          <ToastContainer />
          <div className="  mt-2 grid  grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 ">
            <div className="  p-7 -mt-17">
              <img src={explore} />
            </div>
            <div className="relative overflow-hidden rounded-2xl  border-t-4 border-customplam bg-white h-36 shadow-2xl">
              <div className="py-10 px-6">
                <div className="flex items-center">
                  <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    <span className="absolute -top-4 h-2 rounded-2xl w-full bg-customplam" />
                    {availableLeave}
                  </h3>
                  <span className="ml-3 text-base font-medium capitalize">
                    Available Leave
                  </span>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl border-t-4 border-green-600 bg-white h-36">
              <div className="py-10 px-6">
                <div className="flex items-center">
                  <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    <span className="absolute -top-4 h-2   rounded-2xl w-full bg-customplam" />
                    {leaveUsed}
                  </h3>
                  <span className="ml-3 text-base font-medium capitalize">
                    Leave Used
                  </span>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl border-t-4 border-green-600 bg-white h-36">
              <div className="py-10 px-6">
                <div className="flex items-center">
                  <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    <span className="absolute -top-4 h-2 w-full  rounded-2xl bg-customplam" />
                    {totalLeave}
                  </h3>
                  <span className="ml-3 text-base font-medium capitalize">
                    Total Leave
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2  ">
        <div className="   rounded-2xl shadow-2xl   bg-white   w-max border-b-2 border-green-600">
          <div className="relative ml-2 mt-9 inline-block text-1xl font-bold leading-none p-5">
            Leave Request
          </div>

          <div className=" p-7">
            <form
              onSubmit={handleSubmit}
              className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-green-600 sm:mr-4 sm:mb-0 focus:ring-1 p-5"
            >
              <div className=" grid grid-cols-2 gap-4 p-4 ">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  className="mb-2  w-full rounded-md border bg-white px-2 py-2 outline-none ring-green-600 sm:mr-4 sm:mb-0 focus:ring-1"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                  className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-green-600 sm:mr-4 sm:mb-0 focus:ring-1"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  name="endDate"
                />

                <label className="block text-gray-700">Leave Type</label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="leaveType"
                      value="paid"
                      checked={formData.leaveType === "paid"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Paid</span>
                  </label>

                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="leaveType"
                      value="unpaid"
                      checked={formData.leaveType === "unpaid"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Unpaid</span>
                  </label>
                </div>

                <label className="block text-gray-700">Approver </label>
                <input
                  type="text"
                  name="approver"
                  value={formData.approver}
                  onChange={handleChange}
                  className="mt-1 block w-46 rounded-2xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                />

                <label className="block text-gray-700">Total days</label>
                <input
                  type="number"
                  name="totaldays"
                  value={totalDays}
                  onChange={handleChange}
                  className="mt-1 block w-46 rounded-2xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                />

                <label className="block text-gray-700">Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="mt-1 block w-66 rounded-2xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                />
              </div>
              <div className="text-end mt-7">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-2xl hover:bg-green-700"
                  disabled={isCreatingLeave}
                >
                  {isCreatingLeave ? "Applying..." : "Apply"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className=" bg-white py-3 rounded-2xl  p-5 border-b-2 border-green-600 ">
          <h4 className="relative ml-2 inline-block text-1xl font-bold leading-none mt-9 ">
            My Latest leaves
          </h4>
          {paginatedLeaveRecords?.map((record, index) => (
            <div className="h-28">
              <div className=" ">
                <div className="group mx-2 mt-5 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden py-8 rounded-xl shadow-2xl text-gray-700  transition hover:shadow-lg sm:mx-auto border-r-8 border-green-600">
                  <a
                    href="#"
                    className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
                  >
                    <div className="w-16 h-16">
                      <img src={update} />
                    </div>
                  </a>

                  <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4 mt-7 ">
                    <a
                      href="#"
                      className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl -mt-6 "
                    ></a>
                    <h3 className="text-sm text-gray-600">
                      Start : {formatDate(record.startDate)}
                      <span className="p-7">
                        End : {formatDate(record.endDate)}{" "}
                      </span>
                    </h3>
                    <p className="overflow-hidden pr-7 text-sm" />
                    <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                      <div className>
                        Leave type :{" "}
                        <span className="font-semibold">
                          {record.leaveType}
                        </span>
                      </div>
                      <div className>
                        Status:
                        <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-green-200 px-2 py-0.5 text-purple-800">
                          <span
                            className={`${
                              record.status === "pending"
                                ? "bg-yellow-100"
                                : record.status === "approved"
                                ? "bg-green-100"
                                : "bg-red-100"
                            } rounded-full p-1`}
                          >
                            {record.status}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" bg-white py-3 rounded-2xl shadow-2xl p-5 border-b-2 border-green-600 mt-5">
        <h4 className="relative ml-2 inline-block text-1xl font-bold leading-none mt-9 ">
          All Leaves
        </h4>
        <div className=" ">
          <div className="mx-auto max-w-screen-xl px-2 py-10">
            <div className="mt-4 w-full">
              <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                <button
                  type="button"
                  className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 -mt-8 hover:bg-gray-100 focus:shadow sm:mr-0"
                >
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500" />
                  <svg
                    className="mr-2 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
              <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                <thead className="hidden border-b lg:table-header-group">
                  <tr className>
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

                <tbody className="bg-white lg:border-gray-300">
                  {paginatedLeaveRecords?.map((record, index) => (
                    <tr key={record._id} className>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                        {formatDate(record.startDate)}
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                        {formatDate(record.endDate)}
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                        {record.leaveType}
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                        {record.totalDays}
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                        {record.approver}
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                        {record.reason}
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                        <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-green-200 px-2 py-0.5 text-purple-800">
                          <span
                            className={`${
                              record.status === "pending"
                                ? "bg-yellow-100"
                                : record.status === "approved"
                                ? "bg-green-100"
                                : "bg-red-100"
                            } rounded-full p-1`}
                          >
                            {record.status}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default leaves;
