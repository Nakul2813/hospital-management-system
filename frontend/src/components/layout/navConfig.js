import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Pill,
  FlaskConical,
  Receipt,
  Users,
  Stethoscope,
  Building2,
  BedDouble,
  BarChart3,
  Settings,
  UserPlus,
  ClipboardList,
  Bell,
  MessageSquare,
} from "lucide-react";

export const navConfig = {
  patient: [
    { label: "Overview", to: "/patient/dashboard", icon: LayoutDashboard },
    { label: "Appointments", to: "/patient/appointments", icon: CalendarCheck },
    { label: "Medical Records", to: "/patient/records", icon: FileText },
    { label: "Prescriptions", to: "/patient/prescriptions", icon: Pill },
    { label: "Lab Reports", to: "/patient/lab-reports", icon: FlaskConical },
    { label: "Billing", to: "/patient/billing", icon: Receipt },
    { label: "Messages", to: "/patient/messages", icon: MessageSquare },
  ],
  doctor: [
    { label: "Overview", to: "/doctor/dashboard", icon: LayoutDashboard },
    { label: "Today's Patients", to: "/doctor/patients", icon: Users },
    { label: "Schedule", to: "/doctor/schedule", icon: CalendarCheck },
    { label: "Prescriptions", to: "/doctor/prescriptions", icon: Pill },
    { label: "Patient Records", to: "/doctor/records", icon: FileText },
    { label: "Messages", to: "/doctor/messages", icon: MessageSquare },
  ],
  admin: [
    { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Doctors", to: "/admin/doctors", icon: Stethoscope },
    { label: "Patients", to: "/admin/patients", icon: Users },
    { label: "Departments", to: "/admin/departments", icon: Building2 },
    { label: "Beds & Rooms", to: "/admin/beds", icon: BedDouble },
    { label: "Pharmacy", to: "/admin/pharmacy", icon: Pill },
    { label: "Billing & Revenue", to: "/admin/billing", icon: Receipt },
    { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", to: "/admin/settings", icon: Settings },
  ],
  reception: [
    { label: "Overview", to: "/reception/dashboard", icon: LayoutDashboard },
    { label: "Register Patient", to: "/reception/register", icon: UserPlus },
    { label: "Appointments", to: "/reception/appointments", icon: CalendarCheck },
    { label: "Queue", to: "/reception/queue", icon: ClipboardList },
    { label: "Billing", to: "/reception/billing", icon: Receipt },
  ],
};

export const roleLabels = {
  patient: "Patient Portal",
  doctor: "Doctor Portal",
  admin: "Admin Console",
  reception: "Reception Desk",
};
