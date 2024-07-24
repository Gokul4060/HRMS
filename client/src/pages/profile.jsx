import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateEmployeeMutation,
  useFetchEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../redux/slices/api/profileApiSlice";
import Textbox from "../components/Tools/Textbox";
import Button from "../components/Tools/Button";
import Tabs from "../components/layout/Tab";
import Profile from "../assets/pexel.jpg";
import Loading from "../components/Tools/Loader";
import { toast } from "sonner";
import { saveProfile, setProfile } from "../redux/slices/profileSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useFetchEmployeeQuery();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const [createEmployee, { isLoading: isSubmitting }] =
    useCreateEmployeeMutation();

  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(Profile);

  useEffect(() => {
    if (data) {
      dispatch(setProfile(data));

      const setFormValues = (obj, prefix = "") => {
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            setFormValues(obj[key], `${prefix}${key}.`);
          } else {
            setValue(`${prefix}${key}`, obj[key] || "");
          }
        });
      };

      setFormValues(data);
    }
  }, [data, dispatch, setValue]);

  const handleOnSubmit = async (formData) => {
    try {
      let result;
      let message = "";
      const previousData = data || {};
      const basicInfoFields = [
        "name",
        "gender",
        "dateOfBirth",
        "nationality",
        "email",
      ];
      if (data) {
        result = await updateEmployee(formData).unwrap();
        const updatedFields = Object.keys(formData).filter(
          (key) => formData[key] !== previousData[key]
        );
        const updatedBasicInfoFields = updatedFields.filter((field) =>
          basicInfoFields.includes(field)
        );
        if (updatedBasicInfoFields.length > 0) {
          message = `${user?.name}.'s Basic info updated successfully`;
        } else {
          message = "No changes were made.";
        }
      } else {
        result = await createEmployee(formData).unwrap();
        message = "Profile saved successfully";
      }
      dispatch(saveProfile(result));
      dispatch(setProfile(result));
      toast.success(message);
    } catch (error) {
      toast.error("Failed to save profile");
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full md:px-4 px-2 mb-6 p-5">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center w-full md:w-1/3 bg-gray-100 p-6 rounded-2xl">
              <div
                className="relative w-36 h-36 rounded-full cursor-pointer mb-4"
                onClick={handleProfilePictureClick}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
                {user?.name}
              </h1>
              <div className="">
                <ul className="mt-3 divide-y w-48 p-10 bg-white py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow rounded-lg">
                  <li className="flex items-center py-3 text-sm">
                    <span>Status:</span>
                    <span className="ml-auto">
                      <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700 ">
                        {user?.isActive ? "Active" : "Disabled"}
                      </span>
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-sm text-gray-600">
                    <span>Role:</span>
                    <span className="ml-auto">{user?.role}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-2xl font-bold mb-4">Basic Information</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Textbox
                  placeholder={user?.name}
                  type="text"
                  name="name"
                  label="Full Name"
                  className="w-full rounded-2xl"
                  register={register("name", { required: "Name is required!" })}
                  error={errors.name ? errors.name.message : ""}
                />
                <Textbox
                  placeholder="Gender"
                  type="text"
                  name="gender"
                  label="Gender"
                  className="w-full rounded-2xl"
                  register={register("gender", {
                    required: "Gender is required!",
                  })}
                  error={errors.gender ? errors.gender.message : ""}
                />
                <Textbox
                  placeholder="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  label="Date of Birth"
                  className="w-full rounded-2xl"
                  register={register("dateOfBirth", {
                    required: "Date of Birth is required!",
                  })}
                  error={errors.dateOfBirth ? errors.dateOfBirth.message : ""}
                />
                <Textbox
                  placeholder="Nationality"
                  name="nationality"
                  label="Nationality"
                  className="w-full rounded-2xl"
                  register={register("nationality", {
                    required: "Nationality is required!",
                  })}
                  error={errors.nationality ? errors.nationality.message : ""}
                />
                <Textbox
                  placeholder={user?.email || "Email"}
                  type="email"
                  name="email"
                  label="Email"
                  className="w-full rounded-2xl"
                  register={register("email", {
                    required: "Email is required!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 ">
          <Tabs
            control={control}
            register={register}
            errors={errors}
            setValue={setValue}
          />
          {isSubmitting || isUpdating ? (
            <div className="flex justify-center py-5">
              <Loading />
            </div>
          ) : (
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-2xl hover:bg-blue-700 transition duration-300"
                label="Submit"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
