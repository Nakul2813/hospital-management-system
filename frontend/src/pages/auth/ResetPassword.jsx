import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Lock } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authService } from "../../services/auth.service";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async ({ password }) => {
    if (!token) {
      toast.error("Missing or invalid reset token");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword({ token, password });
      toast.success("Password reset. Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset link is invalid or has expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clinical-600 text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold text-ink-900">Smart Hospital</span>
          </Link>
        </div>

        <div className="card">
          <h1 className="font-display text-2xl font-bold text-ink-900">Choose a new password</h1>
          <p className="mt-1 text-sm text-ink-500">Make it strong — at least 8 characters with a mix of cases and a number.</p>

          {!token && (
            <p className="mt-4 rounded-xl bg-alert-50 p-3 text-sm text-alert-700">
              This link looks incomplete. Please use the link from your email, or request a new one.
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Input
              label="New password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
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
              label="Confirm new password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (v) => v === password || "Passwords do not match",
              })}
            />
            <Button type="submit" loading={loading} className="w-full" disabled={!token}>
              Reset password
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
