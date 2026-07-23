import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, X } from "lucide-react";
import { navConfig, roleLabels } from "./navConfig";

export default function Sidebar({ role, open, onClose }) {
  const items = navConfig[role] || [];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-ink-100 bg-white/80 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-clinical-600 text-white">
              <HeartPulse className="h-5 w-5" />
              {/* Signature element: live system pulse indicator */}
              <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-vital-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vital-500" />
              </span>
            </div>
            <div>
              <p className="font-display text-sm font-bold leading-none text-ink-900">Smart Hospital</p>
              <p className="mt-1 text-xs text-ink-400">{roleLabels[role]}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-1">
            {items.map((item, i) => (
              <motion.li
                key={item.to}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
              >
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-clinical-50 text-clinical-700"
                        : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={`h-4.5 w-4.5 ${isActive ? "text-clinical-600" : "text-ink-400 group-hover:text-ink-600"}`}
                      />
                      {item.label}
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-ink-100 px-6 py-4">
          <p className="text-xs text-ink-400">System status: <span className="font-semibold text-vital-600">All systems operational</span></p>
        </div>
      </aside>
    </>
  );
}
