import { DollarSign, Receipt, TrendingUp } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";
import { StatCard } from "../../components/ui/Primitives";

const invoices = [
  { id: 1, invoiceId: "INV-2291", patient: "Rohan Mehta", dept: "Cardiology", amount: "₹800", status: "paid" },
  { id: 2, invoiceId: "INV-2305", patient: "Priya Desai", dept: "Neurology", amount: "₹1,450", status: "paid" },
  { id: 3, invoiceId: "INV-2340", patient: "Suresh Kumar", dept: "Radiology", amount: "₹6,200", status: "due" },
  { id: 4, invoiceId: "INV-2352", patient: "Anjali Nair", dept: "Pediatrics", amount: "₹500", status: "overdue" },
];

export default function AdminBilling() {
  const columns = [
    { key: "invoiceId", label: "Invoice", render: (r) => <span className="font-medium text-ink-900">{r.invoiceId}</span> },
    { key: "patient", label: "Patient" },
    { key: "dept", label: "Department" },
    { key: "amount", label: "Amount", render: (r) => <span className="font-semibold">{r.amount}</span> },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <Badge tone={r.status === "paid" ? "success" : r.status === "due" ? "warning" : "danger"}>{r.status}</Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Billing & Revenue</h2>
        <p className="mt-1 text-sm text-ink-500">Hospital-wide invoicing and revenue tracking.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total revenue (MTD)" value="₹6.12L" icon={DollarSign} tone="vital" trend="+9.4%" />
        <StatCard label="Outstanding dues" value="₹6,700" icon={Receipt} tone="alert" />
        <StatCard label="Avg. invoice value" value="₹2,237" icon={TrendingUp} tone="clinical" />
      </div>

      <DataListPage
        title="Recent invoices"
        columns={columns}
        data={invoices}
        searchKeys={["invoiceId", "patient", "dept"]}
        emptyMessage="No invoices yet."
      />
    </div>
  );
}
