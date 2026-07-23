import { motion } from "framer-motion";
import { Users, CalendarCheck, DollarSign, Star, Clock } from "lucide-react";
import { StatCard, Card, Badge } from "../../components/ui/Primitives";
import { useAuth } from "../../hooks/useAuth";

const todaysPatients = [
  { name: "Rohan Mehta", time: "10:30 AM", reason: "Follow-up: Hypertension", status: "checked-in" },
  { name: "Priya Desai", time: "11:15 AM", reason: "New consultation", status: "waiting" },
  { name: "Suresh Kumar", time: "12:00 PM", reason: "Post-surgery review", status: "scheduled" },
];

export default function DoctorDashboard() {
  const { user } = useAuth();
  const statusTone = { "checked-in": "success", waiting: "warning", scheduled: "neutral" };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold text-ink-900">Good morning, Dr. {user?.lastName} 🩺</h2>
        <p className="mt-1 text-sm text-ink-500">You have {todaysPatients.length} patients scheduled today.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's patients" value="8" icon={Users} tone="clinical" />
        <StatCard label="Pending approvals" value="3" icon={CalendarCheck} tone="amber" />
        <StatCard label="Monthly earnings" value="₹1,84,000" icon={DollarSign} tone="vital" trend="+12%" />
        <StatCard label="Rating" value="4.8 / 5" icon={Star} tone="clinical" />
      </div>

      <Card>
        <h3 className="font-display font-semibold text-ink-900">Today's schedule</h3>
        <div className="mt-4 space-y-3">
          {todaysPatients.map((p, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-100 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-clinical-500 to-vital-500 text-xs font-bold text-white">
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{p.name}</p>
                  <p className="text-xs text-ink-400">{p.reason}</p>
                </div>
              </div>
              <p className="flex items-center gap-1 text-xs text-ink-500">
                <Clock className="h-3.5 w-3.5" /> {p.time}
              </p>
              <Badge tone={statusTone[p.status]}>{p.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
