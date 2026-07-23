import { Download, FlaskConical } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";

const reports = [
  { id: 1, test: "Complete Blood Count", orderedBy: "Dr. Anita Sharma", date: "2026-07-10", status: "ready" },
  { id: 2, test: "Lipid Panel", orderedBy: "Dr. Anita Sharma", date: "2026-07-10", status: "ready" },
  { id: 3, test: "MRI - Brain", orderedBy: "Dr. Vikram Rao", date: "2026-07-18", status: "processing" },
];

export default function PatientLabReports() {
  const columns = [
    {
      key: "test",
      label: "Test",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-50 text-clinical-600">
            <FlaskConical className="h-4 w-4" />
          </div>
          <span className="font-medium text-ink-900">{r.test}</span>
        </div>
      ),
    },
    { key: "orderedBy", label: "Ordered by" },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge tone={r.status === "ready" ? "success" : "warning"}>{r.status}</Badge>,
    },
    {
      key: "download",
      label: "",
      render: (r) =>
        r.status === "ready" ? (
          <button className="flex items-center gap-1 text-xs font-medium text-clinical-600 hover:text-clinical-700">
            <Download className="h-3.5 w-3.5" /> PDF
          </button>
        ) : (
          <span className="text-xs text-ink-400">Pending</span>
        ),
    },
  ];

  return (
    <DataListPage
      title="Lab Reports"
      subtitle="Diagnostic test results, updated as soon as they're ready."
      columns={columns}
      data={reports}
      searchKeys={["test", "orderedBy"]}
      emptyMessage="No lab reports yet."
    />
  );
}
