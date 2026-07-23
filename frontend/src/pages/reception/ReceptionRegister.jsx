import { useForm } from "react-hook-form";
import { UserPlus, Mail, Phone, User, AlertCircle } from "lucide-react";
import { Card } from "../../components/ui/Primitives";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

export default function ReceptionRegister() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Wires to POST /api/v1/auth/register (role: patient) once Stage 3 exposes reception-initiated registration
    await new Promise((r) => setTimeout(r, 600));
    toast.success(`${data.firstName} ${data.lastName} registered successfully`);
    reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Register Patient</h2>
        <p className="mt-1 text-sm text-ink-500">Add a new walk-in or emergency patient to the system.</p>
      </div>

      <Card className="max-w-2xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display font-semibold text-ink-900">Patient details</p>
            <p className="text-xs text-ink-400">A patient portal account will be created automatically</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First name" icon={User} placeholder="Jane" error={errors.firstName?.message} {...register("firstName", { required: "Required" })} />
            <Input label="Last name" placeholder="Doe" error={errors.lastName?.message} {...register("lastName", { required: "Required" })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Email address" type="email" icon={Mail} placeholder="patient@example.com" error={errors.email?.message} {...register("email", { required: "Required" })} />
            <Input label="Phone number" icon={Phone} placeholder="+91 98765 43210" error={errors.phone?.message} {...register("phone", { required: "Required" })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label">Gender</label>
              <select className="input-field" {...register("gender")}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Input label="Date of birth" type="date" {...register("dateOfBirth")} />
            <div>
              <label className="label">Blood group</label>
              <select className="input-field" {...register("bloodGroup")}>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 rounded-xl bg-alert-50 p-3.5 text-sm text-alert-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1">Mark as emergency registration</span>
            <input type="checkbox" className="h-4 w-4 rounded border-alert-300 text-alert-600" {...register("isEmergency")} />
          </label>

          <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
            Register patient
          </Button>
        </form>
      </Card>
    </div>
  );
}
