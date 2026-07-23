import mongoose from "mongoose";
import User from "./User.js";

const receptionSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true, sparse: true },
  shift: {
    type: String,
    enum: ["morning", "evening", "night"],
    default: "morning",
  },
  deskNumber: { type: String, trim: true },
});

receptionSchema.pre("save", function (next) {
  if (!this.employeeId) this.employeeId = `RC-${Date.now().toString(36).toUpperCase()}`;
  next();
});

const adminSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true, sparse: true },
  permissions: {
    type: [String],
    default: ["all"], // fine-grained permission strings can be added later
  },
  isSuperAdmin: { type: Boolean, default: false },
});

adminSchema.pre("save", function (next) {
  if (!this.employeeId) this.employeeId = `AD-${Date.now().toString(36).toUpperCase()}`;
  next();
});

const Reception = User.discriminators?.reception || User.discriminator("reception", receptionSchema);
const Admin = User.discriminators?.admin || User.discriminator("admin", adminSchema);

export { Reception, Admin };
