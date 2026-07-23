import { motion } from "framer-motion";
import { CalendarCheck, Pill, FlaskConical, Receipt, Plus, Clock, Activity } from "lucide-react";
import { StatCard, Card, Badge } from "../../components/ui/Primitives";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const upcomingAppointments = [
  { doctor: "Dr. Anita Sharma", dept: "Cardiology", date: "Jul 15, 2026", time: "10:30 AM", status: "confirmed" },
  { doctor: "Dr. Vikram Rao", dept: "Neurology", date: "Jul 22, 2026", time: "2:00 PM", status: "pending" },
];

const recentActivity = [
  { label: "Lab report uploaded — Lipid Panel", time: "2 days ago", icon: FlaskConical },
  { label: "Prescription issued by Dr. Sharma", time: "5 days ago", icon: Pill },
  { label: "Invoice #INV-2291 paid", time: "1 week ago", icon: Receipt },
];

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold text-ink-900">
          Welcome back, {user?.firstName} 👋
        </h2>
        <p className="mt-1 text-sm text-ink-500">Here's what's happening with your health.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming appointments" value="2" icon={CalendarCheck} tone="clinical" />
        <StatCard label="Active prescriptions" value="3" icon={Pill} tone="vital" />
        <StatCard label="Pending lab reports" value="1" icon={FlaskConical} tone="amber" />
        <StatCard label="Outstanding balance" value="₹0" icon={Receipt} tone="vital" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-ink-900">Upcoming appointments</h3>
            <Link to="/patient/appointments" className="btn-primary !px-3 !py-1.5 !text-xs">
              <Plus className="h-3.5 w-3.5" /> Book new
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingAppointments.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-ink-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{a.doctor}</p>
                    <p className="text-xs text-ink-400">{a.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-ink-700">{a.date}</p>
                  <p className="text-xs text-ink-400 flex items-center justify-end gap-1">
                    <Clock className="h-3 w-3" /> {a.time}
                  </p>
                </div>
                <Badge tone={a.status === "confirmed" ? "success" : "warning"}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-semibold text-ink-900 flex items-center gap-2">
            <Activity className="h-4 w-4 text-clinical-600" /> Recent activity
          </h3>
          <div className="mt-4 space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink-500">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-ink-700">{item.label}</p>
                  <p className="text-xs text-ink-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
