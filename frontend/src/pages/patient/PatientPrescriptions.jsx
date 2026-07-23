import { Download, Pill } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";

const prescriptions = [
  { id: 1, medicine: "Amlodipine 5mg", doctor: "Dr. Anita Sharma", date: "2026-07-01", dosage: "Once daily", status: "active" },
  { id: 2, medicine: "Atorvastatin 10mg", doctor: "Dr. Anita Sharma", date: "2026-07-01", dosage: "Once at night", status: "active" },
  { id: 3, medicine: "Amoxicillin 500mg", doctor: "Dr. Meera Iyer", date: "2026-04-10", dosage: "3x daily for 7 days", status: "completed" },
];

export default function PatientPrescriptions() {
  const columns = [
    {
      key: "medicine",
      label: "Medicine",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-vital-50 text-vital-600">
            <Pill className="h-4 w-4" />
          </div>
          <span className="font-medium text-ink-900">{r.medicine}</span>
        </div>
      ),
    },
    { key: "dosage", label: "Dosage" },
    { key: "doctor", label: "Prescribed by" },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge tone={r.status === "active" ? "success" : "neutral"}>{r.status}</Badge>,
    },
    {
      key: "download",
      label: "",
      render: () => (
        <button className="flex items-center gap-1 text-xs font-medium text-clinical-600 hover:text-clinical-700">
          <Download className="h-3.5 w-3.5" /> PDF
        </button>
      ),
    },
  ];

  return (
    <DataListPage
      title="Prescriptions"
      subtitle="Digital prescriptions issued by your care team."
      columns={columns}
      data={prescriptions}
      searchKeys={["medicine", "doctor"]}
      emptyMessage="No prescriptions on file yet."
    />
  );
}
