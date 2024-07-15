import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

import moment from "moment";
import clsx from "clsx";
import img from "../assets/undraw_hello_re_3evm.svg";

import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Tools/Loader";
import { useSelector } from "react-redux";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300 ">
      <tr className="text-black text-left">
        <th className="py-2">Project Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Team</th>
        <th className="py-2 hidden md:block">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className="text-base text-black">{task.title}</p>
        </div>
      </td>

      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>

      <td className="py-2">
        <div className="flex">
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-2 hidden md:block">
        <span className="text-base text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <>
      <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className="border-b border-gray-300 ">
      <tr className="text-black  text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Status</th>
        <th className="py-2">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200  text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
            <span className="text-center">{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className="text-xs text-black">{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className="py-2 text-sm">{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
      <table className="w-full mb-5">
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetDashboardStatsQuery();
  if (isLoading)
    return (
      <div className="py-10">
        <Loading />
      </div>
    );

    
  return (
    <div className="h-full py-4">
      <div className="p-4 bg-gray-100 ">
    

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="p-4 bg-customGreen shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold">My Performance</h2>
            <p className="text-4xl font-bold">202</p>
            <p className="text-sm text-gray-600">Good score</p>
          </div>

          <div className="p-4 bg-customGreen shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold">Task assigned</h2>
            <p className="text-4xl font-bold">189</p>
            <p className="text-sm text-gray-600">223 Average tasks per user</p>
          </div>

          <div className="p-4 bg-customGreen shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold">Attendance %</h2>
            <p className="text-4xl font-bold">89.87%</p>
            <p className="text-sm text-gray-600">Average score</p>
          </div>

          <div className="p-4 bg-customGreen shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold">Leaves %</h2>
            <p className="text-4xl font-bold">100%</p>
            <p className="text-sm text-gray-600">Perfect score</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">My Team</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Team Members</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">This month</th>
                <th className="px-4 py-2">Last month</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Akash</td>
                <td className="border px-4 py-2">201 / 240</td>
                <td className="border px-4 py-2">83.45%</td>
                <td className="border px-4 py-2">82.00%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Berlin </td>
                <td className="border px-4 py-2">223 / 240</td>
                <td className="border px-4 py-2">97.98%</td>
                <td className="border px-4 py-2">61.00%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Bibin</td>
                <td className="border px-4 py-2">217 / 240</td>
                <td className="border px-4 py-2">91.65%</td>
                <td className="border px-4 py-2">87.50%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Anub</td>
                <td className="border px-4 py-2">187 / 240</td>
                <td className="border px-4 py-2">72.67%</td>
                <td className="border px-4 py-2">81.33%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Rahul</td>
                <td className="border px-4 py-2">207 / 240</td>
                <td className="border px-4 py-2">88.98%</td>
                <td className="border px-4 py-2">77.65%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
