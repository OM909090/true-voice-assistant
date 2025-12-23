import { Rocket, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";

interface Phase {
  title: string;
  timeline: string;
  status: "ready" | "progress" | "planned";
  columns: {
    title: string;
    items: string[];
  }[];
}

const phases: Phase[] = [
  {
    title: "MVP (Month 1-2)",
    timeline: "Month 1-2",
    status: "ready",
    columns: [
      {
        title: "Core Features",
        items: ["Basic caller ID", "Manual contact save", "Call logs (text)", "Simple spam detection"],
      },
      {
        title: "Tech Stack",
        items: ["Flutter app", "Node.js backend", "PostgreSQL DB", "Basic REST APIs"],
      },
    ],
  },
  {
    title: "V1 (Month 3-4)",
    timeline: "Month 3-4",
    status: "progress",
    columns: [
      {
        title: "AI Features",
        items: ["Voice assistant (basic)", "STT/TTS integration", "Simple voice commands", "UX Pilot AI/Gemini support"],
      },
      {
        title: "Enhancements",
        items: ["Community name DB", "Auto-save contacts", "Call logs (audio)", "Enhanced spam ML"],
      },
    ],
  },
  {
    title: "V2 (Month 5-6)",
    timeline: "Month 5-6",
    status: "planned",
    columns: [
      {
        title: "Advanced AI",
        items: ["Agentic voice AI", "Multi-language (Odia+)", "Call automation", "Custom model support"],
      },
      {
        title: "Pro Features",
        items: ["Voice message capture", "AI summaries", "Intent detection", "Tool calling framework"],
      },
    ],
  },
];

export function RoadmapSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Rocket className="w-4 h-4" />} title="Development Roadmap">
        <div className="space-y-6">
          {phases.map((phase, index) => (
            <div
              key={phase.title}
              className="bg-secondary/30 rounded-xl border border-border overflow-hidden animate-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 rounded-full bg-gradient-primary" />
                  <h4 className="font-semibold text-foreground">{phase.title}</h4>
                </div>
                <StatusBadge variant={phase.status}>
                  {phase.status === "ready" ? "Ready" : phase.status === "progress" ? "In Progress" : "Planned"}
                </StatusBadge>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {phase.columns.map((column) => (
                    <div key={column.title}>
                      <h5 className="font-medium text-foreground mb-3">{column.title}</h5>
                      <ul className="space-y-2">
                        {column.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
