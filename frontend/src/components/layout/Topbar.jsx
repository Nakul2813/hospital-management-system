import { useState } from "react";
import { Menu, Search, Bell, Sun, Moon, LogOut, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/uiSlice";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Topbar({ onMenuClick, title }) {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.ui.theme);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-ink-100 bg-white/80 px-4 backdrop-blur-xl sm:px-6">
      <button onClick={onMenuClick} className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="font-display text-lg font-semibold text-ink-900 hidden sm:block">{title}</h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search patients, doctors, records…"
            className="w-64 rounded-xl border border-ink-200 bg-ink-50 py-2 pl-9 pr-3 text-sm placeholder:text-ink-400 focus:border-clinical-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-clinical-100"
          />
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="rounded-lg p-2 text-ink-500 hover:bg-ink-100"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
        </button>

        <button className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-100" aria-label="Notifications">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-alert-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 hover:bg-ink-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-600 text-xs font-bold text-white">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <ChevronDown className="hidden h-4 w-4 text-ink-400 sm:block" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-ink-100 bg-white p-1.5 shadow-card animate-fadeUp">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-ink-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-ink-400">{user?.email}</p>
                </div>
                <div className="my-1 h-px bg-ink-100" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-alert-600 hover:bg-alert-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
