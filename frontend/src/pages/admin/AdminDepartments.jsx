import { useState } from "react";
import { Building2, Plus, Users, Stethoscope } from "lucide-react";
import { Card } from "../../components/ui/Primitives";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const departments = [
  { id: 1, name: "Cardiology", doctors: 18, patients: 145, head: "Dr. Anita Sharma" },
  { id: 2, name: "Neurology", doctors: 12, patients: 98, head: "Dr. Vikram Rao" },
  { id: 3, name: "Orthopedics", doctors: 15, patients: 122, head: "Dr. Arjun Kapoor" },
  { id: 4, name: "Pediatrics", doctors: 20, patients: 176, head: "Dr. Meera Iyer" },
  { id: 5, name: "Oncology", doctors: 10, patients: 64, head: "Dr. Kavya Menon" },
  { id: 6, name: "Radiology", doctors: 11, patients: 87, head: "Dr. Rahul Bose" },
];

export default function AdminDepartments() {
  const [depts] = useState(departments);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Departments</h2>
          <p className="mt-1 text-sm text-ink-500">Organize doctors and track department-level performance.</p>
        </div>
        <Button icon={Plus} onClick={() => toast("Connects to POST /api/v1/departments in Stage 3")}>
          Add department
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {depts.map((d) => (
          <Card key={d.id} hover>
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
            <h3 className="mt-4 font-display font-semibold text-ink-900">{d.name}</h3>
            <p className="mt-1 text-xs text-ink-400">Head: {d.head}</p>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-ink-600">
                <Stethoscope className="h-3.5 w-3.5 text-ink-400" /> {d.doctors} doctors
              </span>
              <span className="flex items-center gap-1.5 text-ink-600">
                <Users className="h-3.5 w-3.5 text-ink-400" /> {d.patients} patients
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
