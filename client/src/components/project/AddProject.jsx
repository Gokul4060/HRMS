import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/slices/api/taskApiSlice.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../utils/firebase.js";
import { toast } from "sonner";
import UserList from "../layout/UserList.jsx";
import SelectList from "../Tools/SelectList.jsx";
import { BiImages } from "react-icons/bi";
import Button from "../Tools/Button.jsx";
import Textbox from "../Tools/Textbox.jsx";

const LISTS = ["TODO", "PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const Addd = ({ task }) => {
  const navigate = useNavigate();

  const defaultValues = {
    title: task?.title || "",
    team: task?.team || [],
    stage: task?.stage?.toUpperCase() || LISTS[0],
    priority: task?.priority?.toUpperCase() || PRIORITY[2],
    startDate: task?.startDate || "",
    endDate: task?.endDate || "",
    assets: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );

  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task.assets] : [];

  const submitHandler = async (data) => {
    console.log("Submitting task data:", data);

    // Handle file uploads
    for (const file of assets) {
      setUploading(true);
      try {
        console.log("Uploading file:", file.name);
        await uploadFile(file);
        console.log("Uploaded file URL:", uploadedFileURLs);
      } catch (error) {
        console.error("Error uploading file:", error.message);
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const newData = {
        ...data,
        assets: [...URLS, ...uploadedFileURLs],
        team,
        stage,
        priority,
      };

      console.log("Final task data:", newData);

      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      console.log("API response:", res);

      toast.success("Project successfully created");

      setTimeout(() => {
        navigate("/task");
      }, 500);
    } catch (err) {
      console.log("Error creating/updating task:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploading...");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadedFileURLs.push(downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  return (
    <div className="flex justify-center mt-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-9 w-full ">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-8">
          {task ? "Edit Task" : "Create Project"}
        </h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-2">
              Project Title
            </label>
            <input
              placeholder="Project Title"
              type="text"
              name="title"
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring focus:ring-green-300"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="w-full">
            <UserList setTeam={setTeam} team={team} />
          </div>

          <div className="w-full">
            <SelectList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />
          </div>
          <div className="w-full">
            <SelectList
              label="Project Status"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-2">
              Start Date
            </label>
            <Textbox
              placeholder="Start Date"
              type="date"
              name="startDate"
              {...register("startDate", {
                required: "Start date is required!",
              })}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-2">
              End Date
            </label>
            <Textbox
              placeholder="End Date"
              type="date"
              name="endDate"
              {...register("endDate", { required: "End date is required!" })}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>
          <div className="col-span-2 mt-4">
            <label
              className="flex items-center gap-2 text-green-500 hover:text-green-700 cursor-pointer"
              htmlFor="imgUpload"
            >
              <BiImages size={24} />
              <span className="font-semibold">Add Assets</span>
              <input
                type="file"
                className="hidden"
                id="imgUpload"
                onChange={handleSelect}
                accept=".jpg, .png, .jpeg"
                multiple={true}
              />
            </label>
          </div>
          <div className="col-span-2 flex justify-end mt-4">
            {uploading ? (
              <span className="text-red-500">Uploading assets...</span>
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addd;
