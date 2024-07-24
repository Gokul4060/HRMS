import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import TaskDialog from "./TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import { IoMdAdd } from "react-icons/io";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleCreateTask = () => {
    navigate("/addTask", { state: { id: task._id } });
  };

  return (
    <>
      <div className="w-full h-fit bg-white shadow-lg p-4 rounded-2xl">
        <div className="w-full flex justify-between">
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[task?.priority]
            )}
          >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>

          {user?.isAdmin && <TaskDialog task={task} />}
        </div>

        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <h4 className="line-clamp-1 text-black">{task?.title}</h4>
        </div>

        {/* Added columns for Start Date, End Date, and Tag */}
        <div className="flex flex-col-2 mt-2">
          <span className="text-sm text-gray-600">
            Start Date: {formatDate(new Date(task?.startDate))}
          </span>
          <span className="text-sm text-gray-600">
            End Date: {formatDate(new Date(task?.endDate))}
          </span>
        </div>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            {task.subTasks.map((subtask, index) => (
              <div key={index} className="py-2">
                <h5 className="text-base text-black">{subtask.title}</h5>
                <div className="flex flex-col-2 gap-4 py-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Start:</span>
                    <span>{formatDate(new Date(subtask.startDate))}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">End:</span>
                    <span>{formatDate(new Date(subtask.endDate))}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-600/10 px-3 py-1 rounded-full text-green-700 font-medium">
                      {subtask.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 border-t border-gray-200">
            <span className="text-gray-500">No Subtasks</span>
          </div>
        )}

        <div className="w-full pb-2">
          <button
            onClick={handleCreateTask}
            disabled={!user.isAdmin}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled:text-gray-300"
          >
            <IoMdAdd className="text-lg" />
            <span>ADD TASK</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
