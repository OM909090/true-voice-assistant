import { Smartphone, Server, Cpu, Layers } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";
import { InfoCard } from "@/components/ui/InfoCard";

const layers = [
  {
    title: "Client Layer",
    tag: "Mobile",
    tagColor: "bg-info/20 text-info",
    icon: Smartphone,
    description: "Flutter/React Native cross-platform app",
    features: ["Voice UI/UX", "Telephony Integration", "On-device Encryption", "Local Storage"],
  },
  {
    title: "API Layer",
    tag: "Backend",
    tagColor: "bg-warning/20 text-warning",
    icon: Server,
    description: "Node.js/FastAPI microservices",
    features: ["REST/GraphQL APIs", "WebSocket for Real-time", "Rate Limiting", "Load Balancing"],
  },
  {
    title: "AI Layer",
    tag: "AI",
    tagColor: "bg-purple-500/20 text-purple-400",
    icon: Cpu,
    description: "Pluggable AI orchestration",
    features: ["UX Pilot AI/Gemini/Custom", "STT/TTS Engines", "Intent Detection", "Tool Calling"],
  },
];

const techStack = {
  frontend: [
    { label: "Mobile Framework", value: "Flutter/React Native" },
    { label: "State Management", value: "Redux/Riverpod" },
    { label: "Local Storage", value: "SQLite/Hive" },
  ],
  backend: [
    { label: "API Server", value: "Node.js/FastAPI" },
    { label: "Database", value: "PostgreSQL" },
    { label: "Cache", value: "Redis" },
  ],
};

export function ArchitectureSection() {
  return (
    <div className="space-y-6">
      <InfoCard variant="info" title="Production-Ready Architecture">
        This is a complete system design for TRUE AI mobile application with AI voice agent capabilities, caller ID, and call automation features. All components are designed for real-world deployment.
      </InfoCard>

      <SectionCard icon={<Layers className="w-4 h-4" />} title="System Architecture Overview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {layers.map((layer, index) => (
            <div
              key={layer.title}
              className="bg-secondary/50 rounded-xl p-5 border border-border hover:border-primary/50 transition-all animate-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <layer.icon className="w-5 h-5 text-muted-foreground" />
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${layer.tagColor}`}>
                  {layer.tag}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-1">{layer.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{layer.description}</p>
              <ul className="space-y-1.5">
                {layer.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-secondary/30 rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-primary" />
            <h4 className="font-medium text-foreground">Technology Stack</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-medium text-muted-foreground mb-3">Frontend</h5>
              <div className="space-y-2">
                {techStack.frontend.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-mono text-info">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium text-muted-foreground mb-3">Backend</h5>
              <div className="space-y-2">
                {techStack.backend.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-mono text-info">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
