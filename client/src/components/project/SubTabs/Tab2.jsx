import React from "react";


const Tab2 = () => {
  return (
    <div className="font-sans bg-white p-4 rounded-2xl shadow-lg h-screen">
      <div className="w-screen mx-auto mt-3 max-w-screen-lg px-2">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900">Tasks</p>
          <div className="mt-9 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end ">
              <div className="flex items-center">
                <label className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900">
                  Filter :
                </label>
                <select className="sm:mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                  <option className="bg-green-300 text-sm">Status</option>
                  <option className="bg-green-300 text-sm">Completed</option>
                  <option className="bg-green-300 text-sm">Pending</option>
                </select>
              </div>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-green-300 focus:shadow"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download doc
              </button>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center ml-2 rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-green-300 focus:shadow"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border shadow ">
          <table className="min-w-full  rounded-lg  ">
            <thead className="hidden lg:table-header-group bg-green-400 ">
              <tr>
                <th className="py-4 text-sm font-medium text-white sm:px-6">
                  Code
                </th>
                <th className="py-4 text-sm font-medium text-white sm:px-6">
                  Name
                </th>
                <th className="py-4 text-sm font-medium text-white sm:px-6">
                  Project Title
                </th>
                <th className="py-4 text-sm font-medium text-white sm:px-6">
                  Created At
                </th>
                <th className="py-4 text-sm font-medium text-white sm:px-6">
                  Start date
                </th>
                <th className="py-4 text-sm font-medium text-white sm:px-6">
                  End date
                </th>
                <th className="py-4 text-sm font-medium text-white sm:px-6">
                  Status
                </th>
                <th className="py-4 text-sm font-medium text-white sm:px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="lg:border-gray-300 border-separate">
              <tr>
                <td className="py-4 text-sm font-bold text-gray-900 sm:px-6">
                  001
                </td>
                <td className="hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  Berlin
                </td>
                <td className="hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  HRMS
                </td>
                <td className="hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  17-07-2024
                </td>
                <td className="hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  20-07-2024
                </td>
                <td className="hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  28-07-2024
                </td>
                <td className="hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  <div className="inline-flex items-center rounded-full bg-green-200 py-2 px-3 text-xs text-white">
                    Complete
                  </div>
                </td>
                <td className="hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tab2;
