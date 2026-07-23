import { useState } from "react";
import { Clock, Plus, Trash2 } from "lucide-react";
import { Card } from "../../components/ui/Primitives";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function DoctorSchedule() {
  const [slots, setSlots] = useState([
    { id: 1, day: "Monday", start: "09:00", end: "13:00" },
    { id: 2, day: "Wednesday", start: "09:00", end: "13:00" },
    { id: 3, day: "Friday", start: "14:00", end: "18:00" },
  ]);
  const [newSlot, setNewSlot] = useState({ day: "Monday", start: "09:00", end: "13:00" });

  const addSlot = () => {
    setSlots([...slots, { id: Date.now(), ...newSlot }]);
    toast.success("Availability slot added");
  };

  const removeSlot = (id) => {
    setSlots(slots.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Availability</h2>
        <p className="mt-1 text-sm text-ink-500">Set the hours patients can book appointments with you.</p>
      </div>

      <Card>
        <h3 className="font-display font-semibold text-ink-900">Current schedule</h3>
        <div className="mt-4 space-y-2">
          {slots.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-ink-100 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-clinical-50 text-clinical-600">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{s.day}</p>
                  <p className="text-xs text-ink-400">{s.start} – {s.end}</p>
                </div>
              </div>
              <button onClick={() => removeSlot(s.id)} className="rounded-lg p-1.5 text-ink-400 hover:bg-alert-50 hover:text-alert-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {slots.length === 0 && <p className="py-6 text-center text-sm text-ink-400">No availability set yet.</p>}
        </div>
      </Card>

      <Card>
        <h3 className="font-display font-semibold text-ink-900">Add a slot</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
          <select
            className="input-field"
            value={newSlot.day}
            onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
          >
            {days.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <input
            type="time"
            className="input-field"
            value={newSlot.start}
            onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
          />
          <input
            type="time"
            className="input-field"
            value={newSlot.end}
            onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
          />
          <Button onClick={addSlot} icon={Plus}>
            Add slot
          </Button>
        </div>
      </Card>
    </div>
  );
}
