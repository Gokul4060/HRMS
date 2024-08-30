import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Textbox from "../Tools/Textbox";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const Tab5 = ({ control, register, errors,  setValue }) => {
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile && profile.hierarchyInformation) {
      const setFormValues = (obj, prefix = "") => {
        if (obj) {
          Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "object" && obj[key] !== null) {
              setFormValues(obj[key], `${prefix}${key}.`);
            } else {
              setValue(`${prefix}${key}`, obj[key] || "");
            }
          });
        }
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
    
    </div>
  );
};

export default Tab5;
