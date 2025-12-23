import { Phone, Shield, Users, Zap, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";

const callerIdPipeline = [
  { step: "Incoming Number", description: "Phone number detected" },
  { step: "Local Cache", description: "Check device storage" },
  { step: "Community DB", description: "Query distributed database" },
  { step: "Spam DB", description: "Check spam scores" },
  { step: "AI Inference", description: "ML-based name prediction" },
  { step: "Display Result", description: "Show caller info" },
];

const features = [
  {
    icon: Users,
    title: "Community Intelligence",
    description: "Crowdsourced contact names from millions of users with privacy-preserving techniques",
  },
  {
    icon: Shield,
    title: "Spam Detection",
    description: "ML-powered spam scoring with real-time updates from community reports",
  },
  {
    icon: Zap,
    title: "Real-time Lookup",
    description: "Sub-100ms response time for caller identification during incoming calls",
  },
];

export function CallerIDSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Phone className="w-4 h-4" />} title="Caller ID System" headerAction={<StatusBadge variant="active">Active</StatusBadge>}>
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-4">Identification Pipeline</h4>
          <div className="flex flex-wrap items-center gap-2">
            {callerIdPipeline.map((step, index) => (
              <div key={step.step} className="flex items-center gap-2 animate-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="bg-secondary/50 rounded-lg px-4 py-2 border border-border hover:border-primary/30 transition-all">
                  <p className="text-sm font-medium text-foreground">{step.step}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < callerIdPipeline.length - 1 && (
                  <span className="text-primary">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-secondary/30 rounded-xl p-5 border border-border hover:border-primary/30 transition-all animate-in"
              style={{ animationDelay: `${(index + 6) * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
