import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pill, X, Trash2 } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import toast from "react-hot-toast";

const initial = [
  { id: 1, patient: "Rohan Mehta", medicine: "Amlodipine 5mg", dosage: "Once daily", date: "2026-07-01", status: "active" },
  { id: 2, patient: "Priya Desai", medicine: "Sumatriptan 50mg", dosage: "As needed", date: "2026-06-15", status: "active" },
];

export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ patient: "", medicines: [{ name: "", dosage: "" }], notes: "" });

  const updateMedicine = (idx, field, value) => {
    const meds = [...form.medicines];
    meds[idx][field] = value;
    setForm({ ...form, medicines: meds });
  };

  const addMedicineRow = () => setForm({ ...form, medicines: [...form.medicines, { name: "", dosage: "" }] });
  const removeMedicineRow = (idx) => setForm({ ...form, medicines: form.medicines.filter((_, i) => i !== idx) });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.medicines[0]?.name) {
      toast.error("Please fill in patient name and at least one medicine");
      return;
    }
    const newEntries = form.medicines
      .filter((m) => m.name)
      .map((m) => ({
        id: Date.now() + Math.random(),
        patient: form.patient,
        medicine: m.name,
        dosage: m.dosage || "As directed",
        date: new Date().toISOString().slice(0, 10),
        status: "active",
      }));
    setPrescriptions([...newEntries, ...prescriptions]);
    setModalOpen(false);
    setForm({ patient: "", medicines: [{ name: "", dosage: "" }], notes: "" });
    toast.success("Prescription issued and sent to patient");
  };

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
    { key: "patient", label: "Patient" },
    { key: "dosage", label: "Dosage" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "active" ? "success" : "neutral"}>{r.status}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <DataListPage
        title="Prescriptions"
        subtitle="Prescriptions you've issued to patients."
        columns={columns}
        data={prescriptions}
        searchKeys={["medicine", "patient"]}
        emptyMessage="No prescriptions issued yet."
        actions={
          <Button onClick={() => setModalOpen(true)} icon={Plus}>
            New prescription
          </Button>
        }
      />

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-card max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink-900">Write prescription</h3>
                <button onClick={() => setModalOpen(false)} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <Input
                  label="Patient name"
                  placeholder="e.g. Rohan Mehta"
                  value={form.patient}
                  onChange={(e) => setForm({ ...form, patient: e.target.value })}
                />

                <div>
                  <label className="label">Medicines</label>
                  <div className="space-y-2">
                    {form.medicines.map((m, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          className="input-field"
                          placeholder="Medicine name"
                          value={m.name}
                          onChange={(e) => updateMedicine(idx, "name", e.target.value)}
                        />
                        <input
                          className="input-field"
                          placeholder="Dosage (e.g. 1x daily)"
                          value={m.dosage}
                          onChange={(e) => updateMedicine(idx, "dosage", e.target.value)}
                        />
                        {form.medicines.length > 1 && (
                          <button type="button" onClick={() => removeMedicineRow(idx)} className="rounded-lg p-2 text-ink-400 hover:bg-alert-50 hover:text-alert-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addMedicineRow} className="mt-2 flex items-center gap-1 text-xs font-semibold text-clinical-600 hover:text-clinical-700">
                    <Plus className="h-3.5 w-3.5" /> Add another medicine
                  </button>
                </div>

                <div>
                  <label className="label">Notes (optional)</label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Additional instructions for the patient"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Issue prescription
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
