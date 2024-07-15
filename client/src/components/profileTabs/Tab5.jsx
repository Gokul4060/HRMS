import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Textbox from "../Tools/Textbox";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const Tab5 = ({ control, register, errors, nextTab, prevTab, setValue }) => {
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

      setFormValues(profile.hierarchyInformation, "hierarchyInformation.");
    }
  }, [profile, setValue]);
  return (
    <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
      <h1>Hierarchy Information</h1>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Textbox
          placeholder="Enter Reporting Manager"
          type="text"
          name="hierarchyInformation.reportingManager"
          label="Reporting Manager"
          className="w-full rounded-2xl"
          register={register("hierarchyInformation.reportingManager", {
            required: "Reporting Manager is required!",
          })}
          error={errors.hierarchyInformation?.reportingManager?.message || ""}
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

export default Tab5;
