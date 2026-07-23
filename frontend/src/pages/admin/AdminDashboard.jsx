import { motion } from "framer-motion";
import { Users, Stethoscope, DollarSign, BedDouble } from "lucide-react";
import { StatCard, Card } from "../../components/ui/Primitives";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Feb", revenue: 420000 },
  { month: "Mar", revenue: 480000 },
  { month: "Apr", revenue: 510000 },
  { month: "May", revenue: 465000 },
  { month: "Jun", revenue: 560000 },
  { month: "Jul", revenue: 612000 },
];

const departmentLoad = [
  { dept: "Cardio", patients: 145 },
  { dept: "Neuro", patients: 98 },
  { dept: "Ortho", patients: 122 },
  { dept: "Peds", patients: 176 },
  { dept: "Onco", patients: 64 },
];

const occupancy = [
  { name: "Occupied", value: 78 },
  { name: "Available", value: 22 },
];
const COLORS = ["#2563eb", "#e2e8f0"];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold text-ink-900">Hospital Overview</h2>
        <p className="mt-1 text-sm text-ink-500">Real-time performance across the organization.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total patients" value="4,218" icon={Users} tone="clinical" trend="+8.2%" />
        <StatCard label="Active doctors" value="340" icon={Stethoscope} tone="vital" trend="+3" />
        <StatCard label="Monthly revenue" value="₹6.12L" icon={DollarSign} tone="vital" trend="+9.4%" />
        <StatCard label="Bed occupancy" value="78%" icon={BedDouble} tone="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="font-display font-semibold text-ink-900">Revenue trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-semibold text-ink-900">Bed occupancy</h3>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancy} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                  {occupancy.map((entry, i) => (
                    <Cell key={entry.name} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-clinical-600" /> Occupied</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ink-200" /> Available</span>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-display font-semibold text-ink-900">Department load</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentLoad}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dept" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="patients" fill="#0d9488" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
