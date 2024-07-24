import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Textbox from "../Tools/Textbox";
import Button from "../Tools/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";

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
    <div className="flex justify-center w-full items-center mt-8 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add Task
        </h1>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Textbox
            placeholder="Task title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded border border-gray-300 p-2"
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder="Tag"
            type="text"
            name="tag"
            label="Tag"
            className="w-full rounded border border-gray-300 p-2"
            register={register("tag", {
              required: "Tag is required!",
            })}
            error={errors.tag ? errors.tag.message : ""}
          />
          <Textbox
            placeholder="Start Date"
            type="date"
            name="startDate"
            label="Start Date"
            className="w-full rounded border border-gray-300 p-2"
            register={register("startDate", {
              required: "Start Date is required!",
            })}
            error={errors.startDate ? errors.startDate.message : ""}
          />
          <Textbox
            placeholder="End Date"
            type="date"
            name="endDate"
            label="End Date"
            className="w-full rounded border border-gray-300 p-2"
            register={register("endDate", {
              required: "End Date is required!",
            })}
            error={errors.endDate ? errors.endDate.message : ""}
          />
          <div className="col-span-2 flex justify-end mt-6">
            <Button
              type="submit"
              className="bg-customplam text-sm font-semibold text-white hover:bg-green-700 rounded-2xl py-2 px-4"
              label="Add Task"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
