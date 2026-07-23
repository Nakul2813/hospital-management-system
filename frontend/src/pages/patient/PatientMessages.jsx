import { useState } from "react";
import { Send, Video } from "lucide-react";
import { Card } from "../../components/ui/Primitives";

const conversations = [
  { id: 1, name: "Dr. Anita Sharma", dept: "Cardiology", lastMsg: "Your latest report looks good.", time: "10:24 AM", unread: true },
  { id: 2, name: "Dr. Vikram Rao", dept: "Neurology", lastMsg: "See you at the follow-up.", time: "Yesterday", unread: false },
];

const sampleThread = [
  { from: "doctor", text: "Hi! I've reviewed your latest blood pressure readings.", time: "10:10 AM" },
  { from: "doctor", text: "Your latest report looks good. Keep up the current medication.", time: "10:24 AM" },
];

export default function PatientMessages() {
  const [active, setActive] = useState(conversations[0]);
  const [messages, setMessages] = useState(sampleThread);
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "patient", text: input, time: "Now" }]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Messages</h2>
        <p className="mt-1 text-sm text-ink-500">Chat securely with your care team.</p>
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
                  {c.name.split(" ").slice(-2).map((n) => n[0]).join("")}
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
            <div className="flex items-center justify-between border-b border-ink-100 p-4">
              <div>
                <p className="text-sm font-semibold text-ink-900">{active.name}</p>
                <p className="text-xs text-ink-400">{active.dept}</p>
              </div>
              <button className="btn-secondary !px-3 !py-1.5 !text-xs">
                <Video className="h-3.5 w-3.5" /> Start video call
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "patient" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                      m.from === "patient" ? "bg-clinical-600 text-white" : "bg-ink-100 text-ink-800"
                    }`}
                  >
                    <p>{m.text}</p>
                    <p className={`mt-1 text-[10px] ${m.from === "patient" ? "text-clinical-100" : "text-ink-400"}`}>{m.time}</p>
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
