import { Shield, Lock, Users, Database, CheckCircle } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";

const securityFeatures = [
  {
    title: "Encryption",
    icon: Lock,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    items: [
      "AES-256 at rest",
      "TLS 1.3 in transit",
      "End-to-end for voice",
      "API keys encrypted",
    ],
  },
  {
    title: "Permissions",
    icon: Users,
    color: "text-warning",
    bgColor: "bg-warning/10",
    items: [
      "Explicit user consent",
      "Granular controls",
      "Revokable anytime",
      "Audit logs",
    ],
  },
  {
    title: "Data Privacy",
    icon: Database,
    color: "text-success",
    bgColor: "bg-success/10",
    items: [
      "On-device processing",
      "No data sharing",
      "GDPR compliant",
      "User data deletion",
    ],
  },
];

const aiSecurity = [
  {
    title: "API Key Storage",
    description: "User API keys encrypted with device-specific keys, never sent to TRUE AI servers",
  },
  {
    title: "Model Isolation",
    description: "Each user's AI model runs in isolated context with their own API key",
  },
  {
    title: "Data Minimization",
    description: "Only essential data sent to AI providers, with user consent",
  },
  {
    title: "Audit Trail",
    description: "All AI interactions logged locally for user review",
  },
];

export function SecuritySection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Shield className="w-4 h-4" />} title="Security & Privacy Model">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`${feature.bgColor} rounded-xl p-5 border border-border animate-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <h4 className="font-semibold text-foreground">{feature.title}</h4>
              </div>
              <ul className="space-y-2">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-secondary/30 rounded-xl p-5 border border-border">
          <h4 className="font-semibold text-foreground mb-4">AI Model Security</h4>
          <div className="space-y-3">
            {aiSecurity.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-3 animate-in"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">{item.title}:</span>{" "}
                  <span className="text-muted-foreground">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
