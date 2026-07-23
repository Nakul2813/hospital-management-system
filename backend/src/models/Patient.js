import mongoose from "mongoose";
import User from "./User.js";

const patientSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"],
    default: "unknown",
  },
  height: { type: Number }, // cm
  weight: { type: Number }, // kg
  allergies: [{ type: String, trim: true }],
  chronicConditions: [{ type: String, trim: true }],
  emergencyContact: {
    name: { type: String, trim: true },
    relationship: { type: String, trim: true },
    phone: { type: String, trim: true },
  },
  insurance: {
    provider: { type: String, trim: true },
    policyNumber: { type: String, trim: true },
    validTill: { type: Date },
  },
  patientId: {
    type: String,
    unique: true,
    sparse: true,
  },
  assignedDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Auto-generate a human-friendly patient ID
patientSchema.pre("save", function (next) {
  if (!this.patientId) {
    this.patientId = `PT-${Date.now().toString(36).toUpperCase()}`;
  }
  next();
});

const Patient = User.discriminators?.patient || User.discriminator("patient", patientSchema);

export default Patient;
