import React from "react";
import { useForm } from "react-hook-form";
import { useCreateProjectMutation } from "../../redux/slices/api/projectApiSlice";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createProject] = useCreateProjectMutation();

  const onSubmit = async (data) => {
    try {
      const response = await createProject(data).unwrap();
      console.log("Project created successfully:", response);
      navigate("/project");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-customplam mb-8">
        Create a New Project
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Project Name
          </label>
          <input
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", { required: "Project name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Team Members
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen border-gray-300"
            {...register("teamMembers")}
            placeholder="Add team members"
          />
        </div>
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Start Date
          </label>
          <input
            type="date"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
            {...register("startDate", { required: "Start date is required" })}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            End Date
          </label>
          <input
            type="date"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            }`}
            {...register("endDate", { required: "End date is required" })}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-800 font-semibold mb-2">
            Description
          </label>
          <textarea
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-customplam text-white font-bold py-3 px-6 rounded-2xl hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
