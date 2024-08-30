import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Textbox from "../Tools/Textbox";
import { FaArrowRight } from "react-icons/fa6";

const Tab1 = ({ control, register, errors,  setValue }) => {
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

      setFormValues(profile.personalInformation, "personalInformation.");
    }
  }, [profile, setValue]);

  return (
    <div className="bg-white from-white to-gray-100 px-6 pt-10 pb-12 rounded-3xl ">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Personal Information
      </h1>
      <div className="grid gap-6 sm:grid-cols-2">
        <Textbox
          placeholder="Enter"
          type="text"
          name="personalInformation.maritalStatus"
          label="Marital Status"
          className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500"
          register={register("personalInformation.maritalStatus", {
            required: "Marital Status is required!",
          })}
          error={errors.personalInformation?.maritalStatus?.message || ""}
        />
        <Textbox
          placeholder="Enter Age"
          type="text"
          name="personalInformation.age"
          label="Age"
          className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500"
          register={register("personalInformation.age", {
            required: "Age is required!",
          })}
          error={errors.personalInformation?.age?.message || ""}
        />
        <Textbox
          placeholder="Enter Blood Group"
          type="text"
          name="personalInformation.bloodGroup"
          label="Blood Group"
          className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500"
          register={register("personalInformation.bloodGroup", {
            required: "Blood Group is required!",
          })}
          error={errors.personalInformation?.bloodGroup?.message || ""}
        />
        <Textbox
          placeholder="Write"
          type="text"
          name="personalInformation.aboutMe"
          label="About Me"
          className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500"
          register={register("personalInformation.aboutMe", {
            required: "About Me is required!",
          })}
          error={errors.personalInformation?.aboutMe?.message || ""}
        />
        <Textbox
          placeholder="....."
          type="text"
          name="personalInformation.expertise"
          label="Expertise"
          className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500"
          register={register("personalInformation.expertise", {
            required: "Expertise is required!",
          })}
          error={errors.personalInformation?.expertise?.message || ""}
        />
      </div>
     
    </div>
  );
};

export default Tab1;
