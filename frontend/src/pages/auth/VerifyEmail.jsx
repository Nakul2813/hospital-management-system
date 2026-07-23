import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { authService } from "../../services/auth.service";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying"); // verifying | success | error

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    authService
      .verifyEmail(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

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

        <div className="card text-center">
          {status === "verifying" && (
            <>
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-clinical-600" />
              <p className="mt-4 text-sm text-ink-500">Verifying your email…</p>
            </>
          )}
          {status === "success" && (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-vital-50 text-vital-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-xl font-bold text-ink-900">Email verified</h1>
              <p className="mt-2 text-sm text-ink-500">Your account is now active. You can sign in.</p>
              <Link to="/login" className="btn-primary mt-6 w-full">
                Continue to sign in
              </Link>
            </>
          )}
          {status === "error" && (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-alert-50 text-alert-600">
                <XCircle className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-xl font-bold text-ink-900">Verification failed</h1>
              <p className="mt-2 text-sm text-ink-500">This link is invalid or has expired.</p>
              <Link to="/login" className="btn-secondary mt-6 w-full">
                Back to sign in
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
