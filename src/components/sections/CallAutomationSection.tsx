import { PhoneCall, MessageSquare, Clock, Mic, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";

const automationFeatures = [
  {
    icon: MessageSquare,
    title: "Voice Messaging",
    description: "AI agent records, transcribes, and summarizes voice messages when user is busy",
    capabilities: ["HD audio recording", "Multi-language transcription", "Sentiment analysis", "AI summary generation"],
  },
  {
    icon: Clock,
    title: "Busy Mode",
    description: "Intelligent call handling when user is unavailable or in meeting",
    capabilities: ["Auto-answer after configurable rings", "Custom greeting messages", "Priority caller bypass", "Schedule-based rules"],
  },
  {
    icon: Mic,
    title: "Voice-First Actions",
    description: "All call actions can be triggered via natural voice commands",
    capabilities: ['"Call and tell them..."', '"Answer and record"', '"Ignore and text back"', '"Forward to voicemail"'],
  },
];

export function CallAutomationSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<PhoneCall className="w-4 h-4" />} title="Call Automation" headerAction={<StatusBadge variant="active">Active</StatusBadge>}>
        <div className="space-y-4">
          {automationFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-secondary/30 rounded-xl p-5 border border-border hover:border-primary/30 transition-all animate-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
