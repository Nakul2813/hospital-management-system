import { Plus, AlertTriangle } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";
import Button from "../../components/ui/Button";
import { StatCard } from "../../components/ui/Primitives";
import { Package } from "lucide-react";
import toast from "react-hot-toast";

const medicines = [
  { id: 1, name: "Amlodipine 5mg", stock: 420, threshold: 100, expiry: "2027-03-01", supplier: "MedSupply Co." },
  { id: 2, name: "Atorvastatin 10mg", stock: 65, threshold: 100, expiry: "2026-11-15", supplier: "PharmaLink" },
  { id: 3, name: "Amoxicillin 500mg", stock: 890, threshold: 200, expiry: "2027-01-20", supplier: "MedSupply Co." },
  { id: 4, name: "Sumatriptan 50mg", stock: 18, threshold: 50, expiry: "2026-08-05", supplier: "PharmaLink" },
];

export default function AdminPharmacy() {
  const lowStock = medicines.filter((m) => m.stock < m.threshold).length;

  const columns = [
    { key: "name", label: "Medicine", render: (r) => <span className="font-medium text-ink-900">{r.name}</span> },
    {
      key: "stock",
      label: "Stock",
      render: (r) => (
        <span className={r.stock < r.threshold ? "font-semibold text-alert-600" : "text-ink-700"}>
          {r.stock} units
        </span>
      ),
    },
    { key: "supplier", label: "Supplier" },
    { key: "expiry", label: "Expires" },
    {
      key: "status",
      label: "Status",
      render: (r) =>
        r.stock < r.threshold ? (
          <Badge tone="danger">
            <AlertTriangle className="h-3 w-3" /> Low stock
          </Badge>
        ) : (
          <Badge tone="success">In stock</Badge>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Pharmacy</h2>
        <p className="mt-1 text-sm text-ink-500">Medicine inventory, stock alerts, and suppliers.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total medicines" value={medicines.length} icon={Package} tone="clinical" />
        <StatCard label="Low stock alerts" value={lowStock} icon={AlertTriangle} tone="alert" />
        <StatCard label="Suppliers" value="2" icon={Package} tone="vital" />
      </div>

      <DataListPage
        title="Inventory"
        columns={columns}
        data={medicines}
        searchKeys={["name", "supplier"]}
        emptyMessage="No medicines in inventory yet."
        actions={
          <Button icon={Plus} onClick={() => toast("Connects to POST /api/v1/pharmacy in Stage 3")}>
            Add medicine
          </Button>
        }
      />
    </div>
  );
}
