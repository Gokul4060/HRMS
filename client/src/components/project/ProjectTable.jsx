import React, { useState, useEffect } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import TaskDialog from "../task/TaskDialog";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Tools/Button";
import ConfirmatioDialog from "../Tools/Dialogs";
import { useSelector } from "react-redux";
import {
  useTrashTaskMutation,
  useGetAllTaskQuery,
} from "../../redux/slices/api/taskApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks, task }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleCreateProject = () => {
    navigate("/addProject");
  };

  useEffect(() => {
    refetch();
  }, []);

  const [trashTask] = useTrashTaskMutation();

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = async () => {
    try {
      const result = await trashTask({
        id: selected,
        isTrash: "trash",
      }).unwrap();
      toast.success(result?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const TableHeader = () => (
    <thead className="bg-green-500 text-white">
      <tr>
        <th className="py-2 px-4">Project Title</th>
        <th className="py-2 px-4">Priority</th>
        <th className="py-2 px-4">Started</th>
        <th className="py-2 px-4">Ended</th>
        <th className="py-2 px-4">Team</th>
        <th className="py-2 px-4">Status</th>
        <th className="py-2 px-4">Action</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4">
        <div className="flex items-center">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className="ml-2 text-black">{task?.title}</p>
        </div>
      </td>
      <td className="py-2 px-4">
        <div className="flex items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="ml-1 capitalize">{task?.priority} Priority</span>
        </div>
      </td>
      <td className="py-2 px-4">
        <span className="text-sm text-gray-600">
          {formatDate(new Date(task?.startDate))}
        </span>
      </td>
      <td className="py-2 px-4">
        <span className="text-sm text-gray-600">
          {formatDate(new Date(task?.endDate))}
        </span>
      </td>

      <td className="py-2 px-4">
        <div className="flex -space-x-2">
          {task?.team?.map((m, index) => (
            <UserInfo
              key={m._id}
              user={m}
              className={clsx(
                "w-8 h-8 rounded-full border-2 border-white",
                BGS[index % BGS?.length]
              )}
            />
          ))}
        </div>
      </td>
      <td className="py-2 px-4">
        <span
          className={clsx(
            "border-b border-gray-200 hover:bg-gray-100 p-2 rounded-2xl",
            {
              "bg-yellow-100": task.stage === "progress",
              "bg-green-100": task.stage === "completed",
              "bg-blue-100": task.stage === "todo",
            }
          )}
        >
          {task?.stage}
        </span>
      </td>
      <td className="py-2 px-4 flex space-x-2">
        <FaRegPenToSquare
          type="button"
          label="Edit"
          className="text-green-600 hover:text-green-500  w-5 h-5  text-sm"
        />
        <FaTrash
          className="text-red-700 hover:text-red-500 w-5 h-5 text-sm"
          label="Delete"
          type="button"
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="font-sans bg-white p-6 rounded-xl shadow-lg h-screen">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-gray-900">Projects</p>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-900"></label>
              <select className="block w-full rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                <option>Status</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>
            <button
              type="button"
              className="flex items-center space-x-1 border rounded-lg bg-white py-2 px-3 text-sm font-medium text-gray-800 shadow hover:bg-green-300"
            >
              <svg
                className="h-4 w-4"
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
              <span>Download doc</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-1 border rounded-lg bg-white py-2 px-3 text-sm font-medium text-gray-800 shadow hover:bg-green-300"
              onClick={handleCreateProject}
            >
              <svg
                className="h-4 w-4"
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
              <span>Create</span>
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 ">
            <TableHeader />
            <tbody className="divide-y divide-gray-200 ">
              {Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task, index) => <TableRow key={index} task={task} />)
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ConfirmatioDialog
          open={openDialog}
          setOpen={setOpenDialog}
          onClick={deleteHandler}
        />
      </div>
    </div>
  );
};

export default Table;
