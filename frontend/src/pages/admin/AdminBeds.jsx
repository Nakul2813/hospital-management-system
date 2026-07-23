import { BedDouble } from "lucide-react";
import { Card, StatCard } from "../../components/ui/Primitives";

const wards = [
  { name: "General Ward A", total: 40, occupied: 32 },
  { name: "General Ward B", total: 40, occupied: 28 },
  { name: "ICU", total: 20, occupied: 17 },
  { name: "Operation Theatres", total: 8, occupied: 3 },
  { name: "Maternity Wing", total: 15, occupied: 9 },
  { name: "Pediatric Ward", total: 25, occupied: 14 },
];

export default function AdminBeds() {
  const totalBeds = wards.reduce((s, w) => s + w.total, 0);
  const totalOccupied = wards.reduce((s, w) => s + w.occupied, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Beds & Rooms</h2>
        <p className="mt-1 text-sm text-ink-500">Real-time bed availability across wards, ICU, and operation theatres.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total capacity" value={totalBeds} icon={BedDouble} tone="clinical" />
        <StatCard label="Currently occupied" value={totalOccupied} icon={BedDouble} tone="amber" />
        <StatCard label="Available now" value={totalBeds - totalOccupied} icon={BedDouble} tone="vital" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wards.map((w) => {
          const pct = Math.round((w.occupied / w.total) * 100);
          const tone = pct > 85 ? "bg-alert-500" : pct > 60 ? "bg-amber-500" : "bg-vital-500";
          return (
            <Card key={w.name}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-ink-900">{w.name}</h3>
                <span className="text-xs font-semibold text-ink-500">{w.occupied}/{w.total}</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
                <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-xs text-ink-400">{pct}% occupied</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
