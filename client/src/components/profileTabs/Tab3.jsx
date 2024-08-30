import React, { useEffect } from "react";
import Textbox from "../Tools/Textbox";
import { useSelector } from "react-redux";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const Tab3 = ({ control, register, errors,  setValue }) => {
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile && profile.contactDetails) {
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

      setFormValues(profile.contactDetails, "contactDetails.");
    }
  }, [profile, setValue]);

  return (
    <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
      <h1>Contact Information</h1>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Textbox
          placeholder="Enter Work Phone Number"
          type="text"
          name="contactDetails.workPhoneNumber"
          label="Work Phone Number"
          className="w-full rounded-2xl"
          register={register("contactDetails.workPhoneNumber", {
            required: "Work Phone Number is required!",
          })}
          error={errors.contactDetails?.workPhoneNumber?.message || ""}
        />
        <Textbox
          placeholder="Enter Extension"
          type="text"
          name="contactDetails.extension"
          label="Extension"
          className="w-full rounded-2xl"
          register={register("contactDetails.extension", {
            required: "Extension is required!",
          })}
          error={errors.contactDetails?.extension?.message || ""}
        />
        <Textbox
          placeholder="Enter Seating Location"
          type="text"
          name="contactDetails.seatingLocation"
          label="Seating Location"
          className="w-full rounded-2xl"
          register={register("contactDetails.seatingLocation", {
            required: "Seating Location is required!",
          })}
          error={errors.contactDetails?.seatingLocation?.message || ""}
        />
        <Textbox
          placeholder="Enter Present Address"
          type="text"
          name="contactDetails.presentAddress"
          label="Present Address"
          className="w-full rounded-2xl"
          register={register("contactDetails.presentAddress", {
            required: "Present Address is required!",
          })}
          error={errors.contactDetails?.presentAddress?.message || ""}
        />
        <Textbox
          placeholder="Enter Permanent Address"
          type="text"
          name="contactDetails.permanentAddress"
          label="Permanent Address"
          className="w-full rounded-2xl"
          register={register("contactDetails.permanentAddress", {
            required: "Permanent Address is required!",
          })}
          error={errors.contactDetails?.permanentAddress?.message || ""}
        />
        <Textbox
          placeholder="Enter Personal Mobile Number"
          type="text"
          name="contactDetails.personalMobileNumber"
          label="Personal Mobile Number"
          className="w-full rounded-2xl"
          register={register("contactDetails.personalMobileNumber", {
            required: "Personal Mobile Number is required!",
          })}
          error={errors.contactDetails?.personalMobileNumber?.message || ""}
        />
        <Textbox
          placeholder="Enter Personal Email Address"
          type="text"
          name="contactDetails.personalEmailAddress"
          label="Personal Email Address"
          className="w-full rounded-2xl"
          register={register("contactDetails.personalEmailAddress", {
            required: "Personal Email Address is required!",
          })}
          error={errors.contactDetails?.personalEmailAddress?.message || ""}
        />
      </div>
   
    </div>
  );
};

export default Tab3;
