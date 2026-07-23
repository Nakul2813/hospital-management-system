import { Eye, Edit } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";

const patients = [
  { id: 1, name: "Rohan Mehta", age: 32, gender: "Male", doctor: "Dr. Anita Sharma", registered: "2024-02-11", status: "active" },
  { id: 2, name: "Priya Desai", age: 28, gender: "Female", doctor: "Dr. Vikram Rao", registered: "2024-05-03", status: "active" },
  { id: 3, name: "Suresh Kumar", age: 55, gender: "Male", doctor: "Dr. Arjun Kapoor", registered: "2023-11-22", status: "active" },
  { id: 4, name: "Anjali Nair", age: 41, gender: "Female", doctor: "Dr. Anita Sharma", registered: "2025-01-15", status: "inactive" },
];

export default function AdminPatients() {
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
    { key: "doctor", label: "Primary doctor" },
    { key: "registered", label: "Registered on" },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge tone={r.status === "active" ? "success" : "neutral"}>{r.status}</Badge>,
    },
    {
      key: "actions",
      label: "",
      render: () => (
        <div className="flex gap-2">
          <button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-clinical-600">
            <Eye className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-clinical-600">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataListPage
      title="Patients"
      subtitle="All registered patients across the hospital."
      columns={columns}
      data={patients}
      searchKeys={["name", "doctor"]}
      emptyMessage="No patients registered yet."
    />
  );
}
