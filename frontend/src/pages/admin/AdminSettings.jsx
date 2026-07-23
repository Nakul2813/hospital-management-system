import { useState } from "react";
import { Building2, Bell, Shield, Palette } from "lucide-react";
import { Card } from "../../components/ui/Primitives";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/uiSlice";
import toast from "react-hot-toast";

const tabs = [
  { id: "hospital", label: "Hospital info", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function AdminSettings() {
  const [active, setActive] = useState("hospital");
  const theme = useSelector((s) => s.ui.theme);
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Settings</h2>
        <p className="mt-1 text-sm text-ink-500">Configure hospital-wide preferences and system behavior.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="!p-3 h-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
                active === t.id ? "bg-clinical-50 text-clinical-700" : "text-ink-600 hover:bg-ink-50"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </Card>

        <Card>
          {active === "hospital" && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-ink-900">Hospital information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Hospital name" defaultValue="Smart Hospital" />
                <Input label="Registration number" defaultValue="HSP-2026-0042" />
                <Input label="Contact email" defaultValue="contact@smarthospital.com" />
                <Input label="Contact phone" defaultValue="+91 123 456 7890" />
              </div>
              <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
            </div>
          )}

          {active === "notifications" && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-ink-900">Notification preferences</h3>
              {["Email notifications", "SMS alerts", "Low stock alerts", "New appointment alerts"].map((n) => (
                <label key={n} className="flex items-center justify-between rounded-xl border border-ink-100 p-3.5">
                  <span className="text-sm text-ink-700">{n}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-ink-300 text-clinical-600" />
                </label>
              ))}
            </div>
          )}

          {active === "security" && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-ink-900">Security</h3>
              <label className="flex items-center justify-between rounded-xl border border-ink-100 p-3.5">
                <div>
                  <p className="text-sm font-medium text-ink-700">Two-factor authentication</p>
                  <p className="text-xs text-ink-400">Require OTP for admin logins</p>
                </div>
                <input type="checkbox" className="h-4 w-4 rounded border-ink-300 text-clinical-600" />
              </label>
              <label className="flex items-center justify-between rounded-xl border border-ink-100 p-3.5">
                <div>
                  <p className="text-sm font-medium text-ink-700">Session timeout</p>
                  <p className="text-xs text-ink-400">Auto-logout after 15 minutes of inactivity</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-ink-300 text-clinical-600" />
              </label>
            </div>
          )}

          {active === "appearance" && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-ink-900">Appearance</h3>
              <div className="flex items-center justify-between rounded-xl border border-ink-100 p-3.5">
                <div>
                  <p className="text-sm font-medium text-ink-700">Dark mode</p>
                  <p className="text-xs text-ink-400">Currently: {theme}</p>
                </div>
                <Button size="sm" variant="secondary" onClick={() => dispatch(toggleTheme())}>
                  Toggle
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
