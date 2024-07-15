import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Textbox from "../Tools/Textbox";
import { FaArrowLeft } from "react-icons/fa6";

const Tab6 = ({ control, register, errors, prevTab, setValue }) => {
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

      setFormValues(profile.identityInformation, "identityInformation.");
    }
  }, [profile, setValue]);

  return (
    <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
      <h1>Identity Information</h1>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Textbox
          placeholder="Enter UAN"
          type="text"
          name="identityInformation.uan"
          label="UAN"
          className="w-full rounded-2xl"
          register={register("identityInformation.uan", {
            required: "UAN is required!",
          })}
          error={errors.identityInformation?.uan?.message || ""}
        />
        <Textbox
          placeholder="Enter PAN"
          type="text"
          name="identityInformation.pan"
          label="PAN"
          className="w-full rounded-2xl"
          register={register("identityInformation.pan", {
            required: "PAN is required!",
          })}
          error={errors.identityInformation?.pan?.message || ""}
        />
        <Textbox
          placeholder="Enter Aadhar"
          type="text"
          name="identityInformation.aadhar"
          label="Aadhar"
          className="w-full rounded-2xl"
          register={register("identityInformation.aadhar", {
            required: "Aadhar is required!",
          })}
          error={errors.identityInformation?.aadhar?.message || ""}
        />
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <span className="bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 rounded-2xl">
          <FaArrowLeft onClick={prevTab} />
        </span>
      </div>
    </div>
  );
};

export default Tab6;
