import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy", timestamp: new Date().toISOString() });
});

router.use("/auth", authRoutes);

// Stage 3 will add:
// router.use("/patients", patientRoutes);
// router.use("/doctors", doctorRoutes);
// router.use("/appointments", appointmentRoutes);
// router.use("/medical-records", medicalRecordRoutes);
// router.use("/billing", billingRoutes);
// router.use("/pharmacy", pharmacyRoutes);
// router.use("/lab", labRoutes);
// router.use("/departments", departmentRoutes);
// router.use("/notifications", notificationRoutes);

export default router;
