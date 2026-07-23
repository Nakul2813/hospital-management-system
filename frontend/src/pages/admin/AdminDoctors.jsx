import { useState } from "react";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import DataListPage, { Badge } from "../../components/ui/DataListPage";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const initialDoctors = [
  { id: 1, name: "Dr. Anita Sharma", dept: "Cardiology", exp: "12 yrs", rating: 4.8, patients: 145, status: "active" },
  { id: 2, name: "Dr. Vikram Rao", dept: "Neurology", exp: "16 yrs", rating: 4.9, patients: 98, status: "active" },
  { id: 3, name: "Dr. Meera Iyer", dept: "Pediatrics", exp: "9 yrs", rating: 4.7, patients: 176, status: "active" },
  { id: 4, name: "Dr. Arjun Kapoor", dept: "Orthopedics", exp: "14 yrs", rating: 4.8, patients: 122, status: "on leave" },
];

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState(initialDoctors);

  const remove = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
    toast.success("Doctor removed");
  };

  const columns = [
    {
      key: "name",
      label: "Doctor",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-clinical-500 to-vital-500 text-xs font-bold text-white">
            {r.name.split(" ").slice(-2).map((n) => n[0]).join("")}
          </div>
          <span className="font-medium text-ink-900">{r.name}</span>
        </div>
      ),
    },
    { key: "dept", label: "Department" },
    { key: "exp", label: "Experience" },
    { key: "patients", label: "Patients" },
    {
      key: "rating",
      label: "Rating",
      render: (r) => (
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {r.rating}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge tone={r.status === "active" ? "success" : "warning"}>{r.status}</Badge>,
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex gap-2">
          <button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-clinical-600">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => remove(r.id)} className="rounded-lg p-1.5 text-ink-400 hover:bg-alert-50 hover:text-alert-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataListPage
      title="Doctors"
      subtitle="Manage doctor profiles, departments, and availability."
      columns={columns}
      data={doctors}
      searchKeys={["name", "dept"]}
      emptyMessage="No doctors added yet."
      actions={
        <Button icon={Plus} onClick={() => toast("Add-doctor form connects to POST /api/v1/doctors in Stage 3")}>
          Add doctor
        </Button>
      }
    />
  );
}
