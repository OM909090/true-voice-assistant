import { Mic, Globe, Zap, Brain } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";

const voiceCapabilities = [
  {
    title: "Speech Recognition",
    icon: Mic,
    description: "Multi-language STT with Odia priority",
    features: ["Whisper / Gemini STT", "Real-time transcription", "Noise cancellation", "Accent adaptation"],
  },
  {
    title: "Language Support",
    icon: Globe,
    description: "All major Indian languages + global",
    features: ["Odia (primary)", "Hindi, English", "Tamil, Telugu", "Auto-detection"],
  },
  {
    title: "Voice Synthesis",
    icon: Zap,
    description: "Natural TTS with multiple voices",
    features: ["Male/Female/Neutral", "Emotion control", "Speed adjustment", "Custom voices"],
  },
  {
    title: "Intent Detection",
    icon: Brain,
    description: "AI-powered command understanding",
    features: ["Context awareness", "Multi-turn dialog", "Entity extraction", "Confidence scoring"],
  },
];

const voiceCommands = [
  { command: '"Call him / her"', action: "Calls the last contact mentioned" },
  { command: '"Call <name> and say <message>"', action: "Calls contact and delivers message via TTS" },
  { command: '"Save this number as <name>"', action: "Saves current caller with specified name" },
  { command: '"What was the last call?"', action: "Reads summary of most recent call" },
  { command: '"Read my call log"', action: "Speaks recent call history" },
  { command: '"Block this number"', action: "Blocks the current or last caller" },
];

export function VoiceAgentSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Mic className="w-4 h-4" />} title="Voice AI Agent" headerAction={<StatusBadge variant="beta">Beta</StatusBadge>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {voiceCapabilities.map((cap, index) => (
            <div
              key={cap.title}
              className="bg-secondary/30 rounded-xl p-5 border border-border hover:border-primary/30 transition-all animate-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cap.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{cap.title}</h4>
                  <p className="text-xs text-muted-foreground">{cap.description}</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {cap.features.map((feature) => (
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
          <h4 className="font-semibold text-foreground mb-4">Voice Commands (Agentic)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {voiceCommands.map((cmd, index) => (
              <div
                key={cmd.command}
                className="bg-background/50 rounded-lg p-3 animate-in"
                style={{ animationDelay: `${(index + 4) * 50}ms` }}
              >
                <p className="font-mono text-sm text-primary mb-1">{cmd.command}</p>
                <p className="text-xs text-muted-foreground">{cmd.action}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
