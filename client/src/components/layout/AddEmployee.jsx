import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Textbox from "../../components/Tools/Textbox";
import Loading from "../../components/Tools/Loader";
import Button from "../../components/Tools/Button";
import { toast } from "sonner";
import { useRegisterMutation } from "../../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../../redux/slices/api/userApiSlice";

const AddEmployee = ({ userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success("Profile updated successfully");

        if (userData?._id === user._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        await addNewUser({ ...data, password: data.password }).unwrap();
        toast.success("New User added successfully");
      }
      window.location.reload();
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="space-y-8 p-6">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <div
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {userData ? "UPDATE PROFILE" : "Create new Account"}
        </div>
        <div className="mt-2 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 bg-white p-8 rounded">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded-2xl "
            register={register("name", {
              required: "Full name is required!",
            })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder="Title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded-2xl "
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email id"
            className="w-full rounded-2xl "
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder="Role"
            type="text"
            name="role"
            label="Role"
            className="w-full rounded-2xl "
            register={register("role", {
              required: "User role is required!",
            })}
            error={errors.role ? errors.role.message : ""}
          />
          {!userData && (
            <Textbox
              placeholder="Password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-2xl"
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
          )}
        </div>
        {isLoading || isUpdating ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 text-center sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-customplam px-8 text-sm font-semibold text-white  hover:bg-green-700 sm:w-auto rounded-2xl"
              label={userData ? "Update" : "Add"}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddEmployee;
