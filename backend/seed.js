import dotenv from "dotenv";
dotenv.config();

import { connectDB, disconnectDB } from "./src/config/db.js";
import User from "./src/models/User.js";
import Patient from "./src/models/Patient.js";
import Doctor from "./src/models/Doctor.js";
import { Reception, Admin } from "./src/models/StaffProfiles.js";

const seed = async () => {
  await connectDB();
  console.log("🌱 Seeding database...");

  await User.deleteMany({ includeDeleted: true });

  const admin = await Admin.create({
    firstName: "Rajesh",
    lastName: "Verma",
    email: "admin@hospital.com",
    password: "Admin@123",
    phone: "+91-9876500001",
    gender: "male",
    isEmailVerified: true,
    isSuperAdmin: true,
    permissions: ["all"],
  });

  const doctor = await Doctor.create({
    firstName: "Anita",
    lastName: "Sharma",
    email: "dr.sharma@hospital.com",
    password: "Doctor@123",
    phone: "+91-9876500002",
    gender: "female",
    isEmailVerified: true,
    specialization: "Cardiology",
    qualifications: ["MBBS", "MD - Cardiology"],
    experienceYears: 12,
    licenseNumber: "MCI-2024-88123",
    consultationFee: 800,
    bio: "Senior cardiologist with 12 years of experience in interventional cardiology.",
    availability: [
      { day: "Monday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 },
      { day: "Wednesday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 },
      { day: "Friday", startTime: "14:00", endTime: "18:00", slotDurationMinutes: 30 },
    ],
    rating: { average: 4.8, count: 156 },
  });

  const patient = await Patient.create({
    firstName: "Rohan",
    lastName: "Mehta",
    email: "patient@hospital.com",
    password: "Patient@123",
    phone: "+91-9876500003",
    gender: "male",
    dateOfBirth: new Date("1994-03-15"),
    isEmailVerified: true,
    bloodGroup: "O+",
    height: 175,
    weight: 72,
    allergies: ["Penicillin"],
    emergencyContact: { name: "Priya Mehta", relationship: "Spouse", phone: "+91-9876500004" },
  });

  const reception = await Reception.create({
    firstName: "Kavita",
    lastName: "Nair",
    email: "reception@hospital.com",
    password: "Reception@123",
    phone: "+91-9876500005",
    gender: "female",
    isEmailVerified: true,
    shift: "morning",
    deskNumber: "Desk-1",
  });

  console.log("✅ Seeded users:");
  console.log(`   Admin:     ${admin.email} / Admin@123`);
  console.log(`   Doctor:    ${doctor.email} / Doctor@123`);
  console.log(`   Patient:   ${patient.email} / Patient@123`);
  console.log(`   Reception: ${reception.email} / Reception@123`);

  await disconnectDB();
  process.exit(0);
};

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
