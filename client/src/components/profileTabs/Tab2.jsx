import React, { useEffect } from "react";
import Textbox from "../Tools/Textbox";
import { useSelector } from "react-redux";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Tab2 = ({ control, register, errors, nextTab, prevTab, setValue }) => {
  const { profile } = useSelector((state) => state.profile);
  useEffect(() => {
    if (profile) {
      const setFormValues = (obj, prefix = "") => {
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            setFormValues(obj[key], `${prefix}${key}.`);
          } else {
            setValue(`${prefix}${key}`, obj[key] || "");
          }
        });
      };

      setFormValues(profile.workInformation, "workInformation.");
    }
  }, [profile, setValue]);

  return (
    <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
      <h1>Work Information</h1>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Textbox
          placeholder="Enter Department"
          type="text"
          name="workInformation.department"
          label="Department"
          className="w-full rounded-2xl"
          register={register("workInformation.department", {
            required: "Department is required!",
          })}
          error={errors.workInformation?.department?.message || ""}
        />
        <Textbox
          placeholder="Enter Location"
          type="text"
          name="workInformation.location"
          label="Location"
          className="w-full rounded-2xl"
          register={register("workInformation.location", {
            required: "Location is required!",
          })}
          error={errors.workInformation?.location?.message || ""}
        />
        <Textbox
          placeholder="Enter Designation"
          type="text"
          name="workInformation.designation"
          label="Designation"
          className="w-full rounded-2xl"
          register={register("workInformation.designation", {
            required: "Designation is required!",
          })}
          error={errors.workInformation?.designation?.message || ""}
        />
        <Textbox
          placeholder="Enter Role"
          type="text"
          name="workInformation.role"
          label="Role"
          className="w-full rounded-2xl"
          register={register("workInformation.role", {
            required: "Role is required!",
          })}
          error={errors.workInformation?.role?.message || ""}
        />
        <Textbox
          placeholder="Enter Employee Type"
          type="text"
          name="workInformation.employeeType"
          label="Employee Type"
          className="w-full rounded-2xl"
          register={register("workInformation.employeeType", {
            required: "Employee Type is required!",
          })}
          error={errors.workInformation?.employeeType?.message || ""}
        />
        <Textbox
          placeholder="Enter Employee Status"
          type="text"
          name="workInformation.employeeStatus"
          label="Employee Status"
          className="w-full rounded-2xl"
          register={register("workInformation.employeeStatus", {
            required: "Employee Status is required!",
          })}
          error={errors.workInformation?.employeeStatus?.message || ""}
        />
        <Textbox
          placeholder="Enter Source of Hire"
          type="text"
          name="workInformation.sourceOfHire"
          label="Source of Hire"
          className="w-full rounded-2xl"
          register={register("workInformation.sourceOfHire", {
            required: "Source of Hire is required!",
          })}
          error={errors.workInformation?.sourceOfHire?.message || ""}
        />
        <Textbox
          placeholder="Enter Current Experience"
          type="text"
          name="workInformation.currentExperience"
          label="Current Experience"
          className="w-full rounded-2xl"
          register={register("workInformation.currentExperience", {
            required: "Current Experience is required!",
          })}
          error={errors.workInformation?.currentExperience?.message || ""}
        />
        <Textbox
          placeholder="Enter Total Experience"
          type="text"
          name="workInformation.totalExperience"
          label="Total Experience"
          className="w-full rounded-2xl"
          register={register("workInformation.totalExperience", {
            required: "Total Experience is required!",
          })}
          error={errors.workInformation?.totalExperience?.message || ""}
        />
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <span className="bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 rounded-2xl">
          <FaArrowLeft onClick={prevTab} />
        </span>
        <span className="bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 rounded-2xl">
          <FaArrowRight onClick={nextTab} />
        </span>
      </div>
    </div>
  );
};

export default Tab2;
