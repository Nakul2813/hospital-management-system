import { useState } from "react";
import { Plus, CalendarCheck } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const initialAppointments = [
  { id: 1, patient: "Rohan Mehta", doctor: "Dr. Anita Sharma", date: "2026-07-15", time: "10:30 AM", status: "confirmed" },
  { id: 2, patient: "Priya Desai", doctor: "Dr. Vikram Rao", date: "2026-07-15", time: "11:15 AM", status: "confirmed" },
  { id: 3, patient: "Suresh Kumar", doctor: "Dr. Arjun Kapoor", date: "2026-07-16", time: "2:00 PM", status: "pending" },
];

export default function ReceptionAppointments() {
  const [appointments] = useState(initialAppointments);

  const columns = [
    {
      key: "patient",
      label: "Patient",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-50 text-xs font-bold text-clinical-700">
            {r.patient.split(" ").map((n) => n[0]).join("")}
          </div>
          <span className="font-medium text-ink-900">{r.patient}</span>
        </div>
      ),
    },
    { key: "doctor", label: "Doctor" },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge tone={r.status === "confirmed" ? "success" : "warning"}>{r.status}</Badge>,
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex gap-2">
          {r.status === "pending" && (
            <button
              onClick={() => toast.success(`Confirmed appointment for ${r.patient}`)}
              className="text-xs font-semibold text-vital-600 hover:text-vital-700"
            >
              Confirm
            </button>
          )}
          <button onClick={() => toast("Reschedule flow connects to backend in Stage 3")} className="text-xs font-semibold text-clinical-600 hover:text-clinical-700">
            Reschedule
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataListPage
      title="Appointments"
      subtitle="Book, confirm, and manage appointments for all patients."
      columns={columns}
      data={appointments}
      searchKeys={["patient", "doctor"]}
      emptyMessage="No appointments scheduled."
      actions={
        <Button icon={Plus} onClick={() => toast("Booking form connects to POST /api/v1/appointments in Stage 3")}>
          Book appointment
        </Button>
      }
    />
  );
}
