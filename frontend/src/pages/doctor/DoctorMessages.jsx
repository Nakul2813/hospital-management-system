import { useState } from "react";
import { Send } from "lucide-react";
import { Card } from "../../components/ui/Primitives";

const conversations = [
  { id: 1, name: "Rohan Mehta", note: "Patient", lastMsg: "Thank you doctor!", time: "9:40 AM", unread: true },
  { id: 2, name: "Priya Desai", note: "Patient", lastMsg: "Can I reschedule?", time: "Yesterday", unread: false },
];

const sampleThread = [
  { from: "patient", text: "Hi doctor, I've been having mild headaches after the new medication.", time: "9:30 AM" },
  { from: "doctor", text: "Thanks for flagging that — let's monitor for 3 more days and check in.", time: "9:35 AM" },
  { from: "patient", text: "Thank you doctor!", time: "9:40 AM" },
];

export default function DoctorMessages() {
  const [active, setActive] = useState(conversations[0]);
  const [messages, setMessages] = useState(sampleThread);
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "doctor", text: input, time: "Now" }]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Messages</h2>
        <p className="mt-1 text-sm text-ink-500">Secure messaging with your patients.</p>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-[560px]">
          <div className="border-r border-ink-100 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`flex w-full items-center gap-3 border-b border-ink-50 p-4 text-left hover:bg-ink-50 ${
                  active.id === c.id ? "bg-clinical-50" : ""
                }`}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-clinical-500 to-vital-500 text-xs font-bold text-white">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold text-ink-900">{c.name}</p>
                    {c.unread && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-clinical-500" />}
                  </div>
                  <p className="truncate text-xs text-ink-400">{c.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="border-b border-ink-100 p-4">
              <p className="text-sm font-semibold text-ink-900">{active.name}</p>
              <p className="text-xs text-ink-400">{active.note}</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "doctor" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                      m.from === "doctor" ? "bg-clinical-600 text-white" : "bg-ink-100 text-ink-800"
                    }`}
                  >
                    <p>{m.text}</p>
                    <p className={`mt-1 text-[10px] ${m.from === "doctor" ? "text-clinical-100" : "text-ink-400"}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-ink-100 p-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none focus:ring-2 focus:ring-clinical-100"
              />
              <button type="submit" className="btn-primary !p-2.5">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}
