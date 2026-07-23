import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-clinical-600 text-white">
        <HeartPulse className="h-7 w-7" />
      </div>
      <h1 className="mt-6 font-display text-6xl font-bold text-ink-900">404</h1>
      <p className="mt-2 text-lg font-semibold text-ink-700">Page not found</p>
      <p className="mt-1 max-w-sm text-sm text-ink-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}
