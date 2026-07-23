import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../hooks/useAuth";

const titleFromPath = (pathname) => {
  const segment = pathname.split("/").filter(Boolean).pop() || "dashboard";
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar role={user?.role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={titleFromPath(location.pathname)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
