import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import Textbox from "../Tools/Textbox";
import Button from "../Tools/Button";
import img from "../../assets/undraw_building_blocks_re_5ahy.svg";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const { id } = location.state;

  const [addSbTask] = useCreateSubTaskMutation();
  const navigate = useNavigate();

  const handleOnSubmit = async (data) => {
    console.log(data); // Log the form data
    try {
      const res = await addSbTask({ data, id }).unwrap();
      toast.success("Task assigned successfully");
      setTimeout(() => {
        navigate("/task");
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex justify-center mt-4 bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-start mt-8">
          <h2 className="text-2xl font-bold text-center text-green-900 mb-2">
            Add Task
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Provide details to create a new task and assign it to a project.
          </p>
          <div className="mt-9">
            <img src={img} className="mb-8" style={{ maxWidth: "300px" }} />
          </div>
        </div>
        <div>
          <form
            className="mt-8 border border-white shadow-2xl p-8 rounded-2xl "
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <div className="w-full mb-4">
              <Textbox
                placeholder="Task title"
                type="text"
                name="title"
                label="Title"
                className="w-full rounded-2xl border border-green-400 p-2.5 focus:ring focus:ring-green-300"
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors.title ? errors.title.message : ""}
              />
            </div>
            <div className="w-full mb-4">
              <Textbox
                placeholder="Tag"
                type="text"
                name="tag"
                label="Tag"
                className="w-full rounded-2xl border border-green-400 p-2.5 focus:ring focus:ring-green-300"
                register={register("tag", {
                  required: "Tag is required!",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
            <div className="w-full mb-4">
              <Textbox
                placeholder="Start Date"
                type="date"
                name="startDate"
                label="Start Date"
                className="w-full rounded-2xl border border-green-400 p-2.5 focus:ring focus:ring-green-300"
                register={register("startDate", {
                  required: "Start Date is required!",
                })}
                error={errors.startDate ? errors.startDate.message : ""}
              />
            </div>
            <div className="w-full mb-4">
              <Textbox
                placeholder="End Date"
                type="date"
                name="endDate"
                label="End Date"
                className="w-full rounded-2xl border border-green-400 p-2.5 focus:ring focus:ring-green-300"
                register={register("endDate", {
                  required: "End Date is required!",
                })}
                error={errors.endDate ? errors.endDate.message : ""}
              />
            </div>
            <div className="w-full flex justify-end mt-4">
              <Button
                label="Add "
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
