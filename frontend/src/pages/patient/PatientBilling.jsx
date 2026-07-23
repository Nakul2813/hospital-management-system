import { Download, Receipt, CreditCard } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";
import { StatCard } from "../../components/ui/Primitives";

const invoices = [
  { id: 1, invoiceId: "INV-2291", desc: "Cardiology Consultation", date: "2026-07-01", amount: "₹800", status: "paid" },
  { id: 2, invoiceId: "INV-2305", desc: "Lab Tests - CBC, Lipid Panel", date: "2026-07-10", amount: "₹1,450", status: "paid" },
  { id: 3, invoiceId: "INV-2340", desc: "MRI - Brain Imaging", date: "2026-07-18", amount: "₹6,200", status: "due" },
];

export default function PatientBilling() {
  const columns = [
    {
      key: "invoiceId",
      label: "Invoice",
      render: (r) => (
        <div className="flex items-center gap-2">
          <Receipt className="h-4 w-4 text-ink-400" />
          <span className="font-medium text-ink-900">{r.invoiceId}</span>
        </div>
      ),
    },
    { key: "desc", label: "Description" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount", render: (r) => <span className="font-semibold text-ink-900">{r.amount}</span> },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge tone={r.status === "paid" ? "success" : "danger"}>{r.status}</Badge>,
    },
    {
      key: "action",
      label: "",
      render: (r) =>
        r.status === "due" ? (
          <button className="flex items-center gap-1 text-xs font-semibold text-white bg-clinical-600 hover:bg-clinical-700 px-3 py-1.5 rounded-lg">
            <CreditCard className="h-3.5 w-3.5" /> Pay now
          </button>
        ) : (
          <button className="flex items-center gap-1 text-xs font-medium text-clinical-600 hover:text-clinical-700">
            <Download className="h-3.5 w-3.5" /> Receipt
          </button>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Billing & Invoices</h2>
        <p className="mt-1 text-sm text-ink-500">Payment history and outstanding dues.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Outstanding balance" value="₹6,200" icon={Receipt} tone="alert" />
        <StatCard label="Paid this year" value="₹2,250" icon={CreditCard} tone="vital" />
        <StatCard label="Total invoices" value={invoices.length} icon={Receipt} tone="clinical" />
      </div>
      <DataListPage
        title="Invoice history"
        columns={columns}
        data={invoices}
        searchKeys={["invoiceId", "desc"]}
        emptyMessage="No invoices yet."
      />
    </div>
  );
}
