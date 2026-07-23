import { motion } from "framer-motion";
import { UserPlus, CalendarCheck, ClipboardList, Receipt } from "lucide-react";
import { StatCard, Card, Badge } from "../../components/ui/Primitives";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const queue = [
  { name: "Rohan Mehta", doctor: "Dr. Anita Sharma", checkedIn: "9:58 AM", status: "waiting" },
  { name: "Priya Desai", doctor: "Dr. Vikram Rao", checkedIn: "10:12 AM", status: "with doctor" },
  { name: "Suresh Kumar", doctor: "Dr. Arjun Kapoor", checkedIn: "10:20 AM", status: "waiting" },
];

export default function ReceptionDashboard() {
  const { user } = useAuth();
  const statusTone = { waiting: "warning", "with doctor": "success" };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold text-ink-900">Front desk — {user?.firstName}</h2>
        <p className="mt-1 text-sm text-ink-500">Today's queue and quick actions.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Patients in queue" value="3" icon={ClipboardList} tone="amber" />
        <StatCard label="Checked in today" value="24" icon={CalendarCheck} tone="clinical" />
        <StatCard label="New registrations" value="5" icon={UserPlus} tone="vital" />
        <StatCard label="Bills generated" value="18" icon={Receipt} tone="clinical" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/reception/register" className="card group flex items-center gap-4 transition-all hover:shadow-glow hover:-translate-y-0.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600 group-hover:bg-clinical-600 group-hover:text-white">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display font-semibold text-ink-900">Register new patient</p>
            <p className="text-xs text-ink-400">Add walk-in or emergency patient</p>
          </div>
        </Link>
        <Link to="/reception/appointments" className="card group flex items-center gap-4 transition-all hover:shadow-glow hover:-translate-y-0.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vital-50 text-vital-600 group-hover:bg-vital-600 group-hover:text-white">
            <CalendarCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display font-semibold text-ink-900">Book appointment</p>
            <p className="text-xs text-ink-400">Schedule for an existing patient</p>
          </div>
        </Link>
      </div>

      <Card>
        <h3 className="font-display font-semibold text-ink-900">Current queue</h3>
        <div className="mt-4 space-y-3">
          {queue.map((q, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-100 p-4">
              <div>
                <p className="text-sm font-semibold text-ink-900">{q.name}</p>
                <p className="text-xs text-ink-400">{q.doctor}</p>
              </div>
              <p className="text-xs text-ink-500">Checked in {q.checkedIn}</p>
              <Badge tone={statusTone[q.status]}>{q.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
