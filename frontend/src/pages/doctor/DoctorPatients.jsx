import { Eye, FileText } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";

const patients = [
  { id: 1, name: "Rohan Mehta", age: 32, gender: "Male", lastVisit: "2026-07-01", condition: "Hypertension", status: "active" },
  { id: 2, name: "Priya Desai", age: 28, gender: "Female", lastVisit: "2026-06-15", condition: "Migraine", status: "active" },
  { id: 3, name: "Suresh Kumar", age: 55, gender: "Male", lastVisit: "2026-05-20", condition: "Post-op recovery", status: "monitoring" },
  { id: 4, name: "Anjali Nair", age: 41, gender: "Female", lastVisit: "2026-04-10", condition: "Diabetes Type 2", status: "active" },
];

export default function DoctorPatients() {
  const columns = [
    {
      key: "name",
      label: "Patient",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-50 text-xs font-bold text-clinical-700">
            {r.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <span className="font-medium text-ink-900">{r.name}</span>
        </div>
      ),
    },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "condition", label: "Condition" },
    { key: "lastVisit", label: "Last visit" },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge tone={r.status === "active" ? "success" : "warning"}>{r.status}</Badge>,
    },
    {
      key: "actions",
      label: "",
      render: () => (
        <div className="flex gap-2">
          <button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-clinical-600" title="View chart">
            <Eye className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-clinical-600" title="Write prescription">
            <FileText className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataListPage
      title="My Patients"
      subtitle="Patients currently under your care."
      columns={columns}
      data={patients}
      searchKeys={["name", "condition"]}
      emptyMessage="No patients assigned yet."
    />
  );
}
