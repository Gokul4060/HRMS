import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import Loading from "../components/Tools/Loader";
import Title from "../components/Tools/Title";
import Button from "../components/Tools/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import {
  useDeleteRestoreTaskMutation,
  useGetAllTaskQuery,
} from "../redux/slices/api/taskApiSlice";
import ConfirmatioDialog from "../components/Tools/Dialogs";
import { toast } from "react-toastify";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const DeletedRecords = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "true",
    search: "",
  });

  const [deleteRestoreTask] = useDeleteRestoreTaskMutation();

  const deleteRestoreHandler = async () => {
    try {
      let result;

      switch (type) {
        case "delete":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "delete",
          }).unwrap();
          break;
        case "deleteAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "deleteAll",
          }).unwrap();
          break;
        case "restore":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restore",
          }).unwrap();
          break;
        case "restoreAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restoreAll",
          }).unwrap();
          break;
      }
      toast.success(result?.message);

      setTimeout(() => {
        setOpenDialog(false);
        refetch();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  if (isLoading)
    return (
      <div className="py-10">
        <Loading />
      </div>
    );

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2 line-clamp-1">Modified On</th>
        <th className="py-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border-b border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item?.stage])}
          />
          <p className="w-full line-clamp-2 text-base text-black">
            {item?.title || "Untitled"}
          </p>
        </div>
      </td>

      <td className="py-2 capitalize">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span>{item?.priority || "Unknown"}</span>
        </div>
      </td>

      <td className="py-2 capitalize text-center md:text-start">
        {item?.stage || "Unknown"}
      </td>
      <td className="py-2 text-sm">
        {item?.date ? new Date(item.date).toDateString() : "Unknown"}
      </td>

      <td className="py-2 flex gap-1 ">
        <Button
          icon={<MdOutlineRestore className="text-xl text-gray-500" />}
          onClick={() => restoreClick(item?._id)}
        />
        <Button
          icon={<MdDelete className="text-xl text-red-600" />}
          onClick={() => deleteClick(item?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Title title="" />
        <div className="flex gap-2 md:gap-4 items-center">
          <Button
            label="Restore All"
            icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
            className="flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5"
            onClick={restoreAllClick}
          />
          <Button
            label="Delete All"
            icon={<MdDelete className="text-lg hidden md:flex" />}
            className="flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
            onClick={deleteAllClick}
          />
        </div>
      </div>
      <div className="bg-white py-3 rounded-2xl shadow-2xl p-5 border-b-2 border-green-600 mt-5">
        <h4 className="relative ml-2 inline-block text-1xl font-bold leading-none mt-9 ">
          Delected Records
        </h4>

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
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            <TableHeader />
            <tbody>
              {data?.tasks?.map((tk, id) => (
                <TableRow key={id} item={tk} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={deleteRestoreHandler}
      />
    </>
  );
};

export default DeletedRecords;
