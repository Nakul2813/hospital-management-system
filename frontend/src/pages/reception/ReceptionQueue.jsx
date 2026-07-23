import { useState } from "react";
import { CheckCircle2, LogOut, Clock } from "lucide-react";
import { Card, Badge } from "../../components/ui/Primitives";
import toast from "react-hot-toast";

const initialQueue = [
  { id: 1, name: "Rohan Mehta", doctor: "Dr. Anita Sharma", checkedIn: "9:58 AM", status: "waiting" },
  { id: 2, name: "Priya Desai", doctor: "Dr. Vikram Rao", checkedIn: "10:12 AM", status: "with doctor" },
  { id: 3, name: "Suresh Kumar", doctor: "Dr. Arjun Kapoor", checkedIn: "10:20 AM", status: "waiting" },
];

export default function ReceptionQueue() {
  const [queue, setQueue] = useState(initialQueue);

  const checkOut = (id) => {
    setQueue(queue.filter((q) => q.id !== id));
    toast.success("Patient checked out");
  };

  const sendToDoctor = (id) => {
    setQueue(queue.map((q) => (q.id === id ? { ...q, status: "with doctor" } : q)));
    toast.success("Patient sent in to see the doctor");
  };

  const statusTone = { waiting: "warning", "with doctor": "success" };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Patient Queue</h2>
        <p className="mt-1 text-sm text-ink-500">Manage today's walk-ins and scheduled check-ins.</p>
      </div>

      <div className="grid gap-4">
        {queue.map((q) => (
          <Card key={q.id}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-clinical-500 to-vital-500 text-sm font-bold text-white">
                  {q.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-ink-900">{q.name}</p>
                  <p className="text-xs text-ink-400">{q.doctor}</p>
                </div>
              </div>
              <p className="flex items-center gap-1.5 text-sm text-ink-500">
                <Clock className="h-4 w-4" /> Checked in {q.checkedIn}
              </p>
              <Badge tone={statusTone[q.status]}>{q.status}</Badge>
              <div className="flex gap-2">
                {q.status === "waiting" && (
                  <button
                    onClick={() => sendToDoctor(q.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-clinical-50 px-3 py-1.5 text-xs font-semibold text-clinical-700 hover:bg-clinical-100"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Send in
                  </button>
                )}
                <button
                  onClick={() => checkOut(q.id)}
                  className="flex items-center gap-1.5 rounded-lg bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-600 hover:bg-ink-200"
                >
                  <LogOut className="h-3.5 w-3.5" /> Check out
                </button>
              </div>
            </div>
          </Card>
        ))}
        {queue.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-400">Queue is empty — everyone's been seen.</p>
        )}
      </div>
    </div>
  );
}
