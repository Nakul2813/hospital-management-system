import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Mail, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authService } from "../../services/auth.service";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email }) => {
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
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
          {sent ? (
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-vital-50 text-vital-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-xl font-bold text-ink-900">Check your email</h1>
              <p className="mt-2 text-sm text-ink-500">
                If an account exists with that email, we've sent a link to reset your password.
              </p>
              <Link to="/login" className="btn-secondary mt-6 w-full">
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-ink-900">Reset your password</h1>
              <p className="mt-1 text-sm text-ink-500">
                Enter your email and we'll send you a link to reset it.
              </p>
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
                <Button type="submit" loading={loading} className="w-full">
                  Send reset link
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-ink-500">
                Remembered it?{" "}
                <Link to="/login" className="font-semibold text-clinical-600 hover:text-clinical-700">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
