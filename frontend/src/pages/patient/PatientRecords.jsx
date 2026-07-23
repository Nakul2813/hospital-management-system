import { Download, FileText } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";

const records = [
  { id: 1, type: "Diagnosis", title: "Hypertension - Stage 1", doctor: "Dr. Anita Sharma", date: "2026-05-12", status: "active" },
  { id: 2, type: "Vaccination", title: "Influenza Vaccine", doctor: "Dr. Meera Iyer", date: "2026-03-02", status: "completed" },
  { id: 3, type: "Allergy", title: "Penicillin Allergy Noted", doctor: "Dr. Vikram Rao", date: "2026-01-18", status: "active" },
  { id: 4, type: "Surgery", title: "Appendectomy", doctor: "Dr. Arjun Kapoor", date: "2022-11-09", status: "resolved" },
];

export default function PatientRecords() {
  const columns = [
    { key: "type", label: "Type", render: (r) => <Badge tone="info">{r.type}</Badge> },
    {
      key: "title",
      label: "Details",
      render: (r) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-ink-400" />
          <span className="font-medium text-ink-900">{r.title}</span>
        </div>
      ),
    },
    { key: "doctor", label: "Recorded by" },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <Badge tone={r.status === "active" ? "warning" : r.status === "completed" ? "success" : "neutral"}>
          {r.status}
        </Badge>
      ),
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
      title="Medical Records"
      subtitle="Your complete diagnosis, allergy, vaccination, and surgical history."
      columns={columns}
      data={records}
      searchKeys={["type", "title", "doctor"]}
      emptyMessage="No medical records on file yet."
    />
  );
}
