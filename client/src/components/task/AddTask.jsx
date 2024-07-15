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
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add Task
        </h1>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Sub-Task title"
              type="text"
              name="title"
              label="Title"
              className="w-full rounded border border-gray-300 p-2"
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className="flex items-center gap-4">
              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded border border-gray-300 p-2"
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
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
            </div>
          </div>
          <div className="py-3 mt-6 flex sm:flex-row-reverse gap-4">
            <Button
              type="submit"
              className="bg-customplam text-sm font-semibold text-white hover:bg-green-700 sm:ml-3 sm:w-auto rounded-2xl py-2 px-4"
              label="Add Task"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
