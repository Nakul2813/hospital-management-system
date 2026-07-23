import mongoose from "mongoose";
import User from "./User.js";

const availabilitySlotSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      required: true,
    },
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true }, // "17:00"
    slotDurationMinutes: { type: Number, default: 30 },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    unique: true,
    sparse: true,
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
    trim: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  qualifications: [{ type: String, trim: true }],
  experienceYears: { type: Number, default: 0, min: 0 },
  licenseNumber: { type: String, trim: true },
  consultationFee: { type: Number, default: 0, min: 0 },
  bio: { type: String, maxlength: 1000 },
  availability: [availabilitySlotSchema],
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 },
  },
  isAvailableForConsultation: { type: Boolean, default: true },
});

doctorSchema.pre("save", function (next) {
  if (!this.doctorId) {
    this.doctorId = `DR-${Date.now().toString(36).toUpperCase()}`;
  }
  next();
});

doctorSchema.index({ specialization: 1 });
doctorSchema.index({ department: 1 });

const Doctor = User.discriminators?.doctor || User.discriminator("doctor", doctorSchema);

export default Doctor;
