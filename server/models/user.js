import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

// Define the embedded profile schema
const profileSchema = new Schema({
  basicInformation: {
    phoneNumber: { type: String },
    gender: { type: String },
    dob: { type: Date },
  },
  workInformation: {
    department: { type: String },
    designation: { type: String },
    dateOfJoining: { type: Date },
  },
  contactInformation: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
  bankInformation: {
    accountHolderName: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
  },
  hierarchyInformation: {
    manager: { type: String },
    team: { type: String },
  },
  identityInformation: {
    panNumber: { type: String },
    aadharNumber: { type: String },
  },
  resignationInformation: {
    resignationDate: { type: Date },
  },
});

// Update the main User schema to include the embedded profile schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isManager: { type: Boolean, required: true, default: false },
    isDeveloper: { type: Boolean, required: true, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    isActive: { type: Boolean, required: true, default: true },
    profile: profileSchema, // Embed the profile schema here
  },
  { timestamps: true }
);

// Pre-save middleware to hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match user password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
const User = mongoose.model("User", userSchema);

export default User;
