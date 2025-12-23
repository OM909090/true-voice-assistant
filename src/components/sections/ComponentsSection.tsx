import { Phone, Mic, PhoneCall, Star, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";

const features = [
  {
    title: "Caller ID System",
    status: "active" as const,
    icon: Phone,
    description: "Real-time caller identification with community-based name resolution and spam detection",
    stats: [
      { label: "Name Detection", value: "Real-time" },
      { label: "Spam Filter", value: "ML-based" },
      { label: "Community DB", value: "Distributed" },
    ],
  },
  {
    title: "Voice AI Agent",
    status: "beta" as const,
    icon: Mic,
    description: "Always-listening voice assistant with multi-language support and autonomous agent capabilities",
    stats: [
      { label: "Languages", value: "All + Odia" },
      { label: "Voice Types", value: "M/F/Neutral" },
      { label: "Mode", value: "Agentic" },
      { label: "Response", value: "< 500ms" },
    ],
  },
  {
    title: "Call Automation",
    status: "active" as const,
    icon: PhoneCall,
    description: "Intelligent call handling with auto-save, voice messaging, and busy mode automation",
    checks: [
      "Auto-save contacts with voice confirmation",
      "AI agent answers when busy (captures & transcribes)",
      "Voice message to text + audio storage",
    ],
  },
];

export function ComponentsSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Star className="w-4 h-4" />} title="Core Features & Components">
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-secondary/30 rounded-xl p-5 border border-border hover:border-primary/30 transition-all animate-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                </div>
                <StatusBadge variant={feature.status}>
                  {feature.status === "active" ? "Active" : "Beta"}
                </StatusBadge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
              
              {feature.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {feature.stats.map((stat) => (
                    <div key={stat.label} className="bg-background/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-sm font-medium text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {feature.checks && (
                <div className="space-y-2">
                  {feature.checks.map((check) => (
                    <div key={check} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      {check}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
