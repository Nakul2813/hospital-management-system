import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Mail, Lock, User, Phone, Stethoscope } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

const roles = [
  { value: "patient", label: "Patient" },
  { value: "doctor", label: "Doctor" },
  { value: "reception", label: "Reception" },
  { value: "admin", label: "Admin" },
];

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("patient");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { role: "patient" } });
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (formData) => {
    const result = await registerUser({ ...formData, role: selectedRole });
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Account created! Check your email to verify.");
      navigate("/login");
    } else {
      toast.error(result.payload || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-clinical-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-vital-100 blur-3xl opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-lg"
      >
        <div className="mb-8 flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clinical-600 text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold text-ink-900">Smart Hospital</span>
          </Link>
        </div>

        <div className="card">
          <h1 className="font-display text-2xl font-bold text-ink-900">Create your account</h1>
          <p className="mt-1 text-sm text-ink-500">Get started in under a minute.</p>

          <div className="mt-5 grid grid-cols-4 gap-2">
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setSelectedRole(r.value)}
                className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition-colors ${
                  selectedRole === r.value
                    ? "border-clinical-500 bg-clinical-50 text-clinical-700"
                    : "border-ink-200 text-ink-500 hover:bg-ink-50"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First name"
                icon={User}
                placeholder="Jane"
                error={errors.firstName?.message}
                {...register("firstName", { required: "Required" })}
              />
              <Input
                label="Last name"
                placeholder="Doe"
                error={errors.lastName?.message}
                {...register("lastName", { required: "Required" })}
              />
            </div>

            <Input
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
            />

            <Input
              label="Phone number"
              icon={Phone}
              placeholder="+91 98765 43210"
              error={errors.phone?.message}
              {...register("phone")}
            />

            {selectedRole === "doctor" && (
              <Input
                label="Specialization"
                icon={Stethoscope}
                placeholder="e.g. Cardiology"
                error={errors.specialization?.message}
                {...register("specialization", { required: selectedRole === "doctor" ? "Required for doctors" : false })}
              />
            )}

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="At least 8 characters"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Must include upper, lower case & a number",
                },
              })}
            />

            <Input
              label="Confirm password"
              type="password"
              icon={Lock}
              placeholder="Re-enter password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (v) => v === password || "Passwords do not match",
              })}
            />

            <Button type="submit" loading={isLoading} className="w-full">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-clinical-600 hover:text-clinical-700">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
