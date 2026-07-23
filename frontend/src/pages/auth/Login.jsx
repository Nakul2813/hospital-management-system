import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (formData) => {
    const result = await login(formData);
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Welcome back!");
      const role = result.payload.user.role;
      const redirectTo = location.state?.from?.pathname || `/${role}/dashboard`;
      navigate(redirectTo, { replace: true });
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-clinical-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-vital-100 blur-3xl opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
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
          <h1 className="font-display text-2xl font-bold text-ink-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-500">Sign in to access your dashboard.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-600">
                <input type="checkbox" className="rounded border-ink-300 text-clinical-600 focus:ring-clinical-500" {...register("rememberMe")} />
                Remember me
              </label>
              <Link to="/forgot-password" className="font-medium text-clinical-600 hover:text-clinical-700">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={isLoading} className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-clinical-600 hover:text-clinical-700">
              Create one
            </Link>
          </p>
        </div>

        <div className="mt-6 rounded-xl bg-white/60 p-4 text-xs text-ink-500 ring-1 ring-ink-100">
          <p className="font-semibold text-ink-700">Demo accounts (after running the seed script):</p>
          <p className="mt-1">patient@hospital.com · doctor@hospital.com... — password pattern: Role@123</p>
        </div>
      </motion.div>
    </div>
  );
}
