import { useState } from "react";
import { FileText, Search, Calendar, Activity, Pill, FlaskConical } from "lucide-react";
import { Card } from "../../components/ui/Primitives";

const patients = ["Rohan Mehta", "Priya Desai", "Suresh Kumar", "Anjali Nair"];

const timeline = [
  { icon: Activity, label: "Diagnosis: Hypertension - Stage 1", date: "2026-05-12", type: "diagnosis" },
  { icon: Pill, label: "Prescribed Amlodipine 5mg", date: "2026-07-01", type: "prescription" },
  { icon: FlaskConical, label: "Lipid Panel results uploaded", date: "2026-07-10", type: "lab" },
  { icon: Calendar, label: "Follow-up appointment scheduled", date: "2026-07-15", type: "appointment" },
];

const typeColor = {
  diagnosis: "bg-alert-50 text-alert-600",
  prescription: "bg-vital-50 text-vital-600",
  lab: "bg-clinical-50 text-clinical-600",
  appointment: "bg-amber-50 text-amber-600",
};

export default function DoctorRecords() {
  const [selected, setSelected] = useState(patients[0]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Patient Records</h2>
        <p className="mt-1 text-sm text-ink-500">Full medical timeline for patients under your care.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Card className="!p-3 h-fit">
          <div className="relative mb-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input placeholder="Search patient…" className="input-field pl-9 !py-2 text-sm" />
          </div>
          {patients.map((p) => (
            <button
              key={p}
              onClick={() => setSelected(p)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
                selected === p ? "bg-clinical-50 text-clinical-700" : "text-ink-600 hover:bg-ink-50"
              }`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-100 text-xs font-bold">
                {p.split(" ").map((n) => n[0]).join("")}
              </div>
              {p}
            </button>
          ))}
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-clinical-500 to-vital-500 text-sm font-bold text-white">
              {selected.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h3 className="font-display font-semibold text-ink-900">{selected}</h3>
              <p className="text-xs text-ink-400">Patient ID: PT-{selected.length}42A</p>
            </div>
          </div>

          <div className="mt-6 space-y-5 border-l-2 border-ink-100 pl-5">
            {timeline.map((t, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[27px] flex h-7 w-7 items-center justify-center rounded-full ${typeColor[t.type]}`}>
                  <t.icon className="h-3.5 w-3.5" />
                </div>
                <p className="text-sm font-medium text-ink-900">{t.label}</p>
                <p className="text-xs text-ink-400">{t.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
