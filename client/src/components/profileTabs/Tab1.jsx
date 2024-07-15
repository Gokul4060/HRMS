import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Textbox from "../Tools/Textbox";
import { FaArrowRight } from "react-icons/fa6";

const Tab1 = ({ control, register, errors, nextTab, setValue }) => {
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
    <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
      <h1>Personal Information</h1>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Textbox
          placeholder="Enter"
          type="text"
          name="personalInformation.maritalStatus"
          label="Marital Status"
          className="w-full rounded-2xl"
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
          className="w-full rounded-2xl"
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
          className="w-full rounded-2xl"
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
          className="w-full rounded-2xl"
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
          className="w-full rounded-2xl"
          register={register("personalInformation.expertise", {
            required: "Expertise is required!",
          })}
          error={errors.personalInformation?.expertise?.message || ""}
        />
      </div>
      <div className="flex justify-end mt-4">
        <span className="bg-geen-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 rounded-2xl">
          <FaArrowRight onClick={nextTab} />
        </span>
      </div>
    </div>
  );
};

export default Tab1;
