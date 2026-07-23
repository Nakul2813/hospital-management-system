import { useState } from "react";
import { Receipt, Printer, Plus, Trash2 } from "lucide-react";
import { Card } from "../../components/ui/Primitives";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

export default function ReceptionBilling() {
  const [patient, setPatient] = useState("");
  const [items, setItems] = useState([{ desc: "Consultation fee", amount: 800 }]);

  const addItem = () => setItems([...items, { desc: "", amount: 0 }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx, field, value) => {
    const next = [...items];
    next[idx][field] = field === "amount" ? Number(value) : value;
    setItems(next);
  };

  const total = items.reduce((s, i) => s + (i.amount || 0), 0);

  const generateBill = () => {
    if (!patient) {
      toast.error("Enter patient name first");
      return;
    }
    toast.success(`Invoice generated for ${patient} — ₹${total.toLocaleString()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Generate Bill</h2>
        <p className="mt-1 text-sm text-ink-500">Create and print invoices at checkout.</p>
      </div>

      <Card className="max-w-2xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600">
            <Receipt className="h-5 w-5" />
          </div>
          <p className="font-display font-semibold text-ink-900">New invoice</p>
        </div>

        <Input label="Patient name" placeholder="Search or enter patient name" value={patient} onChange={(e) => setPatient(e.target.value)} />

        <div className="mt-5">
          <label className="label">Line items</label>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  className="input-field flex-1"
                  placeholder="Description"
                  value={item.desc}
                  onChange={(e) => updateItem(idx, "desc", e.target.value)}
                />
                <input
                  type="number"
                  className="input-field w-32"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) => updateItem(idx, "amount", e.target.value)}
                />
                {items.length > 1 && (
                  <button onClick={() => removeItem(idx)} className="rounded-lg p-2 text-ink-400 hover:bg-alert-50 hover:text-alert-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button onClick={addItem} className="mt-2 flex items-center gap-1 text-xs font-semibold text-clinical-600 hover:text-clinical-700">
            <Plus className="h-3.5 w-3.5" /> Add line item
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
          <p className="font-display text-lg font-bold text-ink-900">Total</p>
          <p className="font-display text-2xl font-bold text-clinical-600">₹{total.toLocaleString()}</p>
        </div>

        <div className="mt-5 flex gap-3">
          <Button onClick={generateBill} className="flex-1">
            Generate invoice
          </Button>
          <Button variant="secondary" icon={Printer} onClick={() => toast("Print dialog would open here")}>
            Print
          </Button>
        </div>
      </Card>
    </div>
  );
}
