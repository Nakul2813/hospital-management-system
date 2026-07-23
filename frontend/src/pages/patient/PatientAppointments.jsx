import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CalendarCheck, X, Clock, Stethoscope } from "lucide-react";
import { Card, Badge } from "../../components/ui/Primitives";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import toast from "react-hot-toast";

const initialAppointments = [
  { id: 1, doctor: "Dr. Anita Sharma", dept: "Cardiology", date: "2026-07-15", time: "10:30 AM", status: "confirmed" },
  { id: 2, doctor: "Dr. Vikram Rao", dept: "Neurology", date: "2026-07-22", time: "2:00 PM", status: "pending" },
  { id: 3, doctor: "Dr. Meera Iyer", dept: "Pediatrics", date: "2026-06-28", time: "11:00 AM", status: "completed" },
];

const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Oncology"];

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ department: departments[0], date: "", time: "", notes: "" });

  const handleBook = (e) => {
    e.preventDefault();
    if (!form.date || !form.time) {
      toast.error("Please select a date and time");
      return;
    }
    const newAppt = {
      id: Date.now(),
      doctor: "To be assigned",
      dept: form.department,
      date: form.date,
      time: form.time,
      status: "pending",
    };
    setAppointments([newAppt, ...appointments]);
    setModalOpen(false);
    setForm({ department: departments[0], date: "", time: "", notes: "" });
    toast.success("Appointment request submitted");
  };

  const statusTone = { confirmed: "success", pending: "warning", completed: "neutral", cancelled: "danger" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Appointments</h2>
          <p className="mt-1 text-sm text-ink-500">Manage upcoming visits and book new ones.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} icon={Plus}>
          Book appointment
        </Button>
      </div>

      <Card>
        <div className="space-y-3">
          {appointments.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-100 p-4">
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
                <p className="flex items-center justify-end gap-1 text-xs text-ink-400">
                  <Clock className="h-3 w-3" /> {a.time}
                </p>
              </div>
              <Badge tone={statusTone[a.status]}>{a.status}</Badge>
            </div>
          ))}
          {appointments.length === 0 && (
            <p className="py-10 text-center text-sm text-ink-400">No appointments yet. Book your first visit above.</p>
          )}
        </div>
      </Card>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink-900">Book an appointment</h3>
                <button onClick={() => setModalOpen(false)} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleBook} className="mt-5 space-y-4">
                <div>
                  <label className="label">Department</label>
                  <div className="relative">
                    <Stethoscope className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <select
                      className="input-field pl-10"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                    >
                      {departments.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Input
                  label="Preferred date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <Input
                  label="Preferred time"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
                <div>
                  <label className="label">Notes (optional)</label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Briefly describe your symptoms or reason for visit"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit request
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
