import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, bootstrapped } = useAuth();
  const location = useLocation();

  if (!bootstrapped) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-ink-50">
        <Loader2 className="h-8 w-8 animate-spin text-clinical-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={`/${user?.role}/dashboard`} replace />;
  }

  return children;
}
