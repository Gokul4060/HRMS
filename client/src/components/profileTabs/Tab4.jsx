import React, { useEffect } from "react";
import Textbox from "../Tools/Textbox";
import { useSelector } from "react-redux";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const Tab4 = ({ control, register, errors,  setValue }) => {
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile && profile.bankInformation) {
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

      setFormValues(profile.bankInformation, "bankInformation.");
    }
  }, [profile, setValue]);

  return (
    <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
      <h1>Bank Information</h1>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Textbox
          placeholder="Enter Bank Holder Name"
          type="text"
          name="bankInformation.bankHolderName"
          label="Bank Holder Name"
          className="w-full rounded-2xl"
          register={register("bankInformation.bankHolderName", {
            required: "Bank Holder Name is required!",
          })}
          error={errors.bankInformation?.bankHolderName?.message || ""}
        />
        <Textbox
          placeholder="Enter Account Number"
          type="text"
          name="bankInformation.accountNumber"
          label="Account Number"
          className="w-full rounded-2xl"
          register={register("bankInformation.accountNumber", {
            required: "Account Number is required!",
          })}
          error={errors.bankInformation?.accountNumber?.message || ""}
        />
        <Textbox
          placeholder="Enter IFSC Code"
          type="text"
          name="bankInformation.ifscCode"
          label="IFSC Code"
          className="w-full rounded-2xl"
          register={register("bankInformation.ifscCode", {
            required: "IFSC Code is required!",
          })}
          error={errors.bankInformation?.ifscCode?.message || ""}
        />
        <Textbox
          placeholder="Enter Bank Name"
          type="text"
          name="bankInformation.bankName"
          label="Bank Name"
          className="w-full rounded-2xl"
          register={register("bankInformation.bankName", {
            required: "Bank Name is required!",
          })}
          error={errors.bankInformation?.bankName?.message || ""}
        />
      </div>
    
    </div>
  );
};

export default Tab4;
