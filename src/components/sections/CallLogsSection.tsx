import { List, Play, FileText, BarChart3 } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";

const logFormats = [
  {
    icon: FileText,
    title: "Text Logs",
    description: "Traditional text-based call history with timestamps and duration",
  },
  {
    icon: Play,
    title: "Audio Summaries",
    description: "AI-generated audio summaries of conversations",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Call patterns, frequent contacts, and usage insights",
  },
];

const sampleLog = [
  { time: "6:20 PM", contact: "Ankit", type: "incoming", duration: "2 min", status: "answered" },
  { time: "5:45 PM", contact: "Unknown", type: "incoming", duration: "0 min", status: "missed" },
  { time: "4:30 PM", contact: "Mom", type: "outgoing", duration: "15 min", status: "answered" },
  { time: "2:15 PM", contact: "Office", type: "incoming", duration: "5 min", status: "answered" },
];

export function CallLogsSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<List className="w-4 h-4" />} title="Call Logs (Voice-First)">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {logFormats.map((format, index) => (
            <div
              key={format.title}
              className="bg-secondary/30 rounded-xl p-5 border border-border hover:border-primary/30 transition-all animate-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <format.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{format.title}</h4>
              <p className="text-sm text-muted-foreground">{format.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-secondary/30 rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <h4 className="font-semibold text-foreground">Sample Call Log</h4>
            <p className="text-xs text-muted-foreground">Say "Read my call log" to hear this spoken in Odia, Hindi, or English</p>
          </div>
          <div className="divide-y divide-border">
            {sampleLog.map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-5 py-3 hover:bg-secondary/50 transition-colors animate-in"
                style={{ animationDelay: `${(index + 3) * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground font-mono">{log.time}</div>
                  <div>
                    <p className="font-medium text-foreground">{log.contact}</p>
                    <p className="text-xs text-muted-foreground capitalize">{log.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{log.duration}</span>
                  <StatusBadge variant={log.status === "answered" ? "active" : "planned"}>
                    {log.status}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
