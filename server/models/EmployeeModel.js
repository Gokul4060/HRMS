import mongoose, { Schema } from "mongoose";

const WorkInformationSchema = new Schema(
  {
    department: { type: String, default: "" },
    location: { type: String, default: "" },
    designation: { type: String, default: "" },
    role: { type: String, default: "" },
    employeeType: { type: String, default: "" },
    employeeStatus: { type: String, default: "" },
    sourceOfHire: { type: String, default: "" },
    currentExperience: { type: String, default: "" },
    totalExperience: { type: String, default: "" },
  },
  { _id: false }
);

const PersonalInformationSchema = new Schema(
  {
   
    age: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    aboutMe: { type: String, required: true },
    expertise: { type: String, required: true },
  },
  { _id: false }
);

const ContactDetailsSchema = new Schema(
  {
    workPhoneNumber: { type: Number, default: "" },
    extension: { type: String, default: "" },
    seatingLocation: { type: String, default: "" },
    presentAddress: { type: String, default: "" },
    permanentAddress: { type: String, default: "" },
    personalMobileNumber: { type: String, default: "" },
    personalEmailAddress: { type: String, default: "" },
  },
  { _id: false }
);

const BankInformationSchema = new Schema(
  {
    bankHolderName: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    ifscCode: { type: String, default: "" },
    bankName: { type: String, default: "" },
  },
  { _id: false }
);

const HierarchyInformationSchema = new Schema(
  {
    reportingManager: { type: String, default: "" },
  },
  { _id: false }
);

const IdentityInformationSchema = new Schema(
  {
    uan: { type: String, default: "" },
    pan: { type: String, default: "" },
    aadhar: { type: Number, default: "" },
  },
  { _id: false }
);

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    email: { type: String, required: true },
    workInformation: { type: WorkInformationSchema, default: "" },
    personalInformation: { type: PersonalInformationSchema, default: "" },
    contactDetails: { type: ContactDetailsSchema, default: "" },
    bankInformation: { type: BankInformationSchema, default: "" },
    hierarchyInformation: { type: HierarchyInformationSchema, default: "" },
    identityInformation: { type: IdentityInformationSchema, default: "" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);


export default Employee;


