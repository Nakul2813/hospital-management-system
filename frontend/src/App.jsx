import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./redux/slices/authSlice";

import ProtectedRoute from "./components/layout/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

import Landing from "./pages/public/Landing";
import NotFound from "./pages/public/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientRecords from "./pages/patient/PatientRecords";
import PatientPrescriptions from "./pages/patient/PatientPrescriptions";
import PatientLabReports from "./pages/patient/PatientLabReports";
import PatientBilling from "./pages/patient/PatientBilling";
import PatientMessages from "./pages/patient/PatientMessages";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import DoctorPrescriptions from "./pages/doctor/DoctorPrescriptions";
import DoctorRecords from "./pages/doctor/DoctorRecords";
import DoctorMessages from "./pages/doctor/DoctorMessages";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminBeds from "./pages/admin/AdminBeds";
import AdminPharmacy from "./pages/admin/AdminPharmacy";
import AdminBilling from "./pages/admin/AdminBilling";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

import ReceptionDashboard from "./pages/reception/ReceptionDashboard";
import ReceptionRegister from "./pages/reception/ReceptionRegister";
import ReceptionAppointments from "./pages/reception/ReceptionAppointments";
import ReceptionQueue from "./pages/reception/ReceptionQueue";
import ReceptionBilling from "./pages/reception/ReceptionBilling";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.ui.theme);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Patient portal */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="records" element={<PatientRecords />} />
        <Route path="prescriptions" element={<PatientPrescriptions />} />
        <Route path="lab-reports" element={<PatientLabReports />} />
        <Route path="billing" element={<PatientBilling />} />
        <Route path="messages" element={<PatientMessages />} />
      </Route>

      {/* Doctor portal */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="schedule" element={<DoctorSchedule />} />
        <Route path="prescriptions" element={<DoctorPrescriptions />} />
        <Route path="records" element={<DoctorRecords />} />
        <Route path="messages" element={<DoctorMessages />} />
      </Route>

      {/* Admin portal */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="beds" element={<AdminBeds />} />
        <Route path="pharmacy" element={<AdminPharmacy />} />
        <Route path="billing" element={<AdminBilling />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Reception portal */}
      <Route
        path="/reception"
        element={
          <ProtectedRoute allowedRoles={["reception"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ReceptionDashboard />} />
        <Route path="register" element={<ReceptionRegister />} />
        <Route path="appointments" element={<ReceptionAppointments />} />
        <Route path="queue" element={<ReceptionQueue />} />
        <Route path="billing" element={<ReceptionBilling />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
