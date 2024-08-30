import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Textbox from "../Tools/Textbox";
import Textarea from "../Tools/Textarea";
import { FaArrowLeft } from "react-icons/fa6";

const Tab7 = ({ control, register, errors, prevTab, setValue }) => {
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile && profile.exitInformation) {
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

      setFormValues(profile.exitInformation, "exitInformation.");
    }
  }, [profile, setValue]);

  return (
    <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
      <h1>Exit Information</h1>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Textbox
          placeholder="Enter Resignation Letter Date"
          type="text"
          name="exitInformation.resignationLetterDate"
          label="Resignation Letter Date"
          className="w-full rounded-2xl"
          register={register("exitInformation.resignationLetterDate", {
            required: "Resignation Letter Date is required!",
          })}
          error={errors.exitInformation?.resignationLetterDate?.message || ""}
        />
        <Textbox
          placeholder="Enter Exit Interview Date"
          type="date"
          name="exitInformation.exitInterviewDate"
          label="Exit Interview Held On"
          className="w-full rounded-2xl"
          register={register("exitInformation.exitInterviewDate", {
            required: "Exit Interview Date is required!",
          })}
          error={errors.exitInformation?.exitInterviewDate?.message || ""}
        />
        <Textbox
          placeholder="Enter Relieving Date"
          type="date"
          name="exitInformation.relievingDate"
          label="Relieving Date"
          className="w-full rounded-2xl"
          register={register("exitInformation.relievingDate", {
            required: "Relieving Date is required!",
          })}
          error={errors.exitInformation?.relievingDate?.message || ""}
        />
        <Textbox
          placeholder="Leave Encashed"
          type="text"
          name="exitInformation.leaveEncashed"
          label="Leave Encashed?"
          className="w-full rounded-2xl"
          register={register("exitInformation.leaveEncashed", {
            required: "Leave Encashed information is required!",
          })}
          error={errors.exitInformation?.leaveEncashed?.message || ""}
        />
        <Textbox
          placeholder="Enter New Workplace"
          type="text"
          name="exitInformation.newWorkplace"
          label="New Workplace"
          className="w-full rounded-2xl"
          register={register("exitInformation.newWorkplace", {
            required: "New Workplace is required!",
          })}
          error={errors.exitInformation?.newWorkplace?.message || ""}
        />
        <Textarea
          placeholder="Enter the reason"
          name="exitInformation.reasonForLeaving"
          label="Reason for Leaving"
          className="w-full rounded-2xl"
          register={register("exitInformation.reasonForLeaving", {
            required: "Reason for Leaving is required!",
          })}
          error={errors.exitInformation?.reasonForLeaving?.message || ""}
        />
        <Textarea
          placeholder="Enter your feedback"
          name="exitInformation.feedback"
          label="Feedback"
          className="w-full rounded-2xl"
          register={register("exitInformation.feedback", {
            required: "Feedback is required!",
          })}
          error={errors.exitInformation?.feedback?.message || ""}
        />
      </div>

    </div>
  );
};

export default Tab7;
