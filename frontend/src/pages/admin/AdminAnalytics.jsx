import { Card } from "../../components/ui/Primitives";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const growthData = [
  { month: "Feb", patients: 3620, appointments: 890 },
  { month: "Mar", patients: 3745, appointments: 940 },
  { month: "Apr", patients: 3890, appointments: 1020 },
  { month: "May", patients: 3980, appointments: 980 },
  { month: "Jun", patients: 4102, appointments: 1150 },
  { month: "Jul", patients: 4218, appointments: 1240 },
];

const medicineUsage = [
  { month: "Feb", units: 12400 },
  { month: "Mar", units: 13100 },
  { month: "Apr", units: 12800 },
  { month: "May", units: 14200 },
  { month: "Jun", units: 15600 },
  { month: "Jul", units: 16100 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Analytics</h2>
        <p className="mt-1 text-sm text-ink-500">Growth trends across patients, appointments, and resource usage.</p>
      </div>

      <Card>
        <h3 className="font-display font-semibold text-ink-900">Patient & appointment growth</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
              <Legend />
              <Line type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2.5} dot={false} name="Total patients" />
              <Line type="monotone" dataKey="appointments" stroke="#0d9488" strokeWidth={2.5} dot={false} name="Monthly appointments" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="font-display font-semibold text-ink-900">Medicine usage (units dispensed)</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={medicineUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
              <Line type="monotone" dataKey="units" stroke="#d97706" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
